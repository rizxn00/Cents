'use client'

import Card from '@/components/ui/Card'
import Label from '@/components/ui/Label'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import profile from '@/assets/svgs/profileIcon.svg'
import dprofile from '@/assets/svgs/dprofileIcon.svg'
import HomeLayout from '../home'
import { ErrorAlert, SuccessAlert } from '@/components/ui/Alerts'
import { Button } from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import { Loader } from '@/components/ui/Loader'
import { useRouter } from 'next/navigation'
import withAuth from '@/components/withAuth'


function Profile() {

    const [currency, setCurrency] = useState<string>('')

    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)

    const [data, setData] = useState<any>([])
    const [overview, setOverView] = useState<any>([])
    const [editData, setEditData] = useState<any>(data)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const router = useRouter()

    function performLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("navigationOpen");
        localStorage.removeItem("currency");
    
        setTimeout(() => {
            router.push('/auth/signin') 
        }, 2000);
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setEditData((prev: any) => ({ ...prev, [name]: value }));
    };

    const editProfile = async (event: any) => {
        event.preventDefault()
        setIsSubmitting(true)

        const editedData = {
            id: localStorage.getItem('id'),
            ...editData,
        };
        console.log("send data", editedData);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/updateprofile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editedData)
            });

            const data = await response.json();


            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data.error || "An error occurred during updating expense")
                return
            }

            setEdit(false)
            setData(data?.data)
            setSuccess(data?.message)
        } catch (error: any) {
            console.error("Error during updating expense:", error);
            setError("An error occurred during updating expense")
        } finally {
            setIsSubmitting(false)
        }
    }

    const getData = async () => {
        try {
            const [overviewResponse, profileResponse] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shared/getoverview/${localStorage.getItem("id")}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }),
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/getprofile/${localStorage.getItem("id")}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                })
            ])

            const overview = await overviewResponse.json();
            const profile = await profileResponse.json();
            console.log(overview)
            console.log(profile)

            if (!overviewResponse.ok) {
                 if(overviewResponse.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(overview?.error || "An error occurred during getting overview")
                return
            }

            if (!profileResponse.ok) {
                 if(profileResponse.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(profile?.error || "An error occurred during getting profile data")
                return
            }

            setData(profile?.data)
            setOverView(overview)

        } catch (error: any) {
            console.error("Error during getting data:", error);
            setError("An error occurred during fetching data")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCurrency = localStorage.getItem('currency');
            if (storedCurrency) {
                setCurrency(storedCurrency);
            }
            else {
                setTimeout(() => {
                    alert("Please choose a curreny")
                }, 1000);
                router.push('/settings')
            }
        }

        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])



    return (
        <HomeLayout>
            {isLoading ? <Loader />
                :
                <div>
                    <Card>
                        <div className='flex justify-end'>
                            <Button type='button' onClick={() => setEdit(true)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg></Button>
                        </div>
                        <div className='col-span-2 flex items-center justify-center mb-12'>
                            <Image src={profile} alt='profile' className='dark:hidden' />
                            <Image src={dprofile} alt='profile' className='hidden dark:block' />
                        </div>
                        <div className='flex flex-col md:grid grid-cols-3 gap-5'>
                            <div className='flex gap-2 items-center'>
                                <Label>Username:</Label>
                                <Label className='text-sm lg:text-xl'>{data?.username}</Label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <Label>Full name:</Label>
                                <Label className='text-sm lg:text-xl'>{data?.name}</Label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <Label>Email:</Label>
                                <Label className='text-sm lg:text-xl'>{data?.email}</Label>
                            </div>
                        </div>
                        <div className='col-span-2 gap-5 lg:gap-2 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 mt-5 '>
                            <Card className='whitespace-nowrap border border-zinc-300 dark:border-zinc-900'>
                                <div className='flex gap-2 items-center'>
                                    <Label>Total Income:</Label>
                                    <p className='text-green-600 text-sm lg:text-xl'>{currency}{overview?.TotalIncome}</p>
                                </div>
                            </Card>
                            <Card className='whitespace-nowrap border border-zinc-300 dark:border-zinc-900'>
                                <div className='flex gap-2 items-center'>
                                    <Label>Total Expenses:</Label>
                                    <p className='text-red-600 text-sm lg:text-xl'>{currency}{overview?.TotalExpense}</p>
                                </div>
                            </Card>
                            <Card className='whitespace-nowrap border border-zinc-300 dark:border-zinc-900'>
                                <div className='flex gap-2 items-center'>
                                    <Label>Total Savings:</Label>
                                    <p className='text-blue-600 text-sm lg:text-xl'>{currency}{overview?.Balance}</p>
                                </div>
                            </Card>
                            <Card className='whitespace-nowrap border border-zinc-300 dark:border-zinc-900'>
                                <div className='flex gap-2 items-center'>
                                    <Label>Total Transcations:</Label>
                                    <p className='text-orange-600 text-sm lg:text-xl'>{overview?.Transcation}</p>
                                </div>
                            </Card>
                        </div>
                    </Card>

                    <Modal Title='Edit' isOpen={edit} onClose={() => setEdit(false)} buttonText='Save' onSubmit={editProfile} isLoading={isSubmitting} loadingText='saving'>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" name="username" id="username" defaultValue={data?.username} onChange={handleEditChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" name="name" id="name" defaultValue={data?.name} onChange={handleEditChange} />
                        </div>
                        <Link href={'profile/changepassword'}>
                            <div className='mt-2 flex justify-end'>
                                <label className='text-orange-600'>change password</label>
                            </div>
                        </Link>
                    </Modal>
                </div>

            }
            {success && success.length > 0 && <SuccessAlert message={success} onClose={() => setSuccess('')} />}
            {error && error.length > 0 && <ErrorAlert message={error} onClose={() => setError('')} />}
        </HomeLayout>
    )
}

export default withAuth(Profile)