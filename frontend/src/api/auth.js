import Api from "./api";

export default {
  register(accountInfo) {
    return Api().post("users", accountInfo);
  },

  login(credentials) {
    return Api().post("authentication", credentials);
  },
  
  logout() {
    return Api().delete("logout");
  },
};