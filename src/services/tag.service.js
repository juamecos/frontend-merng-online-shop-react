import { set } from "../graphql/api.service"
import { ADD_TAG, BLOCK_TAG, EDIT_TAG } from "../graphql/mutation/tag"

export const add = tag => {
  return set(
    ADD_TAG,
    {
      tag,
    },
    {}
  )
}
export const update = (id, tag) => {
  return set(EDIT_TAG, { id, tag }, {})
}

export const block = id => {
  return set(BLOCK_TAG, { id }, {})
}
//////////////////////////////////////////////////
// export const addTag = tag => {
//   return set(
//     ADD_TAG,
//     {
//       tag,
//     },
//     {}
//   )
// }
// export const updateTag = (id, tag) => {
//   return set(EDIT_TAG, { id, tag }, {})
// }

// export const blockTag = id => {
//   return set(BLOCK_TAG, { id }, {})
// }
