import { Button, Center, Stack } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Center className="min-h-screen">
        <Stack>
          <h1>Страница не найдена :(</h1>
          <Center>
            <Link href={"/"}>
              <Button>Назад</Button>
            </Link>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
