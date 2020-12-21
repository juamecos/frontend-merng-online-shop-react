import React from "react";
import Swal from "sweetalert2";
import icons from "../../assets/icons";
const { edit, info, block } = icons;
export async function formBasicDialog(title, html, property) {
  return await Swal.fire({
    title,
    html,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    cancelButtonColor: "#dc3545",
    preConfirm: () => {
      const value = document.getElementById("name").value;
      console.log("from alerts formBasicDialog", value);
      if (value) {
        return value;
      }
      Swal.showValidationMessage(
        "You should add a genre to be able to save it"
      );
      return;
    },
  });
}

export async function optionsWithDetails(
  title,
  html,
  width,
  confirmButtonText = "",
  cancelButtonText = ""
) {
  return await Swal.fire({
    title,
    text: html,
    width: `${width}px`,
    showCancelButton: true,
    confirmButtonColor: "#6c757d",
    cancelButtonColor: "#dc3545",
    confirmButtonText,
    cancelButtonText,
  }).then(result => {
    console.log(result);
    console.log(result.dismiss);

    if (result.value) {
      console.log(result.value);
      return true;
    } else if (result.dismiss.toString() === "cancel") {
      console.log(result.dismiss);
      return false;
    }
  });
}

// Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, delete it!",
// }).then(result => {
//   if (result.isConfirmed) {
//     Swal.fire("Deleted!", "Your file has been deleted.", "success");
//   }
// });
