import { IAuth } from "./interface";

export type AuthLogin = Omit<IAuth, "id" | "confirmPassword">;
export type AuthLocalStorage = Omit<IAuth, "password" | "confirmPassword">;
