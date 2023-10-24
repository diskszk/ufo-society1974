import { ERROR_MESSAGE } from "../constants";
import { CreateUserDTO } from "@ufo-society1974/types";
import { User } from "../types";
import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function fetchUsers(): Promise<User[]> {
  const res = await axios.get<User[]>(baseUrl("/users"));

  return res.data;
}

export async function findUserByEmail(email: string): Promise<User> {
  const res = await axios.get<User>(baseUrl(`/users?email=${email}`));

  return res.data;
}

export async function findUserById(uid: string): Promise<User> {
  try {
    const res = await axios.get<User>(baseUrl(`/users/${uid}`));

    if (!res.data) {
      throw new Error(ERROR_MESSAGE.notFound("ユーザー"));
    }

    return res.data;
  } catch {
    throw new Error(ERROR_MESSAGE.serverError);
  }
}

export async function registerUser(user: CreateUserDTO): Promise<void> {
  const res = await axios.post<User>(baseUrl("/users"), {
    ...user,
  });

  if (res.status > 399) {
    throw new Error("ユーザーの作成に失敗しました。");
  }
  return;
}
