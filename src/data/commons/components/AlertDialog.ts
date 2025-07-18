import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextConstant from "../constants/TextConstant";

const MySwal = withReactContent(Swal);

export const showSuccessDialog = (title: string, message: string) => {
  return MySwal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonText: TextConstant.ok,
  });
};

export const showErrorDialog = (title: string, message: string) => {
  return MySwal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonText: TextConstant.gotIt,
  });
};

export const showConfirmDialog = (
  title: string,
  message: string,
  onConfirm: () => void
) => {
  return MySwal.fire({
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: TextConstant.yes,
    cancelButtonText: TextConstant.no,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
