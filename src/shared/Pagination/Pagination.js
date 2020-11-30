import React from "react";
import { BehaviorSubject } from "rxjs";

import "./Pagination.scss";

const selected$ = new BehaviorSubject(1);

const Pagination = ({ pages, page, onPageChange, itemsPage }) => {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  const onSelectPage = (index, itemsPage) => {
    onPageChange(index + 1, itemsPage);
  };

  return pages !== 1 ? (
    <nav className="float-right" aria-label="Page navigation example">
      <ul class="pagination">
        {/* {page === 1 ? null : <li class="page-item page-link">&laquo;</li>} */}

        {pageNumbers.map((number, index) => (
          <li
            className={
              page === index + 1
                ? `page-item selected page-link`
                : `page-item page-link `
            }
            key={index + 1}
            onClick={() => onSelectPage(index, itemsPage)}
          >
            {number}
          </li>
        ))}
        {/* {page === pages ? null : <li class="page-item page-link">&raquo;</li>} */}
      </ul>
    </nav>
  ) : null;
};

export default Pagination;
