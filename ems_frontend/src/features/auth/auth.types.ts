export type Role = "ROLE_ADMIN" | "ROLE_DEV" | "ROLE_HR" | "ROLE_USER";

export interface AuthResponse {
  username: string;
  role: Role;
}

export interface AuthUser {
  username: string;
  role: Role;
}
