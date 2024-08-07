'use client'

import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import HomeLayout from '../home';
import { SuccessAlert, ErrorAlert } from '@/components/ui/Alerts'
import { Loader } from '@/components/ui/Loader';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth';


interface EditData {
    id: string;
    amount: string;
    category: string;
    description: string;
    date: string;
}

function Income() {

    const [currency, setCurrency] = useState<string>('$');
    const [allIncomes, setAllIncomes] = useState<any>([])

    const [addIncome, setAddIncome] = useState<boolean>(false)
    const [today, setToday] = useState<string>('');
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

    const income = [
        {label:"Ad revenue", value:"Ad revenue"},
        {label:"Affiliate marketing", value:"Affiliate marketing"},
        {label:"Airbnb or vacation rentals", value:"Airbnb or vacation rentals"},
        {label:"Alimony", value:"Alimony"},
        {label:"Bonuses", value:"Bonuses"},
        {label:"Business profits", value:"Business profits"},
        {label:"Capital gains", value:"Capital gains"},
        {label:"Child support", value:"Child support"},
        {label:"Coaching or tutoring", value:"Coaching or tutoring"},
        {label:"Commissions", value:"Commissions"},
        {label:"Consulting fees", value:"Consulting fees"},
        {label:"Disability benefits", value:"Disability benefits"},
        {label:"Dividends", value:"Dividends"},
        {label:"E-book sales", value:"E-book sales"},
        {label:"Farm income", value:"Farm income"},
        {label:"Freelance earnings", value:"Freelance earnings"},
        {label:"Gambling winnings", value:"Gambling winnings"},
        {label:"Gifts", value:"Gifts"},
        {label:"Grants", value:"Grants"},
        {label:"Inheritance", value:"Inheritance"},
        {label:"Insurance payouts", value:"Insurance payouts"},
        {label:"Interest income", value:"Interest income"},
        {label:"Investment income", value:"Investment income"},
        {label:"Jury duty pay", value:"Jury duty pay"},
        {label:"Lottery winnings", value:"Lottery winnings"},
        {label:"Merchandise sales", value:"Merchandise sales"},
        {label:"Military benefits", value:"Military benefits"},
        {label:"Mineral rights", value:"Mineral rights"},
        {label:"Online course sales", value:"Online course sales"},
        {label:"Overtime pay", value:"Overtime pay"},
        {label:"Parking/garage rentals", value:"Parking/garage rentals"},
        {label:"Pension", value:"Pension"},
        {label:"Peer-to-peer lending", value:"Peer-to-peer lending"},
        {label:"Profit sharing", value:"Profit sharing"},
        {label:"Rebates and cashback", value:"Rebates and cashback"},
        {label:"Recycling", value:"Recycling"},
        {label:"Rental income", value:"Rental income"},
        {label:"Retirement account withdrawals", value:"Retirement account withdrawals"},
        {label:"Royalties", value:"Royalties"},
        {label:"Salary", value:"Salary"},
        {label:"Sale of assets", value:"Sale of assets"},
        {label:"Scholarships", value:"Scholarships"},
        {label:"Self-employment income", value:"Self-employment income"},
        {label:"Side gig income", value:"Side gig income"},
        {label:"Social Security benefits", value:"Social Security benefits"},
        {label:"Sponsorships", value:"Sponsorships"},
        {label:"Speaking engagements", value:"Speaking engagements"},
        {label:"Stock options", value:"Stock options"},
        {label:"Tax refunds", value:"Tax refunds"},
        {label:"Trust fund distributions", value:"Trust fund distributions"},
        {label:"Unemployment benefits", value:"Unemployment benefits"},
        {label:"Wages", value:"Wages"},
        {label:"Workshop fees", value:"Workshop fees"},
        {label:"Others", value:"Others"},
    ];

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
    
        const incomeData = {
            id: localStorage.getItem("id"),
            amount: amount,
            category: category,
            description: description,
            date: new Date(date).toISOString()
        }
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(incomeData),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data.error || "An error occurred during creating income")
                return
            }
            
            setSuccess(data?.message)
            setAllIncomes([...allIncomes, data?.data])
            setSum(sum + data?.data?.amount)
            setAddIncome(false)
            resetFormFields()
    
        } catch (error: any) {
            console.error("Error during creating income:", error);
            setError("An error occurred during creating income")
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

    const confirmEditIncome = (data: any) => {
        setEdit(true)
        setEditData({
            id: data.id,
            amount: data.amount.toString(),
            category: data.category,
            description: data.description,
            date: new Date(data.date).toISOString().split('T')[0] 
        });
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setEditData((prev: EditData) => ({ ...prev, [name]: value }));
    };

    const editIncome = async (event: any) => {
        event.preventDefault()
        setIsSubmitting(true)

        const editedData = {
            ...editData,
            amount: Number(editData.amount),
            date: new Date(editData.date).toISOString()
        };
        console.log("send data", editedData);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/update`, {
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
                setError(data.error || "An error occurred during updating income")
                return
            }

            setAllIncomes((prevIncomes:any) => 
                prevIncomes.map((e:EditData) => 
                    e.id === editedData.id ? { ...e, ...editedData } : e
                )
            );
            
            const IncomeToUpdate = allIncomes.find((e: EditData) => e.id === editedData.id);
            if (IncomeToUpdate) {
                const amountDifference = editedData.amount - IncomeToUpdate.amount;
                setSum((prevSum: number) => prevSum + amountDifference);
            }

            setSuccess(data?.messagee)
            setEdit(false)
        } catch (error: any) {
            console.error("Error during updating income:", error);
            setError("An error occurred during updating income")
        } finally {
            setIsSubmitting(false)
        }
    }

    const confirmDeleteIncome = (id: string) => {
        setDeletes(true)
        setDeleteId(id)
    }

    const deleteIncome = async(event: any) => {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/delete/${deleteId}`, {
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
                setError(data?.error || "An error occurred during deleting Income")
                return
            }
            
            setSuccess(data?.message)
            setAllIncomes(allIncomes.filter((e:any) => e.id !== data?.deletedIncome?.id))
            setSum((prevSum: number) => prevSum - data?.deletedIncome?.amount);
            setDeletes(false)
    
        } catch (error: any) {
            console.error("Error during deleting income:", error);
            setError("An error occurred during deleting income")
        } finally {
            setIsSubmitting(false)
        }
    }

    const getIncomes = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/get/${localStorage.getItem("id")}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();

            if (!response.ok) {
                if(data && data?.error === 'No expenses found for this user in the current month'){
                    return
                }
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data?.error || "An error occurred during getting incomes")
                return
            }
            setAllIncomes(data?.Incomes)
            setSum(data?.sum)
        } catch (error: any) {
            console.error("Error during getting incomes:", error);
            setError("An error occurred during fetching incomes")
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
        setToday(todayFormatted);
        setDate(todayFormatted);

        if (typeof window !== 'undefined') {
            const storedCurrency = localStorage.getItem('currency');
            if (storedCurrency) {
              setCurrency(storedCurrency);
            }
          }

        getIncomes()
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
                        <Label className='text-xl md:text-2xl transition-all font-bold'>Income Details</Label>
                    </div>
                    <Button type='button' onClick={() => {resetFormFields() ,setAddIncome(true)}} className='flex h-fit gap-2'>
                        <svg className='text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='hidden md:block'>Income</span>
                        </Button>
                </div>
                <p className='text-5xl font-semibold text-green-800'>{currency}{sum}</p>
                <div>
                    <Label className='text-xl font-medium'>Income</Label>
                    {isLoading ? <Loader/> : <div>
                    {allIncomes.map((e: any, index: number) => (
                        <Card className='mt-5 flex flex-col gap-1' key={index}>
                            <div className='flex justify-between'>
                                <div className='flex gap-3 items-center'>
                                    <Label className='font-medium text-lg'>{e.category}</Label>
                                    <Label className='rounded-full bg-orange-700 text-white px-2 py-[1px] text-[12px] h-fit flex items-center'>{formatDate(e.date)}</Label>
                                </div>
                                <div className='flex gap-3'>
                                <button onClick={() => confirmEditIncome(e)}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <button onClick={() => confirmDeleteIncome(e.id)}>
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
                            <div className='text-2xl'>{currency}{e.amount}</div>
                            <Label className='text-xs font-light'>{e.description}</Label>
                        </Card>
                    ))} 
                    </div>
                    }
                </div>
            </div>

            <Modal Title='Add Income' isOpen={addIncome} onClose={() => {resetFormFields(), setAddIncome(false), setIsSubmitting(false)}} buttonText='Submit' onSubmit={onSubmit} isLoading={isSubmitting} loadingText='submitting'>
                    <div className='flex flex-col gap-1'>
                        <Label>Income</Label>
                        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Catergory</Label>
                        <Select options={income} placeholder='Choose a category' value={category} onChange={(e) => setCategory(e)} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label htmlFor='description'>Description</Label>
                        <Input type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Date</Label>
                        <Input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
            </Modal>

            {/* Edit Income Modal */}
            <Modal Title="Edit Income" isOpen={edit} onClose={() => { setEdit(false), setIsSubmitting(false) }} buttonText="Update" onSubmit={editIncome} isLoading={isSubmitting} loadingText='updating' >
                    <div className="flex flex-col gap-1">
                        <Label>Income</Label>
                        <Input type="number" name="amount" value={editData.amount} onChange={handleEditChange} className='[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' defaultValue={editData?.amount} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Category</Label>
                        <Select options={income} value={editData.category} onChange={(value) => handleEditChange({ target: { name: 'category', value } })} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="description">Description</Label>
                        <Input type="text" name="description" value={editData.description} onChange={handleEditChange}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Date</Label>
                        <Input type="date" name="date" value={editData.date} onChange={handleEditChange} />
                    </div>
            </Modal>

            {/* Delete Income Modal */}
            <Modal isOpen={deletes} Title='Delete Income' onClose={() => setDeletes(false)} buttonText='Delete' onSubmit={deleteIncome} isLoading={isSubmitting} loadingText='deleting' >
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

export default withAuth(Income)