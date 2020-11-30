import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Pagination from "../Pagination/Pagination";
import TableButtons from "./TableButtons";
import icons from "../../assets/icons";
import "./Table.scss";
import { getCollectionData } from "../../services/table.service";

const Table = ({
  itemsPage,
  context,
  include,
  query,
  columns,
  definitionKey,
  listKey,
  eventEmitter$,
  manageAction,
}) => {
  const [items, setItems] = useState([]);
  const [infoPage, setInfoPage] = useState({
    include,
    itemsPage,
  });

  // const { page, itemsPage, pages, total } = infoPage;

  const variables = {
    include: false,
    page: infoPage.page,
    itemsPage: infoPage.itemsPage,
  };
  const loadData = async () => {
    try {
      const data$ = await getCollectionData(query, variables, context);
      data$
        .map(result => {
          if (!result.loading) {
            const data = result[definitionKey];
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
        })
        .subscribe();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query === undefined) {
      throw new Error("Query is undefined, please add a query");
    }

    if (columns === undefined) {
      throw new Error("Columns is undefined, please add a query");
    }

    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [infoPage.page, infoPage.itemsPage]);

  const onItemsPageChange = async itemsPage => {
    setInfoPage({
      ...infoPage,
      pages: Math.ceil(infoPage.total / itemsPage),
      itemsPage,
    });
  };

  const onPageChange = page => {
    console.log(page);
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
        class="btn btn-success float-right mb-3 mr-3 align-content-center"
        onClick={async () => {
          await eventEmitter$.next(manageAction("add"));
        }}
      >
        {icons.add}&nbsp; Add
      </button>
      <div className="table-responsive">
        <table class="table table-striped table-dark ">
          <thead>
            <tr>
              {columns.map(column => (
                <th scope="col">{column.text}</th>
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
                    <TableButtons
                      dataRow={row}
                      eventEmitter$={eventEmitter$}
                      manageAction={manageAction}
                    />
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
