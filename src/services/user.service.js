import { set } from '../graphql/api.service';

import {
  ACTIVE_USER,
  BLOCK_USER,
  REGISTER,
  UPDATE_USER,
} from '../graphql/mutation/user';

// export const getUsers = (page = 1, itemsPage = 20) => {
//   return get(USERS_LIST_QUERY, { include: true, itemsPage, page }, {}).map(
//     results => results
//   );
// };

export const register = user => {
  return set(REGISTER, {
    user,
    include: false,
  });
};

export const update = user => {
  return set(
    UPDATE_USER,
    {
      user,
      include: false,
    },
    {}
  );
};

export const block = id => {
  return set(
    BLOCK_USER,
    {
      id,
    },
    {}
  );
};

export const active = (token, birthday, password) => {
  const user = JSON.parse(atob(token.split('.')[1])).user;
  return set(
    ACTIVE_USER,
    {
      id: user.id,
      birthday,
      password,
    },

    {
      headers: {
        Authorization: token ? `${token}` : '',
      },
    }
  );
};
