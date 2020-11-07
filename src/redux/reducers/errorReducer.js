import { ERROR_SET, ERROR_CLEAN } from "../types/errorTypes";
const initialState = {
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ERROR_SET:
      return { ...state, error: payload };
    case ERROR_CLEAN:
      return { initialState };

    default:
      return state;
  }
};
