/**
 * @author libug
 */
import {boot} from "quasar/wrappers";
import axios from "axios";
import qs from "qs";
import {Notify} from "quasar";
import {BASE_BACK_URL, isUrlSelfServer} from "src/config";
import {getNotNullParamData} from "src/util";
import {useLoginUserStore} from "stores/login-user-store";

const LoginUser = useLoginUserStore();

const contentTypes = {
  json: "application/json; charset=utf-8",
  urlencoded: "application/x-www-form-urlencoded; charset=utf-8",
  multipart: "multipart/form-data"
};
const CHECK_NO_TOKEN_URL_HASH = ["#/login", "#/login/"];
export const TOKEN_NAME = "satoken";
const UN_LOGIN_URL = "/#/login";

const defaultOptions = {
  withCredentials: false,
  changeOrigin: true,
  headers: {
    Accept: "application/json",
    "Content-Type": contentTypes.json
  },
  timeout: 5000
};
export const api = ({
                      url,
                      data = {},
                      method = "get",
                      options = {},
                      contentType = "json" // json || urlencoded || multipart
                      // prefixUrl = 'v1',
                    }) => {

  const fullUrl = isUrlSelfServer(url) ? BASE_BACK_URL + url : url;

  const rstOptions = {
    ...defaultOptions,
    ...options,
    method
  };

  if (rstOptions.headers) {
    let headers = {...rstOptions.headers};
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = contentTypes[contentType];
    }
  }

  if (method === "get") {
    rstOptions.params = data;
  }

  if (method !== "get" && method !== "head") {
    rstOptions.data = data;
    if (data instanceof FormData) {
      rstOptions.headers = {
        "x-requested-with": "XMLHttpRequest",
        "cache-control": "no-cache"
      };
    } else if (contentType === "urlencoded") {
      rstOptions.data = qs.stringify(data);
    } else {
      rstOptions.data = getNotNullParamData(data);
    }
  }

  return axios({
    url: fullUrl,
    ...rstOptions
  }).then((response) => {
    if (response.data == null) {
      return Promise.reject(response);
    }
    if (response.data.status == null) {
      return Promise.resolve(response.data);
    }
    if (response.data.status === 0) {
      return Promise.resolve(response.data.data);
    } else {
      return Promise.reject(response);
    }
  }).catch((error) => {
    let data = errorManage(error);
    console.log(data);
    if (data.status == null) {
      Notify.create({
        type: "negative",
        message: data
      });
    } else if (data.status < 10 || [].includes(data.status)) {
      Notify.create({
        type: "negative",
        message: data.data
      });
    }
    return Promise.reject(error);
  });
};
axios.interceptors.request.use(config => {
  if (config.method === "OPTIONS") {
    return config;
  }
  let hash = location.hash;
  if (!CHECK_NO_TOKEN_URL_HASH.includes(hash)) {
    let token = LoginUser.token;
    if (token) {
      config.headers[TOKEN_NAME] = token;
    }
  }
  return config;
});

function errorManage(error) {
  let response = error.response;
  let status = error.status, data = error.data;
  if (response != null) {
    status = response.status;
    data = response.data;
  }
  if (status == null) {
    return "服务器连接超时";
  }
  switch (status) {
    case 500:
      return data.data != null ? data.data : "输入数据/服务器内部有误";
    case 404:
      return "请求的资源不存在";
    case 401: {
      if (data.status === 401) {
        LoginUser.clear();
        return data.data;
      }
      return "远程API无权限访问";
    }
    case 400:
      return "参数不合法";
    case 200: {
      if (data.status === 401) {
        LoginUser.clear();
        return data.data;
      }
      return data;
    }
  }
}

export default boot(({app}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});
