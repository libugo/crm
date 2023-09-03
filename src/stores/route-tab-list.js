import {defineStore} from "pinia";
import {Router} from "src/router";

export const useRouteTabListStore = defineStore("routeTabList", {
  persist: true,
  state: () => ({
    list: [{
      name: "index",
      title: "首页",
      path: "/"
    }]
  }),

  getters: {},

  actions: {
    add(item) {
      this.list.push(item);
    },
    remove(name) {
      let list = this.list, length = list.length;
      for (let i = 0; i < length; i++) {
        if (list[i].name === name) {
          list.splice(i, 1);
          Router.push(length > 1 ? list[length - 2].path : "/");
          return;
        }
      }
    }
  }
});
