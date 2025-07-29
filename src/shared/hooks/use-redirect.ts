"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useRedirect = () => {
  const router = useRouter();

  const saveCurrentPath = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname + window.location.search;
      if (currentPath !== "/login") {
        sessionStorage.setItem("redirectAfterLogin", currentPath);
      }
    }
  }, []);

  const getRedirectPath = useCallback(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("redirectAfterLogin");
    }
    return null;
  }, []);

  const clearRedirectPath = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("redirectAfterLogin");
    }
  }, []);

  const redirectAfterLogin = useCallback(() => {
    const redirectPath = getRedirectPath();
    clearRedirectPath();

    if (redirectPath) {
      router.push(redirectPath);
    } else {
      router.push("/");
    }
  }, [getRedirectPath, clearRedirectPath, router]);

  return {
    saveCurrentPath,
    getRedirectPath,
    clearRedirectPath,
    redirectAfterLogin,
  };
};
