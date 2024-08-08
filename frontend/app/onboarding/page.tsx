'use client'

import React, { useEffect, useState } from 'react'
import { Button, LoadingButton } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Select from '@/components/ui/Select'
import { ErrorAlert } from '@/components/ui/Alerts'
import { useRouter, useSearchParams } from 'next/navigation'
import withAuth from '@/components/withAuth'
import { currencies } from '@/data/currency_data'

function OnBoarding() {

    const [name, setName] = useState<string>('')
    const [currency, setCurrency] = useState<string>('')

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

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

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        const onBoardingData = {
            id: localStorage.getItem('id'),
            name: name,
            currency: currency,
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/onboarding`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(onBoardingData)
            })

            const data = await response.json()
            router.push('/dashboard')

            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data?.error || "An error occurred during onBoarding")
                return
            }

            localStorage.setItem("currency", currency)

        } catch (error) {
            console.error("Error during onBoarding:", error);
            setError("An error occurred during onBoarding")
        } finally {
            setIsSubmitting(false)
        }

        console.log(onBoardingData)
    }

    const searchParams = useSearchParams()
    const onboardingFlag = searchParams.get('false')

    useEffect(() => {
        if (onboardingFlag !== 'false') {
            router.push('/dashboard')
        }
    }, [onboardingFlag, router])

    return (
        <div className='min-h-screen flex flex-col gap-5 justify-center items-center'>
            {onboardingFlag === 'false' && (
                <>
                    <Label className='text-3xl'>On Boarding Details</Label>
                    <Card className="w-full max-w-[90%] md:max-w-2xl mb-20">
                        <form onSubmit={onSubmit} className='space-y-4 '>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="full_name">Full name:</Label>
                                <Input required type="text" id='full_name' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor='email'>Preffered Currency:</Label>
                                <Select options={currencies} placeholder='Choose a currency' value={currency} onChange={(e) => setCurrency(e)} />
                            </div>
                            <div className='flex justify-end'>
                                {!isSubmitting ?
                                    <Button type='submit'>Submit</Button>
                                    :
                                    <LoadingButton type='button'>submitting</LoadingButton>
                                }

                            </div>
                        </form>
                    </Card>
                    {error && error.length > 0 && <ErrorAlert message={error} onClose={() => setError('')} />}
                </>
            )}
        </div>
    )
}

export default  withAuth(OnBoarding)