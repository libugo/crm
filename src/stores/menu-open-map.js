import {defineStore} from "pinia";

export const useMenuOpenMapStore = defineStore("menuOpenMap", {
  persist: true,
  state: () => ({
    mainLeftDrawer: false,
    openMap: {}
  }),

  getters: {},

  actions: {
    putOpenMap(key, status) {
      this.openMap[key] = status
    }
  }
});
