import { z } from "zod";

export const EmailSchema = z.object({
  email: z.string().email(),
});

export type EmailType = z.infer<typeof EmailSchema>;
