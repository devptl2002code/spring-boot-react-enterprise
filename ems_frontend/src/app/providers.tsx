import { ThemeProvider } from "@core/theme";
import { ReactNode } from "react";
import { AuthProvider } from "@features/auth/AuthContext";
import { QueryProvider } from "./providers/QueryProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};
