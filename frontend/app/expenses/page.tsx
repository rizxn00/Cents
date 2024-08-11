'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import HomeLayout from '../home'
import { SuccessAlert, ErrorAlert } from '@/components/ui/Alerts'
import { Loader } from '@/components/ui/Loader'
import { useRouter } from 'next/navigation'
import withAuth from '@/components/withAuth'
import { expenses } from '@/data/expense_data'
import Link from 'next/link'


function Expense() {

    const [currency, setCurrency] = useState<string>('$');
    const [allExpenses, setAllExpenses] = useState<any>([])

    const [addExpense, setAddExpense] = useState<boolean>(false)
    const [today, setToday] = useState<string>('')

    const [amount, setAmount] = useState<number>()
    const [category, setCategory] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [sum, setSum] = useState<number>(0)

    const [success, setSuccess] = useState<string>('')
    const [error, setError] = useState<string>('')

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
    
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        const expenseData = {
            id: localStorage.getItem("id"),
            amount: amount,
            category: category,
            description: description,
            date: new Date(date).toISOString()
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(expenseData),
            });

            const data = await response.json();

            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data.error || "An error occurred during creating expense")
                return
            }

            setSuccess(data?.message)
            setAllExpenses([...allExpenses, data?.data])
            setSum(sum + data?.data?.amount)
            setAddExpense(false)
            resetFormFields()
        } catch (error: any) {
            console.error("Error during creating expense:", error);
            setError("An error occurred during creating expense")
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetFormFields = () => {
        setAmount(undefined)
        setCategory('')
        setDescription('')
        setDate(today)
    }
    
    const getExpenses = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/get/${localStorage.getItem("id")}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();
            if (!response.ok) {
                if (data && data?.error === 'No expenses found for this user in the current month') {
                    return
                }
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data?.error || "An error occurred during getting expenses")
                setIsSubmitting(false)
                return
            }
            setAllExpenses(data?.Expenses)
            setSum(data?.sum)
        } catch (error: any) {
            console.error("Error during getting expenses:", error);
            setError("An error occurred during fetching expense")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        const todayFormatted = formatDate(new Date());
        setToday(todayFormatted)
        setDate(todayFormatted);

        if (typeof window !== 'undefined') {
            const storedCurrency = localStorage.getItem('currency');
            if (storedCurrency) {
              setCurrency(storedCurrency);
            }
          }

        getExpenses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function formatDate(inputDate: string): string {
        const date = new Date(inputDate);
      
        if (isNaN(date.getTime())) {
          return "Invalid date input";
        }
      
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
      
        return `${day}/${month}/${year}`;
      }

    return (
        <HomeLayout>
            <div className='flex flex-col gap-10'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <Label className='text-xl md:text-2xl transition-all font-bold'>Expense Details</Label>
                    </div>
                    <Button type='button' onClick={() => { resetFormFields(), setAddExpense(true) }} className='flex h-fit gap-2'>
                        <svg className='text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='hidden md:block'>Expense</span>
                    </Button>
                </div>
                <p className='text-5xl font-semibold text-red-800 overflow-hidden'>{currency}{sum}</p>
                <div>
                    <Label className='text-xl font-medium'>Expenses</Label>
                    {isLoading ? <Loader /> : <div>
                        {allExpenses.map((e: any, index: number) => (
                        <Link href={`/expense?data=${encodeURIComponent(JSON.stringify(e))}`} key={index}>
                            <Card className='mt-5 flex flex-col gap-1'>
                                <div className='flex gap-3'>
                                    <Label className='font-medium text-lg'>{e.category}</Label>
                                    <Label className='rounded-full bg-orange-700 text-white px-2 py-[1px] text-[12px]'>{formatDate(e.date)}</Label>
                                </div>
                                <div className='text-lg'>{currency}{e.amount}</div>
                                <Label className='text-xs font-light'>{e.description}</Label>
                            </Card>
                        </Link>
                        ))}
                    </div>
                    }
                </div>
            </div>

            {/* Add Expense Modal */}
            <Modal Title="Add Expense" isOpen={addExpense} onClose={() => { resetFormFields(), setAddExpense(false), setIsSubmitting(false) }} buttonText="Submit" onSubmit={onSubmit} isLoading={isSubmitting} loadingText='submitting'>
                <div className="flex flex-col gap-1">
                    <Label>Expense</Label>
                    <Input required type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' />
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Category</Label>
                    <Select options={expenses} placeholder='Choose a category' value={category} onChange={(e) => setCategory(e)} />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Date</Label>
                    <Input required type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
            </Modal>            

            {success && success.length > 0 && <SuccessAlert message={success} onClose={() => setSuccess('')} />}
            {error && error.length > 0 && <ErrorAlert message={error} onClose={() => setError('')} />}
        </HomeLayout>
    )
}


export default withAuth(Expense)