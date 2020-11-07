import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
});

export default rootReducer;
