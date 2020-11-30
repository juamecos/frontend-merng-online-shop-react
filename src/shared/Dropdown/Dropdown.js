import React from "react";
import { useState } from "react";
import "./Dropdown.scss";
import { subjectPageInfo$ } from "../table/Table";
const Dropdown = ({ page, itemsPage, pages, total, onItemsPageChange }) => {
  const [open, setOpen] = useState(false);

  const onShowDropdown = () => setOpen(!open);

  const onSelectItemsPage = number => {
    onItemsPageChange(number);
    setOpen(!open);
  };

  const itemsPageList = [5, 10, 15, 20].reverse(); // Because is dropup

  const indexOfLastItem = page === pages ? total : page * itemsPage;

  const indexOfFirstItem = () => {
    if (page === 1) {
      return 1;
    }
    if (page === pages) {
      return (pages - 1) * itemsPage + 1;
    }
    return indexOfLastItem - itemsPage + 1;
  };
  return (
    <>
      <div class="dropup float-left">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          onClick={() => onShowDropdown()}
        >
          {itemsPage}
        </button>
        <div className="float-right mt-2 ml-2">
          Shows {indexOfFirstItem()} - {indexOfLastItem} of {total}
        </div>
        <div
          class={open ? `dropdown-menu open show` : "dropdown-menu"}
          aria-labelledby="dropdownMenuButton"
        >
          {itemsPageList.map(number => (
            <div
              class="dropdown-item"
              onClick={() => onSelectItemsPage(number)}
            >
              {number}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
