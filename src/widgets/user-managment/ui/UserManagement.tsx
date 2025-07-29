"use client";
import { useStores } from "@/app/hooks/use-store";
import { usersStore } from "@/entities/user";
import { Button, Container, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// вы (Проверяющие) прикиньте, использование MobX без observer
export const UserManagement = () => {
  const { deleteUser, selectedUser } = useStores();
  const router = useRouter();

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const originalSetter = usersStore.setSelectedUser;
    usersStore.setSelectedUser = (user) => {
      originalSetter.call(usersStore, user);
      forceUpdate({});
    };

    return () => {
      usersStore.setSelectedUser = originalSetter;
    };
  }, [forceUpdate]);

  const handleDelete = async () => {
    if (!selectedUser) {
      notifications.show({
        title: "Удаление пользователя",
        message: "Не выбран пользователь",
        color: "red",
      });
      return;
    }

    const res = await deleteUser(selectedUser.id);
    notifications.show({
      title: "Удаление пользователя",
      message: res.success ? "Успешно" : res.error,
      color: res.success ? "green" : "red",
    });
  };

  const handleEdit = () => {
    if (!selectedUser) {
      notifications.show({
        title: "Редактирование пользователя",
        message: "Не выбран пользователь",
        color: "red",
      });
      return;
    }
    router.push(`/user/edit/${selectedUser.id}`);
  };
  return (
    <>
      <Container
        style={{
          display: !selectedUser?.id ? "none" : "block",
        }}
      >
        <Group>
          <Button
            onClick={handleEdit}
            leftSection={<IconEdit size={14} />}
            variant="default"
          >
            Изменить
          </Button>
          <Button onClick={handleDelete} leftSection={<IconTrash size={14} />}>
            Удалить
          </Button>
        </Group>
      </Container>
    </>
  );
};
