"use client";
import { ROUTES } from "@/shared/config";
import { NavLink, Stack } from "@mantine/core";
import { IconUserPlus, IconUsersGroup } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

const SIDEBAR_ROUTES = [
  {
    label: "Пользователи",
    icon: IconUsersGroup,
    link: ROUTES.main,
  },
  {
    label: "Создать пользователя",
    icon: IconUserPlus,
    link: ROUTES.user.create,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (link: string) => {
    if (pathname !== link) {
      router.push(link);
    }
  };

  return (
    <>
      <Stack gap={10} p={10}>
        {SIDEBAR_ROUTES.map((route) => (
          <NavLink
            key={route.link}
            label={route.label}
            leftSection={<route.icon />}
            active={pathname === route.link}
            onClick={() => handleLinkClick(route.link)}
            bdrs="md"
          />
        ))}
      </Stack>
    </>
  );
};
