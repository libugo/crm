import {useMenuOpenMapStore} from "stores/menu-open-map";

/**
 * @author Libug
 */

const DEV_SERVER = "http://192.168.92.129:8580/",
  BUILD_SERVER = "http://nj-server.libug.top/";

const menuOpenMap = useMenuOpenMapStore();
export const BASE_BACK_URL = process.env.DEV ? DEV_SERVER : BUILD_SERVER;
export const Upload_Server_URL = BASE_BACK_URL + "upload/img";
export const Upload_Payment_Img_Server_URL = BASE_BACK_URL + "upload/payment-img";

export const Img_Server_Path = BASE_BACK_URL + "img/";
export const Payment_Img_Server_Path = BASE_BACK_URL + "payment-img/";

export const menuListData = [
  {path: "/", name: "home", meta: {title: "工作台", icon: "home", role: 0}},
  {path: "/user", name: "user", meta: {title: "人员", icon: "boy", role: 0},},
  {path: "/customer", name: "customer", meta: {title: "客户", icon: "person", role: 0},},
  {path: "/business/customer", name: "businessCustomer", meta: {title: "客户生意", icon: "attach_money", role: 0}},
  {path: "/res", name: "res", meta: {title: "中介", icon: "real_estate_agent", role: 0},},
  {path: "/business/res", name: "businessRes", meta: {title: "中介生意", icon: "attach_money", role: 0}},
  // {path: "/template", name: "word", meta: {title: "话术", icon: "key", role: 0}},
  {path: "/business", name: "business", meta: {title: "跟单预约", icon: "grading", role: 0}},
  // {path: "/audit", name: "audit", meta: {title: "数据审核", icon: "task", role: 0}},

  {path: "/system", name: "system", meta: {title: "系统设置", icon: "settings", role: 0}},
  {
    name: "role", meta: {title: "销售话术", icon: "supervisor_account", role: 1, open: menuOpenMap.get("role")},
    children: [
      {path: "/user", name: "用户", meta: {title: "用户", icon: "person_outline", role: 0}},
    ]
  },
  // { path: "/person", name: "person", meta: { title: "个人信息", icon: "badge", role: 0 } }
];
