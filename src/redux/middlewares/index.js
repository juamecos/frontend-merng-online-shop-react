import { applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";

const middlewares = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

export default middlewares;
