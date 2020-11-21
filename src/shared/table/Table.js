import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { getCollectionData } from "../../services/table.service";

import "./Table.scss";

const Table = ({ query, keyfield, columns, definitionKey, listKey }) => {
  const [dataCollection, setDataCollection] = useState([]);
  const [variables, setVariables] = useState({
    include: false,
    page: 1,
    itemsPage: 10,
    pages: 2,
    total: 19,
  });

  const { itemsPage, page, total } = variables;
  const getUserData = async () => {
    try {
      const usersResult$ = getCollectionData(query, variables, {}).subscribe(
        result => {
          const data = result[definitionKey];
          console.log(data);
          setVariables({
            ...variables,
            page: data.info.page,
            itemsPage: data.info.itemsPage,
            pages: data.info.pages,
            total: data.info.total,
          });
          setDataCollection(data[listKey]);
        }
      );

      if (!usersResult$) {
        console.log("There is not data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (query === undefined) {
    throw new Error("Query is undefined, please add a query");
  }
  if (dataCollection === undefined) {
    throw new Error("dataCollectiona is undefined, please add a query");
  }
  if (columns === undefined) {
    throw new Error("Columns is undefined, please add a query");
  }
  const fetchData = () => {
    getUserData();
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [page, itemsPage]);

  const onPageChange = (page, sizePerPage) => {
    setVariables({
      ...variables,
      itemsPage: sizePerPage,
      page: page,
    });
  };

  const onSizePerPageChange = (sizePerPage, page) => {
    setVariables({
      ...variables,
      itemsPage: sizePerPage,
      page: page,
    });
  };

  const sizePerPageList = [10, 15, 20];
  const onHideSizePerPage = variables.total < sizePerPageList[0];
  const onHidePageListOnlyOnePage = variables.pages === 1;

  return (
    <div>
      <BootstrapTable
        remote={{
          filter: false,
          pagination: true,
          sort: false,
          cellEdit: false,
        }}
        keyField={keyfield}
        data={dataCollection}
        columns={columns}
        pagination={paginationFactory({
          page: page,
          currSizePerPage: itemsPage,
          totalSize: total,
          showTotal: true,
          sizePerPageList: sizePerPageList,
          paginationSize: variables.pages,
          onPageChange: onPageChange,
          onSizePerPageChange: onSizePerPageChange,
          hideSizePerPage: onHideSizePerPage,
          hidePageListOnlyOnePage: onHidePageListOnlyOnePage,
        })}
      />
    </div>
  );
};

export default Table;
