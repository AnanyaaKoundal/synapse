import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().describe('Email').email({message:"Invalid email address"}),
    password: z.string().describe('Password').min(1, "Password is required"),
})

export const SignupFormSchema = z.object({
    email: z.string().describe('Email').email({message:"Invalid email address"}),
    password: z.string().describe('Password').min(6, "Password must be minimum 6 characters"),
    confirmPassword: z.string().describe('Confirm Password').min(6, "Password must be 6 characters long"),
}).refine((data)=>{
    data.password === data.confirmPassword, {
        message: "Password don't match!",
        path: ['confirmPassword']
    }
})