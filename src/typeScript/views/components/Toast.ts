import { TOAST } from "../../enums";

interface IIcon {
  success: "ti-check";
  error: "ti-close";
}

const Toast = (
  type: TOAST = TOAST.ERROR,
  message: string = "TypeError: Failed to fetch"
): string => {
  const icons: IIcon = {
    [TOAST.SUCCESS]: "ti-check",
    [TOAST.ERROR]: "ti-close",
  };
  const icon: "ti-check" | "ti-close" = icons[type];

  return `
    <div class="toast-item toast-${type}">
        <div class="toast-icon">
        <i class="${icon}"></i>
        </div>
        <p class="toast-desc">${message}</p>
      </div>
    `;
};
export default Toast;
