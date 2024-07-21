import Card from '@/components/ui/Card'
import Label from '@/components/ui/Label'
import Image from 'next/image'
import React from 'react'
import image from '@/assets/images/background_image.png'
import avatar from '@/assets/svgs/login_illustrartion.svg'
import HomeLayout from '../home'

export default function Profile() {
    return (
        <HomeLayout>
            <Card className='flex flex-col gap-5 md:gap-10'>
                <div>
                    <Image src={image} alt='cover' className='bg-cover w-full h-20 rounded'></Image>
                </div>
                <div className='rounded-full border w-36 h-36 overflow-hidden'>
                    <Image src={avatar} alt='profile' className='object-cover'></Image>
                </div>
                <div className='flex gap-10'>
                    <Label className='font-semibold'>Name :</Label>
                    <Label className='font-medium text-sm'>Its me bruv</Label>
                </div>
                <div className='flex gap-10'>
                    <Label className='font-semibold'>Email :</Label>
                    <Label className='font-medium text-sm'>mail@mail.com</Label>
                </div>
                <div className='flex gap-10'>
                    <Label className='font-semibold'>Contact :</Label>
                    <Label className='font-medium text-sm'>9999999999</Label>
                </div>
            </Card>
        </HomeLayout>
    )
}
