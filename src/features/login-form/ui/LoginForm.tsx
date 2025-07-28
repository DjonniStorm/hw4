"use client";

import { authStore } from "@/shared/lib";
import { loginSchema } from "@/shared/lib";
import { LoginData } from "@/shared/types";
import { Paper, Stack, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoginForm = observer(() => {
  const router = useRouter();
  const { login, error, isAuthenticated } = authStore;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });
  const handleSubmit = async (values: LoginData) => {
    await login(values);
    if (error) {
      notifications.show({
        title: "Ошибка при входе",
        message: error,
      });
    }
  };
  return (
    <>
      <Paper withBorder shadow="xl" radius="xl" p="xl">
        <form className="w-80" onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap={10}>
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
            <Button type="submit">Войти</Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
});
