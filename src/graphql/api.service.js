import client from '../config/apollo';
import Observable from 'zen-observable';

const get = async (query, variables = {}, context = {}) => {
  try {
    return new Observable.from(
      client.watchQuery({
        query,
        variables,
        context,
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'network-first',
      })
    ).map(result => {
      return result.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const set = async (mutation, variables = {}, context = {}) => {
  try {
    const result = await client.mutate({
      mutation,
      variables,
      context,
      awaitRefetchQueries: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { get, set };
