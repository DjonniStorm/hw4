"use client";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { authStore } from "@/shared/lib";
import { useRedirect } from "@/shared/hooks/use-redirect";

export const ProtectedRoute = observer(
  ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const { saveCurrentPath } = useRedirect();

    useEffect(() => {
      const checkAuth = async () => {
        // Если уже авторизован, не проверяем
        if (authStore.isAuthenticated) {
          setIsChecking(false);
          return;
        }

        // Сохраняем текущий путь перед редиректом
        saveCurrentPath();

        try {
          await authStore.checkAuth();
        } catch (error) {
          console.error("Auth check failed:", error);
        }

        // Если после проверки всё ещё не авторизован
        if (!authStore.isAuthenticated) {
          router.push("/login");
        }

        setIsChecking(false);
      };

      checkAuth();
    }, []); // Убираем зависимости, чтобы избежать бесконечных циклов

    if (isChecking) {
      return <div>Загрузка...</div>;
    }

    return authStore.isAuthenticated ? <>{children}</> : null;
  }
);
