import ErrorMessageConstant from "../constants/message/ErrorMessageConstant";
import { toast } from "react-toastify";
import TextConstant from "../constants/TextConstant";

class GlobalHelper {
  private static toastId: any = null;
  static onCatchErrorMessage(err: any) {
    const serverMessage = err?.response?.data?.message;
    const message =
      serverMessage || err?.message || ErrorMessageConstant.errorDefault;

    if (serverMessage && !toast.isActive(this.toastId)) {
      this.toastId = toast(serverMessage);
    }

    console.log(TextConstant.errorLog, message);
  }

  static capitalizeFirstWord(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static capitalizeEachWord = (str: string): string => {
    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
}

export default GlobalHelper;
