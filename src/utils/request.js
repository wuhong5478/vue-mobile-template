import axios from "axios";
import store from "@/store";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    config.headers["api-key"] = "jiuzhou";

    if (store.getters.token) {
      // 让每个请求携带token--['X-Token']为自定义key 请根据实际项目情况自行修改
      //config.headers["X-Token"] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  /**
   * 通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   */

  response => {
    const res = response.data;

    // 如果返回的状态码不是200，请求出错
    // 各状态码表示的情况需与后端协商一致
    if (res.code !== 200) {
      alert(res.message || "Error");

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      /* if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      } */
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
