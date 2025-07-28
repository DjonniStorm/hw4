import { Flex } from "@mantine/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Flex className="min-h-screen">{children}</Flex>;
}
