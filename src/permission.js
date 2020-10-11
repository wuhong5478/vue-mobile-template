import router from "./router";
import { getToken } from "@/utils/auth";

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`);
    }
  }
});
