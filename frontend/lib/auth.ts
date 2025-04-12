// lib/auth.ts
import jwt from "jsonwebtoken";

interface DecodedUser {
  email?: string;
  sub?: string;
}

export function decodeToken(token: string): DecodedUser | null {
  try {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "yourSecretKey";
    const decoded = jwt.verify(token, secret) as DecodedUser;
    return decoded;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}
