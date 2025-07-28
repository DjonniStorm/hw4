import { StoreProvider } from "@/app/providers/store";
import { ProtectedRoute } from "@/shared/ui/protected-route";
import { AppShell } from "@/widgets/app-shell";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Доступно только для авторизованных пользователей",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreProvider>
        <ProtectedRoute>
          <AppShell>{children}</AppShell>
        </ProtectedRoute>
      </StoreProvider>
    </>
  );
}
