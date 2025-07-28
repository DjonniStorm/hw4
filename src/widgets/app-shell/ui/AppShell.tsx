"use client";
import { Header } from "@/shared/ui/header";
import { Sidebar } from "@/widgets/sidebar";
import { AppShell as Shell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Shell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <Shell.Header>
          <Header opened={opened} toggle={toggle} />
        </Shell.Header>
        <Shell.Navbar>
          <Sidebar />
        </Shell.Navbar>
        <Shell.Main>{children}</Shell.Main>
      </Shell>
    </>
  );
};
