'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import HomeLayout from '../home';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Label from '@/components/ui/Label';
import { ErrorAlert, SuccessAlert } from '@/components/ui/Alerts';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { incomes } from '@/data/income_data'
import withAuth from '@/components/withAuth';


interface Income {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: string;
}

function Incomeview() {
  const searchParams = useSearchParams();
  const [income, setIncome] = useState<Income | null>(null);
  const [deletes, setDeletes] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [edit, setEdit] = useState<boolean>(false)
  const [editData, setEditData] = useState<Income>({
    id: '',
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  const router = useRouter()

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      const parsedData: Income = JSON.parse(decodeURIComponent(data));
      setIncome(parsedData);
    }
  }, [searchParams]);

  if (!income) {
    return <HomeLayout ><Loader /></HomeLayout>;
  }

  const { id, date, category, description, amount } = income; 

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
    setEditData((prev: Income) => ({ ...prev, [name]: value }));
  };

  const confirmEditIncome = () => {
    setEdit(true)
    setEditData( ({
      id:id,
      amount: amount,
      category: category,
      description: description,
      date: new Date(date).toISOString().split('T')[0],
    }));
  }

  const editIncome = async (event: any) => {
    event.preventDefault()
    setIsSubmitting(true)

    const editedData = {
      ...editData,
      amount: Number(editData.amount),
      date: new Date(editData.date).toISOString().split('T')[0] 
    };
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
        if (response.statusText === 'Unauthorized') {
          setError('Unauthorized')
          performLogout()
          return
        }
        setError(data.error || "An error occurred during updating income")
        return
      }
      setSuccess(data?.message)
      router.back()
      window.location.reload
    } catch (error: any) {
      console.error("Error during updating income:", error);
      setError("An error occurred during updating income")
    } finally {
      setEdit(false)
      setIsSubmitting(false)
    }
  }

  const deleteIncome = async (event: any) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.statusText === 'Unauthorized') {
          setError('Unauthorized')
          performLogout()
          return
        }
        setError(data.error || "An error occurred during deleting income")
        return
      }
      setSuccess(data?.message)
      router.back()

    } catch (error: any) {
      console.error("Error during deleting income:", error);
      setError("An error occurred during deleting income")
    } finally {
      setIsSubmitting(false)
      setDeletes(false)
    }
  }

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
      <div className='space-y-3'>
        <div className='flex justify-end'>
          <div className='flex gap-3'>
            <Button type='button' onClick={confirmEditIncome}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                  <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </Button>

            <Button type='button' onClick={() => setDeletes(true)}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                  <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </Button>
          </div>
        </div>

        <div className='flex flex-col space-y-5'>
          <Label className='flex flex-col gap-2'>Amount <span className='font-extralight'>{amount}</span></Label>
          <Label className='flex flex-col gap-2'>Category <span className='font-extralight'>{category}</span></Label>
          <Label className='flex flex-col gap-2'>Date <span className='font-extralight'>{formatDate(date)}</span></Label>
          {description &&
            <Label className='flex flex-col gap-2'>Description <span className='font-extralight'>{description}</span></Label>
          }
        </div>
      </div>

      {/* Edit Income Modal */}
      <Modal Title="Edit Income" isOpen={edit} onClose={() => { setEdit(false), setIsSubmitting(false) }} buttonText="Update" onSubmit={editIncome} isLoading={isSubmitting} loadingText='updating'>
        <div className="flex flex-col gap-1">
          <Label>Income</Label>
          <Input type="number" name="amount" defaultValue={amount} onChange={handleEditChange} className='[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Category</Label>
          <Select options={incomes} value={category} onChange={(value) => handleEditChange({ target: { name: 'category', value } })} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="description">Description</Label>
          <Input type="text" name="description" defaultValue={description} onChange={handleEditChange} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Date</Label>
          <Input type="date" name="date" defaultValue={date} onChange={handleEditChange} />
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deletes} Title='Delete Income' onClose={() => setDeletes(false)} buttonText='Delete' onSubmit={deleteIncome} isLoading={isSubmitting} loadingText='deleting'>
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

export default withAuth(Incomeview)