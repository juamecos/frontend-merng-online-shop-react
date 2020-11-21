import { get } from "../graphql/api.service";
export const getCollectionData = (query, variables = {}, context = {}) => {
  return get(query, variables, context);
};
