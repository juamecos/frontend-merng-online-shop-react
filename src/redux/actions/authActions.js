import { AUTH_LOGIN, AUTH_LOGOUT } from "../types/authTypes";

export const login = user => ({
  type: AUTH_LOGIN,
  payload: user,
});

export const logout = () => ({
  type: AUTH_LOGOUT,
});
