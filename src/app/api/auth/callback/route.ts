import { createClient } from '@/lib/supabase/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req:NextRequest){
    const requestURL = new URL(req.url);
    const code = requestURL.searchParams.get('code');

    if(code){
        const supabase = createClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    return `${requestURL.origin}/dashboard`;
}