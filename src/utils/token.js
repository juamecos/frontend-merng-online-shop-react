import jwtDecode from "jwt-decode";
import { TOKEN } from "./constants";

export const setToken = token => {
  localStorage.setItem(TOKEN, token);
};
export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const decodeToken = token => {
  return jwtDecode(token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const start = () => {
  const token = getToken();
  if (token !== null) {
    const decodedToken = decodeToken(token);
    const exp = decodedToken.exp;
    const date = new Date();
    if (date.getTime() < exp * 1000) {
      const user = decodedToken.user;

      return user;
    }

    return null;
  }

  return null;
};

export const getUserToken = () => {
  const token = getToken();
  if (token) {
    const { user } = decodeToken(token);
    return user;
  }
  return null;
};
