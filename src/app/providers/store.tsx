"use client";
import { usersStore } from "@/entities/user";
import { createContext } from "react";
export const users = createContext(usersStore);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <users.Provider value={usersStore}>{children}</users.Provider>;
};
