'use client';

import React from 'react'
import HomeLayout from '../home'
import Label from '@/components/ui/Label'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Settings() {

    const currencies = [
        { label: 'AUD A$', value: 'A$' },
        { label: 'BRL R$', value: 'R$' },
        { label: 'CAD C$', value: 'C$' },
        { label: 'CHF CHF', value: 'CHF' },
        { label: 'CNY ¥', value: '¥' },
        { label: 'EUR €', value: '€' },
        { label: 'GBP £', value: '£' },
        { label: 'HKD HK$', value: 'HK$' },
        { label: 'INR ₹', value: '₹' },
        { label: 'JPY ¥', value: '¥' },
        { label: 'KRW ₩', value: '₩' },
        { label: 'MXN $', value: '$' },
        { label: 'NZD NZ$', value: 'NZ$' },
        { label: 'RUB ₽', value: '₽' },
        { label: 'SAR ر.س', value: 'ر.س' },
        { label: 'SEK kr', value: 'kr' },
        { label: 'SGD S$', value: 'S$' },
        { label: 'TRY ₺', value: '₺' },
        { label: 'USD $', value: '$' },
        { label: 'ZAR R', value: 'R' },
    ]

    return (
        <HomeLayout>
            <div>
                <Label className='text-2xl font-bold'>Settings</Label>
            </div>
            <div className='mt-10 flex flex-col gap-10'>
                <div>
                    <Label>Preferred Currency</Label>
                    <Select options={currencies.map((item) => (item.label))} placeholder='Choose a currency' />
                </div>
                <div className='space-y-2'>
                    <Label>Import Data</Label>
                    <Input type='file' className='' />
                    <Button type='button' className='flex items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                        <path d="M12 4.5L12 14.5M12 4.5C11.2998 4.5 9.99153 6.4943 9.5 7M12 4.5C12.7002 4.5 14.0085 6.4943 14.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg><label>Upload</label></Button>
                </div>
                <div className='space-y-2'>
                    <Label>Export Data</Label>
                    <Button type='button' className='flex items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                        <path d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Export</Button>
                </div>
                <div className='space-y-2'>
                    <Label>Theme</Label>
                    <div>
                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li>
                                <input type="radio" name="theme" id="light" value="light" className="hidden peer" />
                                <label htmlFor="light" className="inline-flex items-center justify-center w-full p-5 border-2 rounded-lg cursor-pointer h-24 bg-zinc-100 text-sm font-medium transition-all hover:bg-zinc-200 text-black">Light</label>
                            </li>
                            <li>
                                <input type="radio" name="theme" id="dark" value="dark" className="hidden peer" />
                                <label htmlFor="dark" className="inline-flex items-center justify-center w-full p-5 border-2 rounded-lg cursor-pointer h-24 bg-zinc-950 text-sm font-medium transition-all hover:bg-zinc-900 text-white">Dark</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </HomeLayout>
    )
}
