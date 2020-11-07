import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($user: UserInput!) {
    register(user: $user) {
      status
      message
      user {
        name
      }
    }
  }
`;
