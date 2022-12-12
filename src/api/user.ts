import axios from "axios";

export interface IRegisterProps {
  username: string;
  email: string;
  password: string;
}

export interface IAuthProps {
  username: string;
  password: string;
}

const instance = axios.create({
  baseURL: "http://localhost:4000/api/user",
});

export const registerUser = (body: IRegisterProps) => {
  return instance.post("/registration", body);
};

export const authUser = (body: IAuthProps) => {
  return instance.post("/auth", body);
};
