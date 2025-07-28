"use client";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { authStore } from "@/shared/lib";

export const ProtectedRoute = observer(
  ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
      if (!authStore.isAuthenticated) {
        authStore.checkAuth();
      }
      if (!authStore.isAuthenticated) {
        router.push("/login");
      }
    }, []);

    return authStore.isAuthenticated ? <>{children}</> : null;
  }
);
