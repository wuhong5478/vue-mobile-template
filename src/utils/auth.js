import { setStorage, getStorage } from "@/utils";

const TokenKey = "token";

export function getToken() {
  return getStorage(TokenKey);
}

export function setToken(token) {
  return setStorage(TokenKey, token);
}
