// lib/auth.ts
import { jwtDecode } from "jwt-decode";

export interface DecodedUser {
  email?: string;
  sub?: string;
  [key: string]: any;
}

export function decodeToken(token: string): DecodedUser | null {
  try {
    return jwtDecode<DecodedUser>(token);
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}
