import { Subject } from "rxjs"
import { formBasicDialog, optionsWithDetails } from "../shared/alerts/alerts"
import { basicAlert } from "../shared/alerts/toast"
import { TYPE_ALERT } from "../shared/alerts/values.config"
import {
  addGenre,
  updateGenre,
  blockGenre,
  add,
  update,
  block,
} from "../services/genre.service"

export const eventEmitter$ = new Subject()

const takeAction = async (action, rowData) => {
  let defaultValue = ""

  if (rowData) {
    defaultValue = rowData.name
  }

  const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`
  if (action === "edit" || action === "add") {
    if (action === "add") {
      const result = await formBasicDialog("Add genre", html, "name")
      console.log(result)
      addItem(result)

      return
    }
    if (action === "edit") {
      updateForm(html, rowData)
    }
    return
  } else {
    if (action === "info") {
      console.log("info", rowData)
      const result = await optionsWithDetails(
        "Details",
        `${rowData.name} (${rowData.slug})`,
        375,
        '<i class="fas fa-edit"></i> Edit',
        '<i class="fas fa-lock"></i> Block'
      )
      console.log(result)
      if (result === false) {
        blockForm(rowData)
        return
      }
      if (result === true) {
        updateForm(html, rowData)
        return
      }
    }
    if (action === "block") {
      blockForm(rowData)
      return
    }
    return
  }
}
export const manageAction = (action, data) => {
  eventEmitter$.next(takeAction(action, data))
  eventEmitter$.complete("Completed")
}

const addItem = async result => {
  if (result.value) {
    const { data } = await add(result.value)
    const res = data.addGenre
    if (res.status) {
      basicAlert(TYPE_ALERT.SUCCESS, res.message)

      return
    }
    basicAlert(TYPE_ALERT.WARNING, res.message)
    return
  }
}

const updateForm = async (html, rowData) => {
  const result = await formBasicDialog("Edit genre", html, "name")
  updateItem(rowData, result)
}

const updateItem = async (rowData, result) => {
  console.log(rowData)
  if (result.value) {
    const { data } = await update(rowData.id, result.value)

    const res = data.updateGenre
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
    `Should you block "${rowData.name}", it won't be shown in the list`,
    430,
    "Do not block",
    "Do block"
  )

  blockItem(rowData, result)
}

const blockItem = async (rowData, result) => {
  if (result === false) {
    console.log(rowData.id)
    // If result is false we want to block the genre
    const { data } = await block(rowData.id)
    console.log(data)
    const res = data.blockGenre
    if (res.status) {
      basicAlert(TYPE_ALERT.SUCCESS, res.message)

      return
    }
    basicAlert(TYPE_ALERT.WARNING, res.message)

    return
  }
}
