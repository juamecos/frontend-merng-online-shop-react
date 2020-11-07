import { useQuery } from "@apollo/client";

import { suspend } from "../lib/suspend";

export const useSuspendableQuery = (...args) => {
  const result = useQuery(...args);
  if (result.loading) {
    suspend(new Promise(resolve => !result.loading && resolve())).read();
  }
  return result;
};
