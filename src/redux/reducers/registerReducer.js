import { REGISTER_SUCCESS } from "../types/registerTypes";

const initialState = {
  registered: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, registered: true };

    default:
      return state;
  }
};
