import { ERROR_SET, ERROR_CLEAN } from "../types/errorTypes";

export const errorSet = error => ({
  type: ERROR_SET,
  payload: error,
});

export const errorClean = () => ({
  type: ERROR_CLEAN,
});
