"use client"
import React, { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LoginFormSchema, SignupFormSchema } from '@/lib/type';
import * as z from 'zod';
import clsx from 'clsx';
import Image from 'next/image'
import Link from 'next/link';
import Logo from '@/root/public/synapseLogo.svg'
import Loader from '@/components/global/Loader';
import { actionSignupUser } from '@/lib/server-actions/auth-actions';

const Signup = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [submitError, setSubmitError] = useState(" ");
    const [confirmation, setconfirmation] = useState(false);


    const codeExchangeError = useMemo(() => {
        if (!searchParams) return "";
        return searchParams.get('error_description');
    }, [searchParams])

    const confirmationAndErrorStyles = useMemo(() => {
        return clsx('bgPrimary', {
            "bg-red-500/10": codeExchangeError,
            'border-red-500/50': codeExchangeError,
            'text-red-700': codeExchangeError
        })
    }, [confirmation])

    const form = useForm<z.infer<typeof SignupFormSchema>>({
        mode: "onChange",
        resolver: zodResolver(SignupFormSchema),
        defaultValues: { email: '', password: '', confirmPassword: '' },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async({email, password}:z.infer<typeof LoginFormSchema>) => {
        console.log({"email":email, "pwd":password});
        const {error} = await actionSignupUser({email, password});
        if(error){
            console.log("Error:", error);
            setSubmitError(error.message);
            // form.reset(); 
            return;
        }
        setconfirmation(true); 
    };

    const signupHandler = () => { };

    return (
        <Form {...form} >
            <form
                onChange={() => {
                    if (submitError) setSubmitError('')
                }
                }
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'
            >
                <Link
                    href='/'
                    className='w-full flex  justify-left items-center'
                >
                    <Image src={Logo} alt='logo' width={50} height={50} />
                    <span className='font-semibold dark:text-white text-4xl ml-2'>Synapse</span>
                </Link>
                <FormDescription className='text-foreground/60'>
                    An all-in-one collaboration and productivity tool
                </FormDescription>
                {!confirmation && !codeExchangeError && <>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                disabled={isLoading}
                                        type='email'
                                        placeholder='Email'
                                        {...field}
                                    >
                                    </Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                disabled={isLoading}
                                        type='password'
                                        placeholder='Password'
                                        {...field}
                                    >
                                    </Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                disabled={isLoading}
                                        type='password'
                                        placeholder='Confirm Password'
                                        {...field}
                                    >
                                    </Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <Button type='submit' className='w-full p-6' disabled={isLoading}> */}
                    <Button type='submit' className='w-full p-6'>
                        {
                            !isLoading ? "Create Account" : <Loader />
                        }
                    </Button>
                </>}

                {submitError && <FormMessage>{submitError}</FormMessage>}

                {/* <Button
                    type='submit'
                    className='w-full p-6'
                    size="lg"
                    disabled={isLoading}
                >
                    {!isLoading ? 'Login' : (
                        <Loader />
                    )}
                </Button> */}

                <span className='self-center'>
                    Already have an account?
                    <Link href="/login" className='text-primary'> Login </Link> now!
                </span>
                {(confirmation || codeExchangeError ) && <>
                    <Alert className={confirmationAndErrorStyles}>
                    {!codeExchangeError && <MailCheck className='h-4 w-4'/>}
                    <AlertTitle>{codeExchangeError ? "Invalid Link" : "Check your email"}</AlertTitle>
                    <AlertDescription>
                        {
                            codeExchangeError || "An email confirmation has been sent."
                        }
                    </AlertDescription>
                    </Alert>
                </>}
            </form>
        </Form>
    )
}

export default Signup