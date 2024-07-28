'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Logo from '@/assets/images/cents.png'
import BackgroundImage from '@/assets/images/background_image.png'
import DarkBackgroundImage from '@/assets/images/dark_background_image.png'
import Login_Illustration from '@/assets/svgs/login_illustrartion.svg'
import bade from '@/assets/svgs/backgroundgradient.svg'
import { useRouter } from 'next/navigation'
import { ErrorAlert } from '@/components/ui/Alerts'

export default function SignIn() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [errorData, setErrorData] = useState<string>('')

    const router = useRouter()

    const onSubmit = async (event: any) => {
        event.preventDefault()

        const userData = {
            email: email,
            password: password
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });


            const data = await response.json();

            if (!response.ok) {
                setError(true)
                setErrorData(data.error || "An error occurred during signin")
                return
            }
            localStorage.setItem('token', data.data?.session?.access_token)
            localStorage.setItem('id', data.data?.user?.id)
            router.push('/dashboard')

        } catch (error: any) {
            console.error("Error during signin:", error);
        }
    }

    return (
        <div className='min-h-screen h-full flex justify-center items-center'>
            <Image src={BackgroundImage} alt='background-image' className='absolute h-screen w-full -z-10 block dark:hidden' />
            <Image src={DarkBackgroundImage} alt='background-image' className='absolute h-screen w-full -z-10 hidden dark:block' />
            <div className='flex flex-col bg-white dark:bg-zinc-950 items-center pt-16 pb-10 gap-5 transition-all shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] rounded-xl w-full max-w-[90%] md:max-w-lg lg:max-w-xl'>
                <div className='flex justify-center'>
                    <Image src={Logo} alt="logo" className="w-16 h-auto invert dark:invert-0" />
                </div>
                <form onSubmit={onSubmit} className='flex flex-col w-full px-5 md:px-12 lg:px-16 gap-4 mt-5'>
                    <div className='flex flex-col gap-1'>
                        <Label>Email</Label>
                        <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Password</Label>
                        <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='mt-5'>
                        <Button type='submit' className='w-full font-semibold'>Sign In</Button>
                        <div className="relative flex py-3 items-center">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="flex-shrink mx-2 text-gray-400">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <Link href={'signup'}>
                            <Button type='button' className='w-full font-semibold'>Create Account</Button>
                        </Link>
                    </div>
                </form>
            </div>
            <Image src={Login_Illustration} alt='login-image' className='h-[400px] hidden md:block' />

            {error &&
                <ErrorAlert message={errorData} onClose={() => setError(false)} />}
        </div>
    )
}
