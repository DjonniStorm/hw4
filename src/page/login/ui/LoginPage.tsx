import { LoginForm } from "@/features/login-form";
import { Center } from "@mantine/core";

export const LoginPage = () => {
  return (
    <main className="flex-1">
      <Center className="h-full">
        <LoginForm />
      </Center>
    </main>
  );
};
