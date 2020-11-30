import React from "react";
import { USERS_LIST_QUERY } from "../../../graphql/query/user";
import "../../../scss/index.scss";
import Table from "../../../shared/table";
import TableButtons from "../../../shared/table/TableButtons";
import { eventEmitter$, manageAction } from "../../../services/table.service";
import { ADD_GENRE } from "../../../graphql/mutation/genre";
const Users = () => {
  //
  const query = USERS_LIST_QUERY;
  // const mutation = ADD_USER;
  const keyfield = "users";

  const columns = [
    { dataField: "id", text: "User Id" },
    { dataField: "name", text: "Name" },
    { dataField: "lastname", text: "Lastname" },
    { dataField: "email", text: "Email" },
    {
      dataField: "",
      text: "Manage Info",
      formatter: TableButtons,
    },
  ];

  return (
    <div>
      <Table
        query={query}
        keyfield={keyfield}
        columns={columns}
        definitionKey="users"
        listKey="users"
        eventEmitter$={eventEmitter$}
        manageAction={manageAction}
      />
    </div>
  );
};

export default Users;
