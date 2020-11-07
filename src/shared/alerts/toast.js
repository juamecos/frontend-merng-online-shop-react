import Swal from "sweetalert2";
import { TYPE_ALERT } from "./values.config";

export function basicAlert(icon = TYPE_ALERT.SUCCESS, title = "") {
  Swal.fire({
    title,
    icon,
    position: "top",
    showConfirmButton: false,
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
}
