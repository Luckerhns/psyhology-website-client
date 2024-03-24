import { $user } from ".";
import jwt_decode from "jwt-decode";
import getErrorByStatus from "../utils/functions";
import { IUser } from "../types/types";
import { Axios } from "axios";

export const registration = async (dto: {
  email: string;
  password: string;
  username: string;
}) => {
  const { data }  = await $user.post<IUser[]>("api/user/registration", {
    email: dto.email,
    password: dto.password,
    username: dto.username,
  });
  // console.log(data);
  return data;
};

export const login = async ({ ...dto }) => {
  const { data } = await $user.post("api/user/login", {
    email: dto.email,
    password: dto.password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
