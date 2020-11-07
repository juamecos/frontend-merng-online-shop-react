import { createStore } from "redux";
import middlewares from "../middlewares";
import rootReducer from "../reducers";

const store = createStore(rootReducer, undefined, middlewares);

export default store;
