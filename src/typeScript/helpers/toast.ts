import Toast from "../views/components/Toast";
import { TOAST as TOAST_TYPE } from "../enums";
import { Toast as ToastType } from "../types";

const TOAST: ToastType = {
  SUCCESS: (message: string) => {
    const type = TOAST_TYPE.SUCCESS;
    return Toast(type, message);
  },

  ERROR: (message: string) => {
    const type = TOAST_TYPE.ERROR;
    return Toast(type, message);
  },
};

export default TOAST;
