import { ApolloClient, ObservableQuery } from "@apollo/client";
import client from "../config/apollo";
import { map } from "rxjs/operators";
import Observable from "zen-observable";

import { RESULT_INFO_FRAGMENT } from "./fragment/result-info";
// workarround with zen-observable https://github.com/apollographql/apollo-client/issues/6144
const get = (query, variables = {}, context = {}) => {
  return Observable.from(
    client.watchQuery({
      query,
      variables,
      fetchPolicy: "network-only",
      context,
    })
  ).map(result => result.data);
};

const set = (mutation, variables = {}, context = {}) => {
  client.mutate({
    mutation,
    variables,
    fetchPolicy: "network-only",
    context,
  });
};

export { get, set };
