'use client'

import React, { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Label from '@/components/ui/Label'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import BarChart from '@/components/charts/BarChart'
import DonutChart from '@/components/charts/DonutChart'
import LineChart from '@/components/charts/LineChart'
import ClickOutside from '@/components/ClickOutside'
import MainLayout from '../MainLayout'

export default function Dashboard() {




    const monthlyExpenseData = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ],
        values: [
            500, 400, 450, 600, 700, 800, 750, 650, 900, 1000, 1100, 950,
        ],
    };


    function greetings() {
        const greeting = document.getElementById("greeting");
        const hour = new Date().getHours();
        const date = new Date().getDate
        console.log(date)
        const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
        let welcomeText = "";

        if (hour < 12) welcomeText = welcomeTypes[0];
        else if (hour < 18) welcomeText = welcomeTypes[1];
        else welcomeText = welcomeTypes[2];
        greeting!.innerHTML = welcomeText;


        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
    }


    useEffect(() => {
        greetings()
    }, [])


    return (
        <MainLayout>
            <div className='flex flex-col gap-10'>
                <div>
                    <Label className='text-2xl font-bold'><span id='greeting'></span>, User</Label>
                </div>

                <Label className='text-5xl font-semibold'>$ 50000</Label>
                <div className='flex flex-col gap-5'>
                    <Label className='text-2xl font-semibold'>Summary</Label>
                    <Card>
                        <BarChart data={monthlyExpenseData} />
                    </Card>
                    <Card>
                        <DonutChart />
                    </Card>
                    <Card>
                        <LineChart data={monthlyExpenseData} />
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}
