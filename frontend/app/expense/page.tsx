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


interface EditData {
    id: string;
    amount: string;
    category: string;
    description: string;
    date: string;
}

function Expense() {

    const [currency, setCurrency] = useState<string>('$');
    const [allExpenses, setAllExpenses] = useState<any>([])

    const [addExpense, setAddExpense] = useState<boolean>(false)
    const [today, setToday] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)
    const [editData, setEditData] = useState<EditData>({
        id: '',
        amount: '',
        category: '',
        description: '',
        date: ''
    });
    const [deletes, setDeletes] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>('')

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

    const confirmEditExpense = (data: any) => {
        setEdit(true)
        setEditData({
            id: data.id,
            amount: data.amount,
            category: data.category,
            description: data.description,
            date: new Date(data.date).toISOString().split('T')[0] 
        });
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setEditData((prev: EditData) => ({ ...prev, [name]: value }));
    };

    const editExpense = async (event: any) => {
        event.preventDefault()
        setIsSubmitting(true)

        const editedData = {
            ...editData,
            amount: Number(editData.amount),
            date: new Date(editData.date).toISOString()
        };
        console.log("send data", editedData);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/update`, {
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

            setAllExpenses((prevExpenses:any) => 
                prevExpenses.map((e:EditData) => 
                    e.id === editedData.id ? { ...e, ...editedData } : e
                )
            );

            const expenseToUpdate = allExpenses.find((e: EditData) => e.id === editedData.id);
            if (expenseToUpdate) {
                const amountDifference = editedData.amount - expenseToUpdate.amount;
                setSum((prevSum: number) => prevSum + amountDifference);
            }

            setSuccess(data?.message)
            setEdit(false)
        } catch (error: any) {
            console.error("Error during updating expense:", error);
            setError("An error occurred during updating expense")
        } finally {
            setIsSubmitting(false)
        }
    }

    const confirmDeleteExpense = (id: string) => {
        setDeletes(true)
        setDeleteId(id)
    }

    const deleteExpense = async (event: any) => {
        event.preventDefault()
        setIsSubmitting(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/delete/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();

            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data.error || "An error occurred during deleting expense")
                return
            }
            setSuccess(data?.message)
            setAllExpenses(allExpenses.filter((e: any) => e.id !== data?.deletedExpense?.id))
            setSum((prevSum: number) => prevSum - data?.deletedExpense?.amount);
            setDeletes(false)

        } catch (error: any) {
            console.error("Error during deleting expense:", error);
            setError("An error occurred during deleting expense")
        } finally {
            setIsSubmitting(false)
        }
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
            console.log(response)

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
                            <Card className='mt-5 flex flex-col gap-1' key={index}>
                                <div className='flex justify-between'>
                                    <div className='flex gap-3 items-center'>
                                        <Label className='font-medium text-lg'>{e.category}</Label>
                                        <Label className='rounded-full bg-orange-700 text-white px-2 py-[1px] text-[12px] h-fit flex items-center'>{formatDate(e.date)}</Label>
                                    </div>
                                    <div className='flex gap-3'>
                                        <button onClick={() => confirmEditExpense(e)}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                    <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                        </button>

                                        <button onClick={() => confirmDeleteExpense(e.id)}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='text-lg'>{currency}{e.amount}</div>
                                <Label className='text-xs font-light'>{e.description}</Label>
                            </Card>
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

            {/* Edit Expense Modal */}
            <Modal Title="Edit Expense" isOpen={edit} onClose={() => { setEdit(false), setIsSubmitting(false) }} buttonText="Update" onSubmit={editExpense} isLoading={isSubmitting} loadingText='updating'>
                <div className="flex flex-col gap-1">
                    <Label>Expense</Label>
                    <Input type="number" name="amount" value={editData.amount} onChange={handleEditChange} className='[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Category</Label>
                    <Select options={expenses} value={editData.category} onChange={(value) => handleEditChange({ target: { name: 'category', value } })}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" name="description" value={editData.description} onChange={handleEditChange}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Date</Label>
                    <Input type="date" name="date" value={editData.date} onChange={handleEditChange}/>
                </div>
            </Modal>

            {/* Delete Expense Modal */}
            <Modal isOpen={deletes} Title='Delete Expense' onClose={() => setDeletes(false)} buttonText='Delete' onSubmit={deleteExpense} isLoading={isSubmitting} loadingText='deleting'>
                <div className='flex gap-3 items-center'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38" className='text-black dark:text-white' fill="none">
                            <path d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M11.992 16H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 13L12 8.99997" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <Label>Are you sure you wanna delete ? </Label>
                </div>
            </Modal>

            {success && success.length > 0 && <SuccessAlert message={success} onClose={() => setSuccess('')} />}
            {error && error.length > 0 && <ErrorAlert message={error} onClose={() => setError('')} />}
        </HomeLayout>
    )
}


export default withAuth(Expense)