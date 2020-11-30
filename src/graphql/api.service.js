import client from "../config/apollo";
import { GENRE_LIST_QUERY } from "./query/genre";
import Observable from "zen-observable";
// import { from } from "rxjs";
// import { map } from "rxjs/operators";

const get = async (query, variables = {}, context = {}) => {
  return new Observable.from(
    client.watchQuery({
      query,
      variables,
      fetchPolicy: "cache-first",
      context,
    })
  ).map(result => {
    return result.data;
  });
};

const set = async (
  mutation,
  variables = {},
  context = {},
  query = GENRE_LIST_QUERY,
  keyfield = "genres",
  operation = "addGenre"
) => {
  try {
    const result = await client.mutate({
      mutation,
      variables,
      context,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { get, set };
