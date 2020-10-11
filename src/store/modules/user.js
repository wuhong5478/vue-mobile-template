import { login } from "@/api/user";
import { setToken } from "@/utils/auth";
export default {
  namespaced: true, //使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接
  state: {
    token: "123",
    name: "wuhong"
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const { data } = response;
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
