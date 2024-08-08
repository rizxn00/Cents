'use client'

import Label from '@/components/ui/Label'
import { Button, LoadingButton } from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '@/assets/images/cents.png'
import background from '@/assets/svgs/background.svg'
import { ErrorAlert } from '@/components/ui/Alerts'
import { useRouter } from 'next/navigation'


export default function SignUp() {

    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


    const router = useRouter()

    const onSubmit = async (event: any) => {
        event.preventDefault()
        setIsSubmitting(true)

        const userData = {
            email: email,
            username: username,
            password: password
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "An error occurred during signup")
                return
            }
            router.push('/auth/signin')
        } catch (error: any) {
            console.error("Error during signup:", error);
            setError(error.error || "An error occurred during signup")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='min-h-screen h-full flex justify-center items-center'>
            <Image src={background} alt='background' className='absolute w-full min-h-screen h-full' />
            <div className='flex flex-col bg-zinc-100 dark:bg-zinc-950 z-10 items-center pt-16 pb-10 gap-5 transition-all shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] rounded-xl w-full max-w-[90%] md:max-w-lg lg:max-w-xl'>
                <div className='flex justify-center'>
                    <Image src={Logo} alt="logo" priority className="w-16 h-auto invert dark:invert-0" />
                </div>
                <form onSubmit={onSubmit} className='flex flex-col w-full px-5 md:px-12 lg:px-16 gap-4 mt-5'>
                    <div className='flex flex-col gap-1'>
                        <Label>Email</Label>
                        <Input required type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                        <div className='flex flex-col gap-1'>
                        </div>
                        <Label>Username</Label>
                        <Input required type="text" value={username} onChange={(e: any) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Password</Label>
                        <Input required type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        {!isSubmitting ?
                            <Button type='submit' className='w-full font-semibold'>Sign Up</Button>
                            :
                            <LoadingButton type='button' className='w-full'></LoadingButton>}
                        <div className="relative flex py-3 items-center">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="flex-shrink mx-2 text-gray-400">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <Link href={'signin'}>
                            <Button type='button' className='w-full font-semibold'>Sign In</Button>
                        </Link>
                    </div>
                </form>
            </div>
            {error && error.length > 0 &&
                <ErrorAlert message={error} onClose={() => setError('')} />}
        </div>
    )
}
