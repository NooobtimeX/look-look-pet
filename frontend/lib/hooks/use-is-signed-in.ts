// lib/hooks/use-is-signed-in.ts
"use client";

import { useEffect, useState } from "react";
import { decodeToken } from "@/lib/auth";

export function useIsSignedIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")[1];

    if (!token) return setIsSignedIn(false);

    const decoded = decodeToken(token);
    setIsSignedIn(!!decoded?.sub);
  }, []);

  return isSignedIn;
}
