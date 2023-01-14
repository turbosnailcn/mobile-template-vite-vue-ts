import { defineStore } from "pinia";
import type { ReqParams } from "@/api/user/model";
import fetchApi from "@/api/user";
// import { encryptByDES } from '/@/utils/crypto';
import { router } from "@/router";

interface UserState {
  token: string;
  auths: string[];
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // token
    token: "",
    // auths
    auths: [],
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info ?? ""; // for null or undefined value
    },
    setAuth(auths: string[]) {
      this.auths = auths;
    },
    resetState() {
      this.token = "";
      this.auths = [];
    },
    /**
     * @description: login
     */
    async login(params: ReqParams) {
      // 密码加密
      // params.password = encryptByDES(params.password);
      const res = await fetchApi.login(params);
      if (res) {
        // save token
        this.setToken(res.token);
      }
      return res;
    },

    /**
     * @description: logout
     */
    async logout() {
      this.resetState();
      this.setToken("");
      router.replace("/login");
      // 路由表重置
      location.reload();
    },
  },
});
