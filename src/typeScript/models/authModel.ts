import { IAuth } from "../constants/interface";

class AuthSchema {
  id: number;
  email: string;
  password: string;
  constructor({ id, email, password }: IAuth) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

export default AuthSchema;
