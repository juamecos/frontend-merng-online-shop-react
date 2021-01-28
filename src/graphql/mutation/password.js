import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email) {
      status
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($id: ID!, $password: String!) {
    changePassword(id: $id, password: $password) {
      status
      message
    }
  }
`;
