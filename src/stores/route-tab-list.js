import {defineStore} from "pinia";
import {Router} from "src/router";
import {getNowTime} from "src/util";
import {nanoid} from "nanoid";
import {Notify} from "quasar";

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
          Router.push(length > 1 ? list[length - 2].path : "/");
          return;
        }
      }
    },
    removeByName(name, id) {
      let list = this.list, length = list.length;
      for (let i = 0; i < length; i++) {
        if (list[i].name === name && list[i].id !== id) {
          list.splice(i--, 1);
        }
      }
    },
    switchTabByName(name, title, path, left = true) {
      const Route = Router.currentRoute.value
      const nowPageTabId = Route.query.id

      let list = this.list, length = list.length, nameList = []
      for (let i = 0; i < length; i++) {
        if (list[i].name === name) {
          nameList.push({
            ...list[i],
            index: i
          })
        }
      }

      if (nameList.length === 0) {
        this.addTab(name, title, path)
        return
      }

      if (Route.name !== name) {
        Router.push(list[
          nameList[0].index
          ].path)
        return;
      } else if (nameList.length === 1) {
        Notify.create("已定位至唯一符合项")
        return;
      }

      let idIndex = nameList.findIndex(x => x.id === nowPageTabId)

      let index = left ? (
        idIndex === 0 ? nameList.length - 1 : idIndex - 1
      ) : (
        idIndex === nameList.length - 1 ? 0 : idIndex + 1
      )

      Router.push(list[
        nameList[index].index
        ].path)
    }
  }
});
