import { set } from "../graphql/api.service"
import { ADD_GENRE, BLOCK_GENRE, EDIT_GENRE } from "../graphql/mutation/genre"

export const add = genre => {
  return set(
    ADD_GENRE,
    {
      genre,
    },
    {}
  )
}
export const update = (id, genre) => {
  return set(EDIT_GENRE, { id, genre }, {})
}

export const block = id => {
  return set(BLOCK_GENRE, { id }, {})
}
//////////////////////////////////////////////////
export const addGenre = genre => {
  return set(
    ADD_GENRE,
    {
      genre,
    },
    {}
  )
}
export const updateGenre = (id, genre) => {
  return set(EDIT_GENRE, { id, genre }, {})
}

export const blockGenre = id => {
  return set(BLOCK_GENRE, { id }, {})
}
