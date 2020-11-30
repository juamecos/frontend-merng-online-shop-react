import { get } from "../graphql/api.service";
import { Subject } from "rxjs";
import { formBasicDialog } from "../shared/alerts/alerts";
import { basicAlert } from "../shared/alerts/toast";
import { TYPE_ALERT } from "../shared/alerts/values.config";
import { addGenre, updateGenre } from "../services/genre.service";

export const getCollectionData = (query, variables = {}, context = {}) => {
  return get(query, variables, context);
};

export const eventEmitter$ = new Subject();

const takeAction = async (action, rowData) => {
  let defaultValue = "";
  if (rowData) {
    defaultValue = rowData.name;
  }
  const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;
  if (action === "add") {
    const result = await formBasicDialog("Add genre", html, "name");
    if (result.value) {
      const { data } = await addGenre(result.value);
      const res = data.addGenre;
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);

        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
      return;
    }
    return;
  }
  if (action === "edit") {
    const result = await formBasicDialog("Edit genre", html, "name");
    if (result.value) {
      const { data } = await updateGenre(rowData.id, result.value);
      const res = data.updateGenre;
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
      return;
    }
    return;
  }
  if (action === "info") {
    console.log("info");
  }
  if (action === "block") {
    console.log("block");
  }
};
export const manageAction = (action, data) => {
  eventEmitter$.next(takeAction(action, data));
};
