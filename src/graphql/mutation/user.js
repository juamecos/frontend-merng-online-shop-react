import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragment/user';

export const REGISTER = gql`
  mutation addUser($user: UserInput!, $include: Boolean!) {
    register(user: $user) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const UPDATE_USER = gql`
  mutation modifyUser($user: UserInput!, $include: Boolean!) {
    updateUser(user: $user) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const BLOCK_USER = gql`
  mutation blockUser($id: ID!) {
    blockUser(id: $id) {
      status
      message
    }
  }
`;

export const ACTIVE_USER = gql`
  mutation activeUserAction($id: ID!, $birthday: String!, $password: String!) {
    activeUserAction(id: $id, birthday: $birthday, password: $password) {
      status
      message
      mail {
        to
      }
    }
  }
`;
