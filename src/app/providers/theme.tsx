"use client";

import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";

const grayColors: MantineColorsTuple = [
  "#cec9c9",
  "#d2d6db",
  "#cacdd3",
  "#afb3bb",
  "#9ca3af",
  "#6b7280",
  "#4b5563",
  "#374151",
  "#1f2a44",
  "#111827",
];

const beigeColors: MantineColorsTuple = [
  "#fefae0",
  "#fdf4d8",
  "#faedcd",
  "#f7e4b9",
  "#f4d8a0",
  "#e8c68a",
  "#d9b073",
  "#c9985c",
  "#b87f4a",
  "#a0683b",
];

const lightTheme = createTheme({
  fontFamily:
    'Fira-Code, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily:
      'Fira-Code, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: "400",
  },
  colors: {
    gray: grayColors,
    beige: beigeColors,
  },
  primaryColor: "gray",
  primaryShade: { light: 2, dark: 4 },
  defaultRadius: "md",
  radius: {
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
  },
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  white: "#e9e9ea",
  black: "#111827",
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
      },
    },
    Container: {
      defaultProps: {
        padding: "md",
      },
    },
  },
});

const darkTheme = createTheme({
  ...lightTheme,
  colors: {
    gray: grayColors,
    beige: beigeColors,
  },
  primaryColor: "beige",
  primaryShade: { light: 4, dark: 6 },
  white: "#111827",
  black: "#f9fafb",
});

export const Mantine = ({ children }: PropsWithChildren) => {
  const [isDark] = useLocalStorage({
    key: "mantine-color-scheme-value",
    defaultValue: false,
  });

  return (
    <MantineProvider theme={isDark ? darkTheme : lightTheme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};
