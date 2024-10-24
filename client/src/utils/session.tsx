export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("access_token", token);
    return true;
  }
  return false;
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("access_token");
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("access_token");
  }
};
