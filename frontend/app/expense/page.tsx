'use client'

import React, { useEffect, useState } from 'react'
import ClickOutside from '@/components/ClickOutside'
import { Button } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import HomeLayout from '../home'

export default function Report() {

    const [addExpense, setAddExpense] = useState<boolean>(false)
    const [today, setToday] = useState<string>('');


    const expenses = [
        "Rent/Mortgage",
        "Property taxes",
        "Home insurance",
        "Utilities (electricity, water, gas)",
        "Maintenance and repairs",
        "Car payments",
        "Fuel",
        "Public transportation",
        "Vehicle maintenance",
        "Car insurance",
        "Groceries",
        "Dining out",
        "Food delivery",
        "Health insurance",
        "Prescription medications",
        "Doctor visits",
        "Dental care",
        "Vision care",
        "Clothing",
        "Personal care (haircuts, cosmetics)",
        "Gym membership",
        "Hobbies",
        "Streaming services",
        "Movies/concerts",
        "Sports events",
        "Tuition",
        "School supplies",
        "Books",
        "Online courses",
        "Credit card payments",
        "Student loan payments",
        "Personal loan payments",
        "Emergency fund",
        "Retirement contributions",
        "Investment accounts",
        "Life insurance",
        "Disability insurance",
        "Renters insurance",
        "Charitable contributions",
        "Birthday/holiday gifts",
        "Vacations",
        "Business trips",
        "Food",
        "Veterinary care",
        "Grooming",
        "Phone bill",
        "Internet service",
        "Device purchases",
        "Daycare",
        "Babysitting",
        "Legal fees",
        "Accounting services",
        "Income tax",
        "Property tax",
        "Sales tax",
        "Magazines",
        "Software subscriptions",
        "Membership fees",
        "Office supplies",
        "Equipment",
        "Unexpected expenses",
        "Fees and fines",
        "Others",
    ]

    useEffect(() => {
        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        setToday(formatDate(new Date()));

    }, [])


    const Expenses = [
        {
            'category': 'Rent/Mortgage',
            'date': '25/10/2023',
            'price': '200',
            'description': 'rent for this month is paid for'
        },
        {
            'category': 'Fuel',
            'date': '10/01/2024',
            'price': '50',
            'description': 'fuel expense'
        },
        {
            'category': 'Clothings',
            'date': '30/05/2024',
            'price': '500',
            'description': 'bought outfits'
        },
    ]



    return (
        <HomeLayout>
            <div className='flex flex-col gap-10'>
                <div className='flex justify-between'>
                    <div>
                        <Label className='text-2xl font-bold'>Expense Details</Label>
                    </div>
                    <Button type='button' onClick={() => setAddExpense(!addExpense)} className='flex h-fit gap-2'>
                        <svg className='text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Expense</Button>
                </div>
                <Label className='text-5xl font-semibold'>$50000</Label>
                <div>
                    <Label className='text-xl font-medium'>Expenses</Label>
                    {Expenses.map((e: any, index: number) => (
                        <Card className='mt-5 flex flex-col' key={index}>
                            <div className='flex justify-between'>
                                <div className='flex gap-3 items-center'>
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
                            <div className='text-lg'>${e.price}</div>
                            <Label className='text-xs font-light'>{e.description}</Label>
                        </Card>
                    ))}
                </div>
            </div>

            {addExpense && (
                <ClickOutside onClick={() => setAddExpense(false)}>
                    <Modal Title="Add Expense" isOpen={addExpense} onClose={() => setAddExpense(false)} buttonText="Submit">
                        <form action="" className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="description">Description</Label>
                                <Input type="text" name="description" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Category</Label>
                                <Select options={expenses} placeholder='Choose a category' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Expense</Label>
                                <Input type="number" className='[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Date</Label>
                                <Input type="date" defaultValue={today} />
                            </div>
                        </form>
                    </Modal>
                </ClickOutside>
            )}
        </HomeLayout>
    )
}
