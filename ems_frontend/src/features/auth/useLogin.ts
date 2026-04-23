import { useMutation } from "@tanstack/react-query";
import { loginApi, getMeApi } from "./auth.api";
import { AuthResponse } from "./auth.types";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }): Promise<AuthResponse> => {
      await loginApi(username, password);
      return await getMeApi();
    },
  });
};
