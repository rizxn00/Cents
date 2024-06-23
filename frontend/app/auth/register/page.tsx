import Button from '@/components/Button'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import BackgroundImage from '@/assets/images/background_image.png'
import Register_Illustration from '@/assets/svgs/register_illustration.svg'

export default function Register() {
    return (
        <div className='min-h-screen h-full flex justify-center items-center'>
            <Image src={BackgroundImage} alt='background-image' className='absolute h-screen -z-10' />
            <Image src={Register_Illustration} alt='login-image' className='h-[400px]' />
            <div className='flex flex-col bg-white px-20 pt-16 pb-10 gap-5 shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] rounded-xl'>
                <Label className='text-5xl font-extrabold text-center'>Cents</Label>
                <form className='flex flex-col w-96 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-sm'>Email</Label>
                        <Input type="email" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-sm'>Username</Label>
                        <Input type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-sm'>Password</Label>
                        <Input type="password" />
                    </div>
                    <div>
                        <Button type='submit' className='font-semibold'>Sign Up</Button>
                        <div className="relative flex py-3 items-center">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="flex-shrink mx-2 text-gray-400">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <Link href={'login'}>
                            <Button type='button' className='font-semibold'>Sign In</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
