"use client";
import type { User, UserCreate } from "@/shared/types";
import {
  Button,
  Checkbox,
  Fieldset,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

type UserFormProps = {
  initialValue?: User;
  onSubmit: (user: UserCreate) => void;
};

export const UserForm = ({ initialValue, onSubmit }: UserFormProps) => {
  const form = useForm<UserCreate>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      surName: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      email: "",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      birthDate: new Date(),
      telephone: "",
      employment: "",
      userAgreement: false,
      ...initialValue,
    },
  });

  const handleSubmit = (values: UserCreate) => {
    if (values.password !== values.confirmPassword) {
      notifications.show({
        title: "Ошибка",
        message: "Пароли не совпадают",
        color: "red",
      });
      return;
    }
    onSubmit({
      ...values,
      fullName: `${values.name} ${values.surName}`,
      password: values.password,
      birthDate: new Date(values.birthDate || new Date()).toISOString(),
    });
  };

  return (
    <Paper shadow="xl" radius="lg" p="xl" withBorder>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Stack pb="md">
          <Fieldset
            legend="персональные данные"
            className="flex flex-col gap-10"
          >
            <Group className="w-full flex-1" justify="space-between">
              <TextInput
                w="40%"
                label="Имя"
                placeholder="введите имя"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
              <TextInput
                w="40%"
                label="Фамилия"
                placeholder="введите фамилию"
                key={form.key("surName")}
                {...form.getInputProps("surName")}
              />
            </Group>
            <Group className="w-full flex-1" justify="space-between">
              <Stack justify="center" pr="sm" w="40%">
                <TextInput
                  label="Адрес электронной почты"
                  placeholder="example@example.ru"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Номер телефона"
                  placeholder="+7-777-777-77-77"
                  key={form.key("telephone")}
                  {...form.getInputProps("telephone")}
                />
              </Stack>
              <DatePickerInput
                label="Дата рождения"
                placeholder="выберите дату рождения"
                w="40%"
                key={form.key("birthDate")}
                {...form.getInputProps("birthDate")}
              />
            </Group>
          </Fieldset>
          <Fieldset legend="пароль">
            <PasswordInput
              label="Придумайте пароль"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Подтвердите пароль"
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
            />
          </Fieldset>
          <Fieldset legend="что-то">
            <TextInput
              label="Employment"
              pb="sm"
              key={form.key("employment")}
              {...form.getInputProps("employment")}
            />
            <Checkbox
              label="Согласие"
              key={form.key("userAgreement")}
              {...form.getInputProps("userAgreement", { type: "checkbox" })}
            />
          </Fieldset>
        </Stack>
        <Button type="submit">Готово</Button>
      </form>
    </Paper>
  );
};
