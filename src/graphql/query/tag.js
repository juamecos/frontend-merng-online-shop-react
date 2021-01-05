import { gql } from "@apollo/client"
import { RESULT_INFO_FRAGMENT } from "../fragment/result-info"
import { TAG_FRAGMENT } from "../fragment/tag"

export const TAG_LIST_QUERY = gql`
  query getTags($page: Int, $itemsPage: Int) {
    tags(page: $page, itemsPage: $itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      tags {
        ...TagObject
      }
    }
  }
  ${RESULT_INFO_FRAGMENT}
  ${TAG_FRAGMENT}
`

export const TAG_QUERY = gql`
  query getSingleTag($id: ID!) {
    tag(id: $id) {
      status
      message
      genre {
        id
        name
        slug
      }
    }
  }
`
