import { z } from "zod";
import { loginSchema } from "../lib";

export type User = {
  id: string;
  name: string;
  surName: string;
  fullName: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
};

export type UserCreateDto = {
  name: string;
  surName: string;
  password: string;
  fullName: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
};

export type UserCreate = UserCreateDto & {
  confirmPassword: string;
};

export type UserUpdateDto = {
  name: string;
  surName: string;
  fullName: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
};

export type LoginData = z.infer<typeof loginSchema>;

export type UserAuth = {
  id: string;
  email: string;
  name: string;
  surName: string;
  fullName: string;
};
