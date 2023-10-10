import {defineStore} from "pinia";
import {setCssVar} from "quasar";

export const useSystemSettingStoreStore = defineStore("System_Setting", {
  persist: true,
  state: () => ({
    primary: '#094bcbe8'
  }),

  getters: {},

  actions: {
    set(color) {
      this.primary = color
      setCssVar('primary', color)
    },
    reset() {
      this.set('#094bcbe8')
    },
    updateSystemColor() {
      setCssVar('primary', this.primary)
    }
  }
});
