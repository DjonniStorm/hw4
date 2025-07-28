import { useContext } from "react";
import { users } from "@/app/providers/store";

export const useStores = () => {
  return useContext(users);
};
