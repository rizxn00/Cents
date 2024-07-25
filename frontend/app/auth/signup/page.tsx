import { Button } from '@/components/ui/Button'
import Label from '@/components/ui/Label'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/images/cents.png'
import BackgroundImage from '@/assets/images/background_image.png'
import DarkBackgroundImage from '@/assets/images/dark_background_image.png'
import Register_Illustration from '@/assets/svgs/register_illustration.svg'

export default function SignUp() {
    return (
        <div className='min-h-screen h-full flex justify-center items-center'>
            <Image src={BackgroundImage} alt='background-image' className='absolute h-screen w-full -z-10 block dark:hidden' />
            <Image src={DarkBackgroundImage} alt='background-image' className='absolute h-screen w-full -z-10 hidden dark:block' />
            <Image src={Register_Illustration} alt='login-image' className='h-[400px] hidden md:block' />
            <div className='flex flex-col bg-white dark:bg-zinc-950 items-center pt-16 pb-10 gap-5 transition-all shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] rounded-xl w-full max-w-[90%] md:max-w-lg lg:max-w-xl'>
                <div className='flex justify-center'>
                    <Image src={Logo} alt="logo" className="w-16 h-auto invert dark:invert-0" />
                </div>
                <form className='flex flex-col w-full px-5 md:px-12 lg:px-16 gap-4 mt-5'>
                    <div className='flex flex-col gap-1'>
                        <Label>Email</Label>
                        <Input type="email" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Username</Label>
                        <Input type="text" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Password</Label>
                        <Input type="password" />
                    </div>
                    <div>
                        <Button type='submit' className='w-full font-semibold'>Sign Up</Button>
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
        </div>
    )
}
