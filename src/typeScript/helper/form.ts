import { ACTION_FORM, FORM } from "../constants/enum";
import { IAuth } from "../constants/interface";
import { AuthForm } from "../constants/types";
import debounce from "./debounce";
import { validate } from "./validate";

export const handleFormLogin = (
  formElm: HTMLFormElement,
  handler: (value: AuthForm) => Promise<void>,
  type: FORM = FORM.LOGIN
): void => {
  const formClassName = ".form-input";
  validate(formElm, formClassName);

  formElm.addEventListener("submit", function (e: SubmitEvent): void {
    const inputElms = formElm.querySelectorAll(
      ".form-input"
    ) as NodeListOf<HTMLInputElement>;
    e.preventDefault();

    const email = queryInputForm(formElm, "email");
    const password = queryInputForm(formElm, "password");
    const confirmPassword = queryInputForm(formElm, "confirm-password");

    const valueItem: AuthForm = {
      email: email.value.trim().toLowerCase(),
      password: password.value.trim(),
    };

    if (type === FORM.RESGITER) {
      valueItem.confirmPassword = confirmPassword.value;
    }

    const invalid: boolean = [...inputElms].some((item) =>
      item.classList.contains("invalid")
    );
    const emptyValue: boolean = Object.values(valueItem).some(
      (value: string) => value.length <= 0
    );

    if (!invalid && !emptyValue) {
      const button = formElm.querySelector(".submit-form") as HTMLButtonElement;
      button.classList.add("button-loading");

      const submitForm = (): void => {
        button.classList.remove("button-loading");

        if (typeof handler === "function") {
          handler(valueItem);
        }
      };
      debounce(submitForm, 2000);
    }
  });
};

export const handleFormTodo = (
  formElm: HTMLFormElement,
  disableElm: () => void,
  handle: (inputValue: string, action: string) => void
): void => {
  formElm.addEventListener("submit", function (e: SubmitEvent): void {
    e.preventDefault();
    const actionElm = formElm.querySelector(".action-todo") as HTMLSpanElement;
    const input = queryInputForm(formElm, "input-todo");

    const action = actionElm.textContent as ACTION_FORM;
    const inputValue = input.value.trim();

    if (inputValue.length <= 0) {
      input.value = "";
      return;
    }

    const button = formElm.querySelector(".main-btn") as HTMLButtonElement;
    button.classList.add("button-loading");
    const handleSubmit = (): void => {
      button.classList.remove("button-loading");
      if (typeof handle === "function" && action !== null) {
        handle(inputValue, action);
        input.value = "";
      }
    };

    disableElm();

    debounce(handleSubmit, 800);
  });
};

function queryInputForm(form: HTMLFormElement, name: string): HTMLInputElement {
  const element = form.querySelector(`input[name=${name}]`) as HTMLInputElement;
  return element;
}
