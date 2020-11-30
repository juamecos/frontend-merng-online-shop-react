import Swal from "sweetalert2";

export async function formBasicDialog(title, html, property) {
  return await Swal.fire({
    title,
    html,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    cancelButtonColor: "#d33",
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
