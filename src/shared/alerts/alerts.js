import Swal from "sweetalert2"
import icons from "../../assets/icons"
import { EMAIL_PATTERN } from "./../../utils/regex"
const { edit, info, block } = icons

const swalWithBasicOptions = (title, html) =>
  Swal.mixin({
    title,
    html,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    cancelButtonColor: "#d33",
  })

export async function formBasicDialog(title, html, property) {
  return await swalWithBasicOptions(title, html).fire({
    title,
    html,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    cancelButtonColor: "#dc3545",
    preConfirm: () => {
      const value = document.getElementById("name").value
      console.log("from alerts formBasicDialog", value)
      if (value) {
        return value
      }
      Swal.showValidationMessage("You should add a genre to be able to save it")
      return
    },
  })
}

export async function userFormBasicDialog(title, html) {
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: () => {
      let error = ""
      const name = document.getElementById("name").value
      if (!name) {
        error += "Name is mandatory.<br/>"
      }
      const lastname = document.getElementById("lastname").value
      if (!lastname) {
        error += "Lastname is mandatory.<br/>"
      }
      const email = document.getElementById("email").value
      if (!email) {
        error += "Email is mandatory.<br/>"
      }
      if (!EMAIL_PATTERN.test(email)) {
        error += "Incorrect format email. Ex. mail@mail.com"
      }
      const role = document.getElementById("role").value
      if (error !== "") {
        Swal.showValidationMessage(error)
        return
      }

      return {
        name,
        lastname,
        email,
        role,
        birthday: new Date().toISOString(),
      }
    },
  })
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
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: "#6c757d",
    cancelButtonColor: "#dc3545",
    confirmButtonText,
    cancelButtonText,
  }).then(result => {
    console.log(result)
    console.log(result.dismiss)

    if (result.value) {
      console.log(result.value)
      return true
    } else if (result.dismiss.toString() === "cancel") {
      console.log(result.dismiss)
      return false
    }
  })
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
