import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({ error: "Необходим логин" })
    .min(1, { error: "Слишком короткий" }),
  password: z
    .string({ error: "Необходим пароль" })
    .min(1, { error: "Слишком короткий" }),
});
