import { api } from "@core/api/axios";
import { AuthResponse } from "../types/auth.types";

export const loginApi = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    username,
    password,
  });

  return response.data;
};