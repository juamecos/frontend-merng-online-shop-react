import { set } from "../graphql/api.service";
import { ADD_GENRE, EDIT_GENRE } from "../graphql/mutation/genre";

export const addGenre = genre => {
  return set(
    ADD_GENRE,
    {
      genre,
    },
    {}
  );
};
export const updateGenre = (id, genre) => {
  return set(EDIT_GENRE, { id, genre }, {});
};
