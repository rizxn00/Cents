import React from 'react'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import {Button} from '@/components/ui/Button'
import Image from 'next/image'
import BackgroundImage from '@/assets/images/background_image.png'
import Login_Illustration from '@/assets/svgs/login_illustrartion.svg'

export default function SignIn() {
    return (
        <div className='min-h-screen h-full flex justify-center items-center'>
            <Image src={BackgroundImage} alt='background-image' className='absolute h-screen w-full -z-10' />
                <div className='flex flex-col px-20 bg-white max-w-[90%] pt-16 pb-10 gap-5 shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] rounded-xl'>
                    <Label className='text-5xl font-extrabold text-center'>Cents</Label>
                    <form className='flex flex-col w-96 gap-4 mt-5'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-medium'>Username</Label>
                            <Input type="text" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-medium'>Password</Label>
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
                <Image src={Login_Illustration} alt='login-image' className='h-[400px]'/>
        </div>
    )
}
