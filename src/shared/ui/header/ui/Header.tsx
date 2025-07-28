"use client";
import { authStore } from "@/shared/lib";
import { Burger, Button, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
};

export const Header = ({ opened, toggle }: HeaderProps) => {
  const { logout, user, error } = authStore;
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    if (error) {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось выйти",
      });
      return;
    }
    router.push("/login");
  };
  return (
    <>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Админ-панель</Text>
        </Group>
        <Group gap={50}>
          <Text>привет, {user?.name || user?.surName || "*"}</Text>
          <Button onClick={handleLogout}>
            <Text span pr={5}>
              Выйти
            </Text>
            <IconLogout />
          </Button>
        </Group>
      </Group>
    </>
  );
};
