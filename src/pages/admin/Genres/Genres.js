import React, { useEffect } from "react";
import { GENRE_LIST_QUERY } from "../../../graphql/query/genre";
import "./Genres.scss";
import Table from "../../../shared/table";
import TableButtons from "../../../shared/table/TableButtons";

import { eventEmitter$, manageAction } from "../../../services/table.service";
import { ADD_GENRE } from "../../../graphql/mutation/genre";

const Genres = () => {
  const query = GENRE_LIST_QUERY;
  const itemsPage = 5;
  const context = {};
  const include = false;
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
        itemsPage={itemsPage}
        context={context}
        include={include}
        query={query}
        keyfield={keyfield}
        columns={columns}
        definitionKey={resultData.definitionKey}
        listKey={resultData.listKey}
        eventEmitter$={eventEmitter$}
        manageAction={manageAction}
      />
    </div>
  );
};

export default Genres;
