'use client'

import React, { useEffect, useState } from 'react'
import Label from '@/components/ui/Label'
import Card from '@/components/ui/Card'
import BarChart from '@/components/charts/BarChart'
import DonutChart from '@/components/charts/DonutChart'
import LineChart from '@/components/charts/LineChart'
import HomeLayout from '../home'


export default function Dashboard() {

    const monthlyExpenseData = {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
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
        <HomeLayout>
            <div className='flex flex-col gap-10'>
                <div>
                    <Label className='text-2xl font-bold'><span id='greeting'></span>, John Doe</Label>
                </div>
                <div>
                <Label className='text-xl font-bold'>Overview</Label>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-2'>
                    <Card className='flex flex-col items-center gap-3'>
                        <p className='font-medium text-xl text-green-600'>$5000</p>
                        <div className='flex gap-2'>
                            <div className='flex items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <Label>Income</Label>
                        </div>
                    </Card>

                    <Card className='flex flex-col items-center gap-3'>
                        <p className='font-medium text-xl text-red-600'>$2890</p>
                        <div className='flex gap-2'>
                            <div className='flex items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                    <path d="M20.016 2C18.9026 2 18 4.68629 18 8H20.016C20.9876 8 21.4734 8 21.7741 7.66455C22.0749 7.32909 22.0225 6.88733 21.9178 6.00381C21.6414 3.67143 20.8943 2 20.016 2Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M18 8.05426V18.6458C18 20.1575 18 20.9133 17.538 21.2108C16.7831 21.6971 15.6161 20.6774 15.0291 20.3073C14.5441 20.0014 14.3017 19.8485 14.0325 19.8397C13.7417 19.8301 13.4949 19.9768 12.9709 20.3073L11.06 21.5124C10.5445 21.8374 10.2868 22 10 22C9.71321 22 9.45546 21.8374 8.94 21.5124L7.02913 20.3073C6.54415 20.0014 6.30166 19.8485 6.03253 19.8397C5.74172 19.8301 5.49493 19.9768 4.97087 20.3073C4.38395 20.6774 3.21687 21.6971 2.46195 21.2108C2 20.9133 2 20.1575 2 18.6458V8.05426C2 5.20025 2 3.77325 2.87868 2.88663C3.75736 2 5.17157 2 8 2H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.5 10.875C11.6716 10.875 11 11.4626 11 12.1875C11 12.9124 11.6716 13.5 12.5 13.5C13.3284 13.5 14 14.0876 14 14.8125C14 15.5374 13.3284 16.125 12.5 16.125M12.5 10.875C13.1531 10.875 13.7087 11.2402 13.9146 11.75M12.5 10.875V10M12.5 16.125C11.8469 16.125 11.2913 15.7598 11.0854 15.25M12.5 16.125V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <Label>Expense</Label>
                        </div>
                    </Card>

                    <Card className='flex flex-col items-center gap-3'>
                        <p className='font-medium text-xl text-blue-600'>$1890</p>
                        <div className='flex gap-2'>
                            <Label className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                    <path d="M15 15C15 15.8284 15.6716 16.5 16.5 16.5C17.3284 16.5 18 15.8284 18 15C18 14.1716 17.3284 13.5 16.5 13.5C15.6716 13.5 15 14.1716 15 15Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M15.0038 7.80257C9.57619 7.42647 5.1047 6.62109 3 5.99976V15.0612C3 17.0556 3 18.0528 3.61958 18.8661C4.23916 19.6794 5.08923 19.9091 6.78937 20.3685C9.53623 21.1107 12.4235 21.5527 15.0106 21.8055C17.6919 22.0675 19.0325 22.1985 20.0163 21.2995C21 20.4005 21 18.9564 21 16.068V14.0544C21 11.2495 21 9.84706 20.1929 8.97664C19.3859 8.10622 17.9252 8.005 15.0038 7.80257Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.6258 8C18.0035 6.57673 18.3453 3.98822 17.327 2.70292C16.6816 1.88827 15.7223 1.96654 14.7818 2.04926C9.83791 2.48406 6.34544 3.36731 4.39301 3.96737C3.55348 4.2254 3 5.04522 3 5.96044" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            </Label>
                            <Label>Balance</Label>
                        </div>
                    </Card>

                    <Card className='flex flex-col items-center gap-3'>
                        <p className='font-medium text-xl text-orange-600'>231</p>
                        <div className='flex gap-2'>
                            <div className='flex items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                    <path d="M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <Label>Transactions</Label>
                        </div>
                    </Card>
                </div>
                </div>
                <div>
                    <Label className='text-xl font-semibold'>Summary</Label>
                    <div className='grid grid-cols-1 md:grid col-span-2 lg:grid-cols-3 gap-5 w-full mt-2'>
                    <Card className='h-fit'>
                        <BarChart data={monthlyExpenseData}/>
                    </Card>
                    <Card className='h-fit'>
                        <DonutChart />
                    </Card>
                    <Card className='h-fit'>
                        <LineChart data={monthlyExpenseData} />
                    </Card>
                    </div>
                </div>
            </div>
            </HomeLayout>
    )
}
