import React from "react";
import { GENRE_LIST_QUERY } from "../../../graphql/query/genre";
import "./Genres.scss";
import Table from "../../../shared/table";

const Genders = () => {
  //
  const query = GENRE_LIST_QUERY;
  const keyfield = "genders";
  const columns = [
    { dataField: "id", text: "Genre Id" },
    { dataField: "name", text: "Genre Name" },
    { dataField: "slug", text: "Slug" },
  ];

  return (
    <div>
      <Table
        query={query}
        keyfield={keyfield}
        columns={columns}
        definitionKey="genres"
        listKey="genres"
      />
    </div>
  );
};

export default Genders;
