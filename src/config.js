import {useMenuOpenMapStore} from "stores/menu-open-map";

function getLoginRole() {
  const menuOpenMap = useMenuOpenMapStore();
}

/**
 * @author Libug
 */

const DEV_SERVER = "http://192.168.92.129:8580/",
  BUILD_SERVER = "http://nj-server.libug.top/";

export const BASE_BACK_URL = process.env.DEV ? DEV_SERVER : BUILD_SERVER;
export const Upload_Server_URL = BASE_BACK_URL + "upload/img";
export const Upload_Payment_Img_Server_URL = BASE_BACK_URL + "upload/payment-img";

export const Img_Server_Path = BASE_BACK_URL + "img/";
export const Payment_Img_Server_Path = BASE_BACK_URL + "payment-img/";

export const Home_Page_Name = 'workspace'

/**
 * name必须和routes.js中相对于的name一致
 * @type {[{path: string, meta: {role: number, icon: string, title: string}, name: string},{path: string, meta: {role: number, icon: string, title: string}, name: string},{path: string, meta: {role: number, icon: string, title: string}, name: string},{path: string, meta: {role: number, icon: string, title: string}, name: string},{path: string, meta: {role: number, icon: string, title: string}, name: string},null,null,null,null]}
 */
export const verticalMenuListData = [
    {path: "/", name: Home_Page_Name, meta: {title: "工作台", icon: "workspace_premium", role: 0}},
    {path: "/business", name: "business", meta: {title: "生意", icon: "local_atm", role: 0},},
  {path: "/customer", name: "customer", meta: {title: "客户", icon: "person", role: 0},},
    // {path: "/business/customer", name: "bCustomer", meta: {title: "客户生意", icon: "attach_money", role: 0}},
    {
        name: "agent", meta: {title: "中介", icon: "real_estate_agent", role: 0},
        children: [
            {path: "/agent", name: "agentInfo", meta: {title: "中介人", icon: "real_estate_agent", role: 0},},
            {path: "/agent/res", name: "agentRes", meta: {title: "中介资源", icon: "real_estate_agent", role: 0},},
            // {path: "/agent/follow", name: "agentFollow", meta: {title: "资源跟进", icon: "real_estate_agent", role: 0},},
        ]
    },
    // {path: "/business/res", name: "bRes", meta: {title: "中介生意", icon: "attach_money", role: 0}},
  // {path: "/business", name: "business", meta: {title: "跟单预约", icon: "grading", role: 0}},
  {path: "/system", name: "system", meta: {title: "系统设置", icon: "settings", role: 0}},

  // { path: "/person", name: "person", meta: { title: "个人信息", icon: "badge", role: 0 } }
];

export const fabWheelMenuListData = [
  {color: 'primary', icon: 'person', label: '客户登记', path: '/customer/add', name: 'addCustomer'},
  {color: 'primary', icon: 'real_estate_agent', label: '中介登记', path: ''},
  {color: 'primary', icon: 'attach_money', label: '生意跟单', path: ''},
  {color: 'primary', icon: 'key', label: '创建话术', path: ''},
].reverse()
