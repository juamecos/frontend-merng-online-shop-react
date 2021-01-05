import { gql } from "@apollo/client"

export const TAG_FRAGMENT = gql`
  fragment TagObject on Tag {
    id
    name
    slug
  }
`
