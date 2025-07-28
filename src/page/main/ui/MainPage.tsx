"use client";
import { useStores } from "@/app/hooks/use-store";
import { UserManagement } from "@/widgets/user-managment";
import { UserTable } from "@/widgets/user-table";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const MainPage = observer(() => {
  const { users, error, isLoading, getUsers } = useStores();

  useEffect(() => {
    if (users.length === 0 && !isLoading) {
      getUsers();
    }
  }, [users?.length, error, isLoading, getUsers]);

  if (!isLoading && error) {
    return <>ошибка: {error}</>;
  }

  return (
    <>
      <UserTable users={users} />
      <UserManagement />
    </>
  );
});
