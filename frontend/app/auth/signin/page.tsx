'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import { Button, LoadingButton } from '@/components/ui/Button'
import Image from 'next/image'
import Logo from '@/assets/images/cents.png'
import Login_Illustration from '@/assets/svgs/login_illustrartion.svg'
import background from '@/assets/svgs/background.svg'
import { useRouter } from 'next/navigation'
import { ErrorAlert } from '@/components/ui/Alerts'

export default function SignIn() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const router = useRouter()

    const onSubmit = async (event: any) => {
        event.preventDefault()
        setIsSubmitting(true)

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

            console.log(data)
            if (!response.ok) {
                setError(data.error || "An error occurred during signin")
                return
            }
            localStorage.setItem('token', data?.token)
            localStorage.setItem('id', data.data?.user?.id)
            localStorage.setItem('currency', data?.profileData[0]?.currency)
            if(!data?.profileData[0].onboarding){
                router.push(`/onboarding?false`)
            }
            else if (data?.profileData[0].onboarding){
                router.push('/dashboard')
            }
            else {
                return
            }
        } catch (error: any) {
            setError(error?.error || "An error occurred during signin")
            console.error("Error during signin:", error);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='min-h-screen h-full flex justify-center items-center'>
            <Image src={background} alt='background' className='absolute w-screen min-h-screen h-full' />
            <div className='flex flex-col bg-white dark:bg-zinc-950 z-10 items-center pt-16 pb-10 gap-5 transition-all shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] rounded-xl w-full max-w-[90%] md:max-w-lg lg:max-w-xl'>
                <div className='flex justify-center'>
                    <Image src={Logo} alt="logo" priority className="w-16 h-auto invert dark:invert-0" />
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
                        {!isSubmitting ?
                        <Button type='submit' className='w-full font-semibold'>Sign In</Button>
                        :
                        <LoadingButton type='button' className='w-full'></LoadingButton>}
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
            {error && error.length > 0 &&
                <ErrorAlert message={error} onClose={() => setError('')} />}
        </div>
    )
}
