"use server";

import { createClient } from '../supabase/client'
import { LoginFormSchema } from "../type";
import * as z from 'zod';

export async function actionLoginUser({ email, password }: z.infer<typeof LoginFormSchema>) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.log("auth-actions Error: ", error);
    }

    return { data, error };
}

export async function actionSignupUser({ email, password }: z.infer<typeof LoginFormSchema>) {
    const supabase = createClient();
    const { data } = await supabase.from('profile').select('*').eq('email', email);

    if (data?.length) {
        return { error: { message: "User already exists", data } };
    }

    const response = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`
        }
    })
    return response;

}