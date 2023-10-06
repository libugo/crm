import {useLoginUserStore} from "stores/login-user-store";

import {Dark, date} from 'quasar'
import {useRouteTabListStore} from "stores/route-tab-list";

export function getNotNullParamData(data) {
  if (data == null) {
    return null;
  }
  deleteNull(data);
  return data;
}

function deleteNull(data) {
  if (data == null) {
    return;
  }
  Object.keys(data).forEach((item) => {
    if (
      data[item] === null ||
      data[item] === undefined ||
      data[item] === ""
    ) {
      delete data[item];
    } else if (typeof data[item] === "object") {
      deleteNull(data[item]);
    }
  });
}


export function autoToDark() {
  const LoginUser = useLoginUserStore();
  const darkMode = LoginUser.dark;
  if (darkMode != null) {
    let expireTime = darkMode.expireTime,
      expireDateTime = new Date(expireTime);
    let dateDiff = date.getDateDiff(expireDateTime, new Date(), "hour");
    if (dateDiff > 0) {
      Dark.set(LoginUser.dark.status);
    }
    return;
  }
  const hour = new Date().getHours();

  if (hour < 7 || hour > 17) {
    Dark.set(true);
  }
}


export function isUrlSelfServer(url) {
  if (url == null) {
    return true;
  }
  return url.indexOf("https://") !== 0 && url.indexOf("http://") !== 0 && url.indexOf("//") !== 0;
}

export function getAuditStatusText(val) {
  if (val == null) {
    return "未审核";
  }
  switch (val) {
    case "0": {
      return "未审核";
    }
    case "1": {
      return "审核成功";
    }
    case "2": {
      return "审核失败";
    }
  }
}

export function getAuditStatusColor(val) {
  if (val == null) {
    return "grey";
  }
  switch (val) {
    case "0": {
      return "grey";
    }
    case "1": {
      return "positive";
    }
    case "2": {
      return "negative";
    }
  }
}

export function getAuditStatusTextColor(val) {
  return "text-" + getAuditStatusColor(val);
}


export function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
}


export function isEmptySequence(sequence) {
  return sequence == null || sequence.length === 0;
}

export function getNowTime() {
  return new Date().toLocaleTimeString()
}

export function goRouteItem(name, title, path) {
  const routeTabListStore = useRouteTabListStore();
  routeTabListStore.addTab(name, title, path)
}

export function switchTabByName(name, title, path, left) {
  const routeTabListStore = useRouteTabListStore();
  routeTabListStore.switchTabByName(name, title, path, left)
}
