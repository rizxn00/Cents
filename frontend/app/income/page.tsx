'use client'

import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import HomeLayout from '../home';


export default function Income() {

    const [addIncome, setAddIncome] = useState<boolean>(false)
    const [today, setToday] = useState<string>('');

    const income = [
        "Salary",
        "Wages",
        "Bonuses",
        "Commissions",
        "Overtime pay",
        "Self-employment income",
        "Business profits",
        "Freelance earnings",
        "Consulting fees",
        "Rental income",
        "Dividends",
        "Interest income",
        "Capital gains",
        "Royalties",
        "Pension",
        "Social Security benefits",
        "Retirement account withdrawals",
        "Unemployment benefits",
        "Disability benefits",
        "Alimony",
        "Child support",
        "Investment income",
        "Stock options",
        "Profit sharing",
        "Trust fund distributions",
        "Inheritance",
        "Lottery winnings",
        "Gambling winnings",
        "Gifts",
        "Grants",
        "Scholarships",
        "Tax refunds",
        "Insurance payouts",
        "Sale of assets",
        "Side gig income",
        "Affiliate marketing",
        "Sponsorships",
        "Ad revenue",
        "Coaching or tutoring",
        "Speaking engagements",
        "Workshop fees",
        "Online course sales",
        "E-book sales",
        "Merchandise sales",
        "Parking/garage rentals",
        "Airbnb or vacation rentals",
        "Peer-to-peer lending",
        "Rebates and cashback",
        "Jury duty pay",
        "Military benefits",
        "Farm income",
        "Mineral rights",
        "Recycling",
        "Others"
    ];

    useEffect(() => {
        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        setToday(formatDate(new Date()));

    }, [])

    const Income = [
        {
            'id': '1',
            'category': 'Salary',
            'date': '25/10/2023',
            'price': '1200',
            'description': 'salary for this month'
        },
        {
            'id': '2',
            'category': 'Wages',
            'date': '10/01/2024',
            'price': '450',
            'description': 'wage for the shop in banglore'
        },
        {
            'id': '3',
            'category': 'Royalty',
            'date': '30/05/2024',
            'price': '2500',
            'description': 'royalty for the stock IRCTC'
        },
        {
            'id': '4',
            'category': 'Others',
            'date': '01/06/2024',
            'price': '100',
            'description': 'Pocket money'
        },
    ]


    return (
        <HomeLayout>
            <div className='flex flex-col gap-10'>
                <div className='flex justify-between'>
                    <div>
                        <Label className='text-2xl font-bold'>Income Details</Label>
                    </div>
                    <Button type='button' onClick={() => setAddIncome(!addIncome)} className='flex h-fit gap-2'>
                        <svg className='text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Income</Button>
                </div>
                <Label className='text-5xl font-semibold text-green-700 dark:text-green-700'>$ 50000</Label>
                <div>
                    <Label className='text-xl font-medium'>Income</Label>
                    {Income.map((e) => (
                        <Card className='mt-5 flex flex-col' key={e.id}>
                            <div className='flex justify-between'>
                                <div className='flex gap-3'>
                                    <Label className='font-medium text-lg'>{e.category}</Label>
                                    <Label className='rounded-full bg-orange-700 text-white px-2 py-[1px] text-[12px] h-fit flex items-center'>{e.date}</Label>
                                </div>
                                <div className='flex gap-3'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <Label className='text-lg'>$ {e.price}</Label>
                            <Label className='text-xs font-light'>{e.description}</Label>
                        </Card>
                    ))}
                </div>
            </div>

            {addIncome &&
                <Modal Title='Add Income' isOpen={addIncome} onClose={() => setAddIncome(false)} buttonText='Submit'>
                    <form action="" className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor='description'>Description</Label>
                            <Input type='text' name='description' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label>Catergory</Label>
                            <Select options={income} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label>Income</Label>
                            <Input type="number" className='[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label>Date</Label>
                            <Input type='date' defaultValue={today} />
                        </div>
                    </form>
                </Modal>
            }
        </HomeLayout>
    )
}
