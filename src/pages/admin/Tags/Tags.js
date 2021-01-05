import React from "react"
import { TAG_LIST_QUERY } from "../../../graphql/query/tag"
import { add, block, update } from "../../../services/tag.service"
import {
  formBasicDialog,
  optionsWithDetails,
} from "../../../shared/alerts/alerts"
import { basicAlert } from "../../../shared/alerts/toast"
import { TYPE_ALERT } from "../../../shared/alerts/values.config"
import Table from "../../../shared/table"
import TableButtons from "../../../shared/table/TableButtons"

import "./Tags.scss"

export const takeTagsAction = async (action, rowData) => {
  // set default Value

  const defaultValue = rowData ? rowData.name : ""

  const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`

  switch (action) {
    case "add":
      addForm(html)
      break
    case "edit":
      updateForm(html, rowData)
      break
    case "info":
      const result = await optionsWithDetails(
        "Details",
        `${rowData.name} (${rowData.slug})`,
        375,
        '<i class="fas fa-edit"></i> Edit',
        '<i class="fas fa-lock"></i> Block'
      )
      if (result === false) {
        blockForm(rowData)
        return
      }
      if (result === true) {
        updateForm(html, rowData)
        return
      }
      break
    case "block":
      blockForm(rowData)
      break
    default:
      break
  }
}

const addForm = async html => {
  const result = await formBasicDialog("Add tag", html, "name")
  addItem(result)
}

const addItem = async result => {
  if (result.value) {
    const { data } = await add(result.value)
    const res = data.addTag
    if (res.status) {
      basicAlert(TYPE_ALERT.SUCCESS, res.message)

      return
    }
    basicAlert(TYPE_ALERT.WARNING, res.message)
    return
  }
}

const updateForm = async (html, rowData) => {
  const result = await formBasicDialog("Edit tag", html, "name")
  updateItem(rowData, result)
}

const updateItem = async (rowData, result) => {
  console.log(rowData)
  if (result.value) {
    const { data } = await update(rowData.id, result.value)

    const res = data.updateTag
    if (res.status) {
      basicAlert(TYPE_ALERT.SUCCESS, res.message)

      return
    }
    basicAlert(TYPE_ALERT.WARNING, res.message)

    return
  }
  return
}

const blockForm = async rowData => {
  const result = await optionsWithDetails(
    "Block?",
    `Should you block "${rowData.name} tag", it won't be shown in the list`,
    430,
    "Do not block",
    "Do block"
  )

  blockItem(rowData, result)
}

const blockItem = async (rowData, result) => {
  if (result === false) {
    console.log(rowData.id)
    // If result is false we want to block the tag
    const { data } = await block(rowData.id)
    console.log(data)
    const res = data.blockTag
    if (res.status) {
      basicAlert(TYPE_ALERT.SUCCESS, res.message)
      return
    }
    basicAlert(TYPE_ALERT.WARNING, res.message)
    return
  }
}

const Tags = () => {
  const query = TAG_LIST_QUERY

  const context = {}

  const resultData = {
    listKey: "tags",
    definitionKey: "tags",
  }
  const keyfield = "tags"
  const columns = [
    { dataField: "id", text: "Tag Id" },
    { dataField: "name", text: "Tag Name" },
    { dataField: "slug", text: "Slug" },
    {
      dataField: "",
      classes: "manage-info",
      text: "Manage Info",
      formatter: TableButtons,
    },
  ]

  return (
    <div>
      <Table
        context={context}
        query={query}
        keyfield={keyfield}
        columns={columns}
        definitionKey={resultData.definitionKey}
        listKey={resultData.listKey}
        takeAction={takeTagsAction}
      />
    </div>
  )
}

export default Tags
