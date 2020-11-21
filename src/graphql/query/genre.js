import { gql } from "@apollo/client";
import { RESULT_INFO_FRAGMENT } from "../fragment/result-info";
import { GENRE_FRAGMENT } from "../fragment/genre";

export const GENRE_LIST_QUERY = gql`
  query getGenres($page: Int, $itemsPage: Int) {
    genres(page: $page, itemsPage: $itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      genres {
        ...GenreObject
      }
    }
  }
  ${RESULT_INFO_FRAGMENT}
  ${GENRE_FRAGMENT}
`;

export const GENDER_QUERY = gql`
  query getSingleGenre($id: ID!) {
    genre(id: $id) {
      status
      message
      genre {
        id
        name
        slug
      }
    }
  }
`;
