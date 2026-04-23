import { api } from "@core/api";
import { AuthResponse } from "./auth.types";

export const loginApi = async (
  username: string,
  password: string
): Promise<void> => {
  await api.post("/auth/login", {
    username,
    password,
  });
};

export const getMeApi = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/me");
  return response.data;
};

export const logoutApi = async (): Promise<void> => {
  await api.post("/auth/logout");
};
