import { AUTH_LOGIN, AUTH_LOGOUT } from "../types/authTypes";
import { TOKEN } from "../../utils/constants";
import client from "../../config/apollo";
const initialState = {
  authenticated: false,
  user: {
    name: "",
    lastname: "",
    email: "",
    role: "",
    id: null,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN:
      if (!payload) return state;
      return {
        ...state,
        authenticated: true,
        user: { ...payload },
      };

    case AUTH_LOGOUT:
      client.resetStore();
      localStorage.removeItem(TOKEN);
      return {};

    default:
      return state;
  }
};
