import React from 'react'
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

export default function SignIn() {
    return (
        <div className='min-h-screen h-full flex justify-center items-center'>
            <Image src={BackgroundImage} alt='background-image' className='absolute h-screen w-full -z-10 block dark:hidden' />
            <Image src={DarkBackgroundImage} alt='background-image' className='absolute h-screen w-full -z-10 hidden dark:block' />
            <div className='flex flex-col bg-white dark:bg-zinc-950 items-center pt-16 pb-10 gap-5 transition-all shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] rounded-xl w-full max-w-[90%] md:max-w-lg lg:max-w-xl'>
                <div className='flex justify-center'>
                    <Image src={Logo} alt="logo" className="w-16 h-auto invert dark:invert-0" />
                </div>
                <form className='flex flex-col w-full px-5 md:px-12 lg:px-16 gap-4 mt-5'>
                    <div className='flex flex-col gap-1'>
                        <Label>Username</Label>
                        <Input type="text" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Password</Label>
                        <Input type="password" />
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
        </div>
    )
}
