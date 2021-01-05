import { gql } from "@apollo/client"
import { TAG_FRAGMENT } from "../fragment/tag"

export const ADD_TAG = gql`
  mutation insertTag($tag: String!) {
    addTag(tag: $tag) {
      status
      message
      tag {
        ...TagObject
      }
    }
  }
  ${TAG_FRAGMENT}
`

export const EDIT_TAG = gql`
  mutation editTag($id: ID!, $tag: String!) {
    updateTag(id: $id, tag: $tag) {
      status
      message
      tag {
        ...TagObject
      }
    }
  }
  ${TAG_FRAGMENT}
`

export const BLOCK_TAG = gql`
  mutation blockTag($id: ID!) {
    blockTag(id: $id) {
      status
      message
    }
  }
`
