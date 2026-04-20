import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";
import { AuthResponse } from "../types/auth.types";

export const useLogin = () => {
  return useMutation<AuthResponse, Error, { username: string; password: string }>({
    mutationFn: ({ username, password }) =>
      loginApi(username, password),
  });
};