import { $user } from ".";
import jwt_decode from "jwt-decode";
import { IUser } from "../types/types";

export const registration = async (dto: {
  email: string;
  password: string;
  username: string;
}) => {
  const { data } = await $user.post<IUser[]>("api/user/registration", {
    email: dto.email,
    password: dto.password,
    username: dto.username,
  });
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await $user.post("api/user/login", {
    email: email,
    password: password,
  });
  localStorage.setItem("token", data.token);
  return data;
};
