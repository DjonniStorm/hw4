"use client";
import { useStores } from "@/app/hooks/use-store";
import { UserForm } from "@/features/user-form";
import type { UserCreate, UserCreateDto } from "@/shared/types";
import { Container } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export const UserCreatePage = () => {
  const router = useRouter();
  const { addUser } = useStores();
  const handleSubmit = async (user: UserCreate) => {
    const newUser: UserCreateDto = {
      name: user.name,
      surName: user.surName,
      password: user.password,
      fullName: user.fullName,
      email: user.email,
      birthDate: user.birthDate,
      telephone: user.telephone,
      employment: user.employment,
      userAgreement: user.userAgreement,
    };
    const { success, error } = await addUser(newUser);
    notifications.show({
      title: "Добавление пользователя",
      message: success ? "Успешно добавлен" : error,
      color: success ? "green" : "red",
    });

    if (success) {
      router.push("/");
    }
  };

  return (
    <>
      <Container>
        <UserForm onSubmit={handleSubmit} />
      </Container>
    </>
  );
};
