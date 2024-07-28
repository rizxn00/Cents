'use client'

import Card from '@/components/ui/Card'
import Label from '@/components/ui/Label'
import Image from 'next/image'
import React, { useState } from 'react'
import profile from '@/assets/svgs/profileIcon.svg'
import dprofile from '@/assets/svgs/dprofileIcon.svg'
import image from '@/assets/images/background_image.png'
import avatar from '@/assets/svgs/login_illustrartion.svg'
import HomeLayout from '../home'
import { ErrorAlert, SuccessAlert } from '@/components/ui/Alerts'
import { Button } from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Link from 'next/link'


export default function Profile() {

    const [successAlert, setSuccessAlert] = useState<boolean>(false)
    const [errorAlert, setErrorAlert] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)

    const showSuccess = () => {
        setSuccessAlert(true)
    }

    const showError = () => {
        setErrorAlert(true)
    }

    function successAlertClose() {
        setSuccessAlert(false)
    }
    function errorAlertClose() {
        setErrorAlert(false)
    }


    return (
        <HomeLayout>
            <Card>
                <div className='flex justify-end'>
                    <Button type='button' onClick={() => setEdit(true)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg></Button>
                </div>
                <div className='flex flex-col md:grid grid-cols-2 gap-5'>
                    <div className='col-span-2 flex items-center justify-center mb-12'>
                        <Image src={profile} alt='profile' className='dark:hidden' />
                        <Image src={dprofile} alt='profile' className='hidden dark:block' />
                        {/* <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white" width={10} height={10} src={image} alt=""/> */}
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Label>Name:</Label>
                        <Label className='text-xl'>John Doe</Label>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Label>Email:</Label>
                        <Label className='text-xl'>john@email.com</Label>
                    </div>
                    <div className='col-span-2 gap-5 lg:gap-2 flex flex-col lg:grid grid-cols-3'>
                        <Card className='whitespace-nowrap border border-zinc-300 dark:border-zinc-900'>
                            <div className='flex gap-2 items-center'>
                                <Label>Total Income:</Label>
                                <p className='text-green-600 text-xl'>$309928</p>
                            </div>
                        </Card>
                        <Card className='whitespace-nowrap border border-zinc-300 dark:border-zinc-900'>
                            <div className='flex gap-2 items-center'>
                                <Label>Total Expenses:</Label>
                                <p className='text-red-600 text-xl'>$39928</p>
                            </div>
                        </Card>
                        <Card className='whitespace-nowrap border border-zinc-300 dark:border-zinc-900'>
                            <div className='flex gap-2 items-center'>
                                <Label>Total Savings:</Label>
                                <p className='text-orange-600 text-xl'>$4000</p>
                            </div>
                        </Card>
                    </div>
                </div>

            </Card>
            <div className='flex gap-2 mt-5'>
                <Button type='button' onClick={showSuccess}>Success Alert</Button>
                <Button type='button' onClick={showError}>Error Alert</Button>
            </div>
            <div className="fixed bottom-5 right-5 flex flex-col space-y-2">
                {successAlert && <SuccessAlert message='This is a Success alert' onClose={successAlertClose} />}
                {errorAlert && <ErrorAlert message='This is an Error alert' onClose={errorAlertClose} />}
            </div>

            <Modal Title='Edit' isOpen={edit} onClose={() => setEdit(false)} buttonText='Save'>
                <div>
                <form action="" className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" name="name" value='John Doe' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor='email'>Email</Label>
                        <Input type="email" id='email' value='john@email.com' />
                    </div>
                </form>
                </div>
                <Link href={'profile/changepassword'}>
                <div className='mt-2 flex justify-end'>
                <label className='text-orange-600'>change password</label>
                </div>
                </Link>
            </Modal>
        </HomeLayout>
    )
}
