"use client";
import { UserForm } from "@/features/user-form";

export const UserEditPage = () => {
  return (
    <>
      <UserForm onSubmit={(user) => console.log(user)} onCancel={console.log} />
    </>
  );
};
