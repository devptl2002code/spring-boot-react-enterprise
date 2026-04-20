export type Role = "ADMIN" | "DEV" | "HR";

export interface AuthResponse {
  token: string;
  username: string;
  role: Role;
}

export interface JwtPayload {
  sub: string; // username
  role: Role;
  exp: number;
  iat: number;
}

export interface AuthUser {
  username: string;
  role: Role;
  token: string;
}
