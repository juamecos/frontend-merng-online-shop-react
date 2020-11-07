import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserObject on User {
    id
    name
    lastname
    email
    password @include(if: $include)
    registerDate @include(if: $include)
    birthday @include(if: $include)
    role
  }
`;
