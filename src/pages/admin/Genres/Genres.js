import React from "react";
import { GENRE_LIST_QUERY } from "../../../graphql/query/genre";
import Table from "../../../shared/table";
import TableButtons from "../../../shared/table/TableButtons";
import "./Genres.scss";

import { manageAction } from "../../../services/table.service";

const Genres = () => {
  const query = GENRE_LIST_QUERY;

  const context = {};

  const resultData = {
    listKey: "genres",
    definitionKey: "genres",
  };
  const keyfield = "genres";
  const columns = [
    { dataField: "id", text: "Genre Id" },
    { dataField: "name", text: "Genre Name" },
    { dataField: "slug", text: "Slug" },
    {
      dataField: "",
      classes: "manage-info",
      text: "Manage Info",
      formatter: TableButtons,
    },
  ];

  return (
    <div>
      <Table
        context={context}
        query={query}
        keyfield={keyfield}
        columns={columns}
        definitionKey={resultData.definitionKey}
        listKey={resultData.listKey}
        manageAction={manageAction}
      />
    </div>
  );
};

export default Genres;
