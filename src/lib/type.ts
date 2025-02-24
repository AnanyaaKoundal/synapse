import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().describe('Email').email({message:"Inavid email address"}),
    password: z.string().describe('Password').min(1, "Password is required"),
})