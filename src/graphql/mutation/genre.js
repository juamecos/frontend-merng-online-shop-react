import { gql } from "@apollo/client";
import { GENRE_FRAGMENT } from "../fragment/genre";

export const ADD_GENRE = gql`
  mutation insertGenre($genre: String!) {
    addGenre(genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
`;

export const EDIT_GENRE = gql`
  mutation editGenre($id: ID!, $genre: String!) {
    updateGenre(id: $id, genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
`;

export const BLOCK_GENRE = gql`
  mutation blockGenre($id: ID!) {
    blockGenre(id: $id) {
      status
      message
    }
  }
`;
