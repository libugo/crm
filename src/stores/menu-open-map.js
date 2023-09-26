import {defineStore} from "pinia";

export const useMenuOpenMapStore = defineStore("menuOpenMap", {
  persist: true,
  state: () => ({
    statusMap: {
      mainLeftDrawer: false,
      navigation: true,
      role: false
    }
  }),

  getters: {},

  actions: {
    get(key) {
      return this.statusMap[key];
    },
    put(key, value) {
      this.statusMap[key] = value;
    },
    inverse(key) {
      this.statusMap[key] = !(this.statusMap[key]);
    }
  }
});