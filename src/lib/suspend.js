// TODO check if suspense is already implemented in Apollo CLient 3
// https://github.com/apollographql/apollo-feature-requests/issues/162
export const suspend = promise => {
  let status = "pending";
  let response;

  const suspender = promise.then(
    res => {
      status = "success";
      response = res;
    },
    err => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };
  const result = { read };

  return result;
};
