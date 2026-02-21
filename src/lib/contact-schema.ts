import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().min(1).email(),
  message: z.string().min(10).max(5000),
  website: z.string().optional(), // honeypot
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactResult =
  | { success: true }
  | { success: false; error: string };
