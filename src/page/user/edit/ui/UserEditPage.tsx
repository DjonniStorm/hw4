"use client";

import { useStores } from "@/app/hooks/use-store";
import { UserForm } from "@/features/user-form";
import { User, UserUpdateDto } from "@/shared/types";
import { notifications } from "@mantine/notifications";
import { observer } from "mobx-react-lite";
import { use, useEffect, useState } from "react";

export const UserEditPage = observer(
  ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [editUser, setEditUser] = useState<User | undefined>();
    const [isInitialized, setIsInitialized] = useState(false);

    const { selectedUser, getUser, updateUser } = useStores();

    useEffect(() => {
      if (isInitialized) return;

      const initializeUser = async () => {
        if (selectedUser && selectedUser.id === id) {
          setEditUser(selectedUser);
          setIsInitialized(true);
          return;
        }

        try {
          const result = await getUser(id);
          if (result.success && result.user) {
            setEditUser(result.user);
          } else {
            notifications.show({
              title: "Загрузка пользователя",
              message: "Не удалось загрузить пользователя",
              color: "red",
            });
            console.error("Не удалось загрузить пользователя:", result.error);
          }
        } catch (e: unknown) {
          console.error("Ошибка при загрузке пользователя:", e);
        } finally {
          setIsInitialized(true);
        }
      };

      initializeUser();
    }, [id, selectedUser, getUser, isInitialized]);

    const handleSubmit = async (user: User) => {
      console.log(user);
      const newUser: UserUpdateDto = {
        name: user.name,
        surName: user.surName,
        fullName: user.fullName,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
        telephone: user.telephone,
        employment: user.employment,
        userAgreement: user.userAgreement,
      };
      const res = await updateUser(user.id, newUser);
      if (!res.success) {
        notifications.show({
          title: "Обновление пользователя",
          message: "Не удалось обновить пользователя" + res.error,
          color: "red",
        });
        return;
      }
      notifications.show({
        title: "Обновление пользователя",
        message: "Успешно обновлен",
        color: "green",
      });
    };

    if (!isInitialized) {
      return <div>Загрузка...</div>;
    }

    if (!editUser) {
      return <div>Пользователь не найден</div>;
    }

    return <UserForm onSubmit={handleSubmit} initialValue={editUser} />;
  }
);
