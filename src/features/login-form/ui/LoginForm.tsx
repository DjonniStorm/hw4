"use client";

import { authStore } from "@/shared/lib";
import { loginSchema } from "@/shared/lib";
import { LoginData } from "@/shared/types";
import { Paper, Stack, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRedirect } from "@/shared/hooks/use-redirect";

export const LoginForm = observer(() => {
  const { login, error, isAuthenticated, isLoading } = authStore;
  const { redirectAfterLogin } = useRedirect();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      redirectAfterLogin();
    }
  }, [isAuthenticated, isLoading, redirectAfterLogin]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const handleSubmit = async (values: LoginData) => {
    try {
      await login(values);
    } catch {
      notifications.show({
        title: "Ошибка при входе",
        message: error || "Неизвестная ошибка",
        color: "red",
      });
    }
  };

  return (
    <>
      <Paper withBorder shadow="xl" radius="xl" p="xl">
        <form className="w-80" onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Введите логин:"
              placeholder="palpatine66@empire.sw"
              labelProps={{
                fz: "lg",
                p: "sm",
              }}
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Введите пароль:"
              placeholder="****"
              labelProps={{
                fz: "lg",
                p: "sm",
              }}
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Button type="submit" loading={isLoading}>
              Войти
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
});
