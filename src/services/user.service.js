import { get } from "../graphql/api.service";
import { USERS_LIST_QUERY } from "../graphql/query/user";

import { map } from "rxjs/internal/operators/map";

export const getUsers = (page = 1, itemsPage = 20) => {
  return get(USERS_LIST_QUERY, { include: true, itemsPage, page }, {}).map(
    results => results
  );
};
