import React from "react";
import { USERS_LIST_QUERY } from "../../../graphql/query/user";
import "../../../scss/index.scss";
import Table from "../../../shared/table";

const Users = () => {
  //
  const query = USERS_LIST_QUERY;
  const keyfield = "users";

  const columns = [
    { dataField: "id", text: "User Id" },
    { dataField: "name", text: "Name" },
    { dataField: "lastname", text: "Lastname" },
    { dataField: "email", text: "Email" },
  ];

  return (
    <div>
      <Table
        query={query}
        keyfield={keyfield}
        columns={columns}
        definitionKey="users"
        listKey="users"
      />
    </div>
  );
};

export default Users;
