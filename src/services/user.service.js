import { get, set } from "../graphql/api.service"
import { USERS_LIST_QUERY } from "../graphql/query/user"

import { map } from "rxjs/internal/operators/map"
import { BLOCK_USER, REGISTER, UPDATE_USER } from "../graphql/mutation/user"

// export const getUsers = (page = 1, itemsPage = 20) => {
//   return get(USERS_LIST_QUERY, { include: true, itemsPage, page }, {}).map(
//     results => results
//   );
// };

export const register = user => {
  return set(REGISTER, {
    user,
    include: false,
  })
}

export const update = user => {
  return set(
    UPDATE_USER,
    {
      user,
      include: false,
    },
    {}
  )
}

export const block = id => {
  return set(
    BLOCK_USER,
    {
      id,
    },
    {}
  )
}
