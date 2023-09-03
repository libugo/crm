import {route} from "quasar/wrappers";
import {createMemoryHistory, createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import routes from "./routes";
import {useRouteTabListStore} from "stores/route-tab-list";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const createHistory = process.env.SERVER
  ? createMemoryHistory
  : (process.env.VUE_ROUTER_MODE === "history" ? createWebHistory : createWebHashHistory);

export const Router = createRouter({
  scrollBehavior: () => ({left: 0, top: 0}),
  routes,
  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE)
});

Router.beforeEach((to, from) => {
  const routeTabList = useRouteTabListStore();

  if (to.name == null || to.meta.title == null || to.fullPath == null) {
    return true;
  }

  if (to.name === "login" || to.name === "adminLogin") {
    return true;
  }

  for (let i = 0; i < routeTabList.list.length; i++) {
    if (routeTabList.list[i].name === to.name) {
      return true;
    }
  }

  routeTabList.add({
    name: to.name,
    title: to.meta.title,
    path: to.fullPath
  });
  return true;
});

export default route(function ({store, ssrContext}) {
  return Router;
});
