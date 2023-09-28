import {defineStore} from "pinia";
import {Router} from "src/router";
import {getNowTime} from "src/util";
import {nanoid} from "nanoid";

export const useRouteTabListStore = defineStore("routeTabList", {
  persist: true,
  state: () => ({
    list: [{id: 'home', name: "home", title: "工作台", path: "/"}]
  }),

  getters: {},

  actions: {
    addTab(name, title, path) {
        if (name === 'home') {
            Router.push(path)
            return
        }
      let list = this.list, length = list.length, id = nanoid(10);
      for (let i = 0; i < length; i++) {
        if (list[i].id === id) {
          id = nanoid(10)
          i = 0
        }
      }
      path = path + "?id=" + id
      this.list.push({id, name, title, path, datetime: getNowTime()})
      Router.push(path)
    },
    remove(id) {
      let list = this.list, length = list.length;
      for (let i = 0; i < length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1);
          Router.push(length > 1 ? list[length - 2].path : "/?t=" + Date.now());
          return;
        }
      }
    },
    removeByName(name, id) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name === name && this.list[i].id !== id) {
                this.list.splice(i--, 1);
        }
      }
    }
  }
});
