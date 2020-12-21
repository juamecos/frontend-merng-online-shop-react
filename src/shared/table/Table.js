import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Pagination from "../Pagination/Pagination";
import TableButtons from "./TableButtons";
import icons from "../../assets/icons";
import "./Table.scss";
import ErrorBoundary from "../../ErrorBoundary";
import { useQuery } from "@apollo/client";
import { eventEmitter$ } from "../../services/table.service";

const initialInfoPage = {
  include: false,
  page: 1,
  itemsPage: 5,
};
const Table = ({
  query,
  context,
  columns,
  definitionKey,
  listKey,
  manageAction,
}) => {
  const [items, setItems] = useState([]);
  const [infoPage, setInfoPage] = useState(initialInfoPage);

  const { data: itemsData, loading: itemsLoading } = useQuery(
    query,
    {
      variables: {
        page: infoPage.page,
        itemsPage: infoPage.itemsPage,
      },
    },
    context
  );

  useEffect(() => {
    if (query === undefined) {
      throw new Error("Query is undefined, please add a query");
    }
    if (items === undefined) {
      throw new Error("ResultData is undefined, please add a query");
    }

    if (columns === undefined) {
      throw new Error("Columns is undefined, please add a query");
    }

    if (itemsData) {
      const data = itemsData[definitionKey];
      const { page, itemsPage, pages, total } = data.info;
      setInfoPage({
        ...infoPage,
        page,
        itemsPage,
        pages,
        total,
      });
      setItems(data[listKey]);
    }

    return () => {};
  }, [itemsData]);

  const onItemsPageChange = async itemsPage => {
    setInfoPage({
      ...infoPage,
      page: 1,
      pages: Math.ceil(infoPage.total / itemsPage),
      itemsPage,
    });
  };

  const onPageChange = page => {
    setInfoPage({
      ...infoPage,
      page,
    });
  };

  return (
    <div>
      <button
        type="button"
        id="add-item"
        className="btn btn-success float-right mb-3 mr-3 align-content-center"
        onClick={async () => {
          await eventEmitter$.next(manageAction("add"));
        }}
      >
        {icons.add}&nbsp; Add
      </button>
      <div className="table-responsive">
        <table className="table table-striped table-dark ">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.text} scope="col">
                  {column.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((row, index) => (
                <tr key={row.name}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.slug}</td>
                  <td className="table-buttons">
                    <ErrorBoundary>
                      <TableButtons dataRow={row} manageAction={manageAction} />
                    </ErrorBoundary>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Dropdown
        pages={infoPage.pages}
        page={infoPage.page}
        itemsPage={infoPage.itemsPage}
        total={infoPage.total}
        onItemsPageChange={onItemsPageChange}
      />

      <Pagination
        pages={infoPage.pages}
        page={infoPage.page}
        itemsPage={infoPage.itemsPage}
        total={infoPage.total}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
