import React from "react"
import { eventEmitter$ } from "../../services/table.service"
import icons from "../../assets/icons"

import "./Table.scss"

const TableButtons = ({ dataRow, manageAction }) => {
  const { edit, info, block } = icons
  console.log("DataRow:", dataRow)
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary align-middle"
        id="edit-item"
        onClick={() => eventEmitter$.subscribe(manageAction("edit", dataRow))}
      >
        {edit}&nbsp; Edit
      </button>
      <button
        type="button"
        className="btn btn-info mx-3 align-middle"
        id="info-button"
        onClick={() => eventEmitter$.next(manageAction("info", dataRow))}
      >
        {info} &nbsp; Info
      </button>
      <button
        type="button"
        className="btn btn-danger align-middle"
        id="block-button"
        onClick={() => eventEmitter$.next(manageAction("block", dataRow))}
      >
        {block}&nbsp; Block
      </button>
    </>
  )
}

export default TableButtons
