import { gql } from "@apollo/client";

export const GENRE_FRAGMENT = gql`
  fragment GenreObject on Genre {
    id
    name
    slug
  }
`;
