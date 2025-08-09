import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
