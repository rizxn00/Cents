'use client'

import React, { useState, ReactNode } from 'react'
import Label from './Label'

interface NavItemProps {
    open: boolean;
    icon: ReactNode;
    children: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ open, icon, children }) => (
    <div className='flex gap-3 hover:bg-gray-200 rounded-md p-3 cursor-pointer'>
        {icon}
        {open && <Label>{children}</Label>}
    </div>
);


const Navigation: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div 
            className={`fixed h-screen bg-gray-50 ${open ? 'w-56' : 'w-16'} transition-all  flex flex-col justify-between`}
            onMouseEnter={() => setOpen(true)} 
            onMouseLeave={() => setOpen(false)}
        >
            <div className={`mt-5 m-2 flex-1`}>
                <ul className='flex flex-col gap-2'>
                    <NavItem open={open} icon={
                        <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z"/>
                        <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z"/>
                      </svg>
                      
                    }>
                        Dashboard
                    </NavItem>
                    <NavItem open={open} icon={
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5" />
                        </svg>
                    }>
                        Report
                    </NavItem>
                </ul>
            </div>
            <div className='m-2'>
                <ul className='flex flex-col gap-2'>
                    <NavItem open={open} icon={
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                        </svg>
                    }>
                        Logout
                    </NavItem>
                </ul>
            </div>
        </div>
    )
}

export default Navigation;
