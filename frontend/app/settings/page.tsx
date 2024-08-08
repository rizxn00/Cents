'use client';

import React, { useEffect, useState, useCallback, ChangeEvent } from 'react'
import HomeLayout from '../home'
import Label from '@/components/ui/Label'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input';
import { Button, LoadingButton } from '@/components/ui/Button';
import { Theme } from '@/components/ThemeSelector';
import { ErrorAlert, SuccessAlert } from '@/components/ui/Alerts';
import { Loader } from '@/components/ui/Loader';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth';
import { currencies } from '@/data/currency_data'

function Settings() {


    const [file, setFile] = useState<File | null>(null);
    const [currency, setCurrency] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [isImporting, setIsImporting] = useState<boolean>(false);
    const [isExporting, setIsExporting] = useState<boolean>(false)

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

    const updateCurrency = async () => {
        setIsSubmitting(true)

        const updateData = {
            id: localStorage.getItem('id'),
            currency: currency
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/updatecurrency`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updateData)
            })

            console.log(JSON.stringify(updateCurrency))
            console.log(response)
            const data = await response.json()
            console.log(data)

            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data?.error || "An error occurred during updating")
                return
            }

            setSuccess('Currency successfull updated')
            localStorage.setItem("currency", data[0].currency)


        } catch (error: any) {
            console.error("Error during updating currency:", error);
            setError("An error occurred during updating currency")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleImport = async () => {
        if (!file) {
            setError('Please select a file to import');
            return;
        }

        setIsImporting(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', localStorage.getItem('id') || '');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shared/importdata`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            });

            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                const errorData: { error: string } = await response.json();
                throw new Error(errorData.error || 'An error occurred during import');
            }

            const result: { importedCount: number } = await response.json();
            setSuccess(`Successfully imported ${result.importedCount} records`);
        } catch (error) {
            console.error('Import error:', error);
            setError(error instanceof Error ? error.message : 'An error occurred during import');
        } finally {
            setIsImporting(false);
        }
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shared/exportdata/${localStorage.getItem('id')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred during export.');
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `financial_data_${localStorage.getItem('id')}.csv`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

            setSuccess('Data exported successfully');
        } catch (error) {
            console.error('Export error:', error);
            setError(error instanceof Error ? error.message : 'An error occurred during export.');
        } finally {
            setIsExporting(false);
        }
    };

    const getCurrency = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/getcurrency/${localStorage.getItem("id")}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            const data = await response.json()

            if (!response.ok) {
                if (response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                setError(data?.error || "An error occurred during getting currency")
                return
            }


            if (data[0]?.currency) {
                setCurrency(data[0].currency);
            } else {
                console.error("No currency data found");
            }

        } catch (error: any) {
            console.error("Error during getting currency:", error);
            setError("An error occurred during getting currency")
        } finally {
            setIsLoading(false)
        }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])

    useEffect(() => {
        getCurrency();
    }, [getCurrency])

    return (
        <HomeLayout>
            {isLoading ? <Loader /> :
                <>
                    <div>
                        <Label className='text-2xl font-bold'>Settings</Label>
                    </div>
                    <div className='mt-10 flex flex-col gap-10'>
                        <div className='space-y-2'>
                            <Label>Preferred Currency</Label>
                            <Select options={currencies} value={currency} onChange={(value) => setCurrency(value)} placeholder='Choose a currency' />
                            {!isSubmitting ?
                                <Button type='button' onClick={updateCurrency} className='w-fit'>Update</Button> :
                                <LoadingButton type='button' className='w-fit'>updating</LoadingButton>}
                        </div>
                        <div className='space-y-2'>
                            <Label>Import Data</Label>
                            <Input type='file' accept=".csv" onChange={handleFileChange} />
                            <div className='flex flex-col'>
                            <Label className='text-xs font-light'>* the file should contain type, amount, date and description as the coloum names</Label>
                            <Label className='text-xs font-light'>* accepts only .csv files</Label>
                            </div>
                            { !isImporting ?
                            <Button type='button' className='flex items-center gap-1' onClick={handleImport}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                                <path d="M12 4.5L12 14.5M12 4.5C11.2998 4.5 9.99153 6.4943 9.5 7M12 4.5C12.7002 4.5 14.0085 6.4943 14.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg><label>Upload</label></Button>
                            :
                            <LoadingButton type='button'>importing...</LoadingButton>}
                        </div>
                        <div className='space-y-2'>
                            <Label>Export Data</Label> {
                                !isExporting ?
                                    <Button type='button' className='flex items-center gap-1' onClick={handleExport}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                                        <path d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>Export</Button>
                                    :
                                    <LoadingButton type='button'>exporting...</LoadingButton>}
                        </div>
                        <div className='space-y-2'>
                            <Label>Theme</Label>
                            <Theme />
                        </div>
                    </div>
                </>
            }

            {success && success.length > 0 && <SuccessAlert message={success} onClose={() => setSuccess('')} />}
            {error && error.length > 0 && <ErrorAlert message={error} onClose={() => setError('')} />}
        </HomeLayout>
    )
}


export default withAuth(Settings)