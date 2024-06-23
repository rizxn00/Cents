'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Label from '@/components/Label'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import Input from '@/components/Input'

export default function Dashboard() {

    const [addExpense, setAddExpense] = useState<boolean>(false)

    return (
        <div className='flex flex-row'>
            <Navigation />
            <div className='ml-16 p-5 w-full'>
                <div className='flex flex-col gap-10'>
                    <div className='flex justify-between'>  
                        <div>
                            <Label className='text-2xl font-bold'>Good {'morning'}, User</Label>
                            <Label className='hidden sm:block'>Access insights and track your financial journey</Label>
                        </div>
                        <Button type='button' onClick={() => setAddExpense(!addExpense)} className='flex h-fit w-fit'>
                            <svg className="flex" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            Add Expense</Button>
                    </div>
                    {addExpense && 
                        <Modal Title='Add Expense' isOpen={addExpense} onClose={() => setAddExpense(false)} buttonText='Submit'>
                            <form action="">
                                <div>
                                    <Label>Name</Label>
                                    <Input type='text'/>
                                </div>
                            </form>
                        </Modal>
                    }
                    <div>
                        <Label className='font-bold text-lg p-1'>My Expenses</Label>
                        <Card>
                            <Label className='font-semibold'>Today’s Expense</Label>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
