import {defineStore} from "pinia";

export const useLoginUserStore = defineStore("Login_User", {
  persist: true,
  state: () => ({
    user: null,
    role: null,
    token: null,
    dark: {
      status: null,
      expireTime: null
    }
  }),

  getters: {
    adminLogin(state) {
      return state.role > 0;
    }
  },

  actions: {
    login(user, role, token) {
      this.user = user;
      this.role = role;
      this.token = token;
    },
    clear() {
      this.user = null;
      this.token = null;
      this.role = null;
    },
    logout() {
      this.user = null;
      this.token = null;
      let api = this.role > 0 ? adminLogout : userLogout;
      api();
      this.role = null;
    },
    updateDark(status, expireTime) {
      this.dark.status = status;
      this.dark.expireTime = expireTime;
    }
  }
});
