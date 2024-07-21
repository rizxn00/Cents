'use client'

import React, { useState, ReactNode, memo } from 'react'
import Label from './ui/Label'
import Link from 'next/link';
import ClickOutside from './ClickOutside';

interface NavItemProps {
    open?: boolean
    icon: ReactNode
    children: ReactNode
    href?: string | object;
}

const NavItem = memo(({ open, icon, children, href = '' }: NavItemProps) => (
    <Link href={href}>
        <div className={`flex gap-3 hover:bg-gray-200 dark:hover:bg-black rounded-md p-3 cursor-pointer`}>
            {icon}
            <span className={open ? 'block' : 'hidden'}>{children}</span>
        </div>
    </Link>
));

NavItem.displayName = 'NavItem';

function disableDrawer() {
    const inputElement = document.getElementById('drawer-toggle') as HTMLInputElement
    if (inputElement) {
        inputElement.checked = false;
    }
}

const Navigation: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false)

    const pages = [
        {
            'href': 'dashboard',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M20.5 15.8278C17.9985 21.756 9.86407 23.4835 5.20143 18.8641C0.629484 14.3347 2.04493 6.12883 8.05653 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M17.6831 12.5C19.5708 12.5 20.5146 12.5 21.1241 11.655C21.1469 11.6234 21.1848 11.5667 21.2052 11.5336C21.7527 10.6471 21.4705 9.966 20.9063 8.60378C20.3946 7.36853 19.6447 6.24615 18.6993 5.30073C17.7538 4.35531 16.6315 3.60536 15.3962 3.0937C14.034 2.52946 13.3529 2.24733 12.4664 2.79477C12.4333 2.81523 12.3766 2.85309 12.345 2.87587C11.5 3.4854 11.5 4.42922 11.5 6.31686V8.42748C11.5 10.3473 11.5 11.3072 12.0964 11.9036C12.6928 12.5 13.6527 12.5 15.5725 12.5H17.6831Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </div>),
            'label': 'Dashboard',
        },
        {
            'href': 'expense',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 6L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.5 9.875C13.6716 9.875 13 10.4626 13 11.1875C13 11.9124 13.6716 12.5 14.5 12.5C15.3284 12.5 16 13.0876 16 13.8125C16 14.5374 15.3284 15.125 14.5 15.125M14.5 9.875C15.1531 9.875 15.7087 10.2402 15.9146 10.75M14.5 9.875V9M14.5 15.125C13.8469 15.125 13.2913 14.7598 13.0854 14.25M14.5 15.125V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>),
            'label': 'Expense',
        },
        {
            'href': 'income',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>),
            'label': 'Income',
        },
        {
            'href': 'profile',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </div>),
            'label': 'Profile',
        },
        {
            'href': 'settings',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z" stroke="currentColor" stroke-width="1.5" />
                </svg>
            </div>),
            'label': 'Settings',
        },
    ]

    return (
        <div>
            <aside
                className={`fixed h-screen bg-gray-50 dark:bg-zinc-950 w-16 hover:w-48 transition-all hidden flex-col z-10 md:flex`}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <div className={`mt-5 m-2 flex-1`}>
                    <ul className='flex flex-col gap-2'>
                        {pages.map((item: any) => (
                            <NavItem href={item.href} open={open} icon={item.image} key={item.label}>
                                <Label className='cursor-pointer select-none'>{item.label}</Label>
                            </NavItem>
                        ))}
                        <NavItem open={open} icon={
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                                    <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        }>
                            <Label className='cursor-pointer select-none'>Logout</Label>
                        </NavItem>

                    </ul>
                </div>

            </aside>
            <div className="flex md:hidden p-2 shadow-md bg-gray-50 dark:bg-zinc-950">
                <input type="checkbox" id="drawer-toggle" className="relative sr-only hidden peer" />
                <label htmlFor="drawer-toggle" className="ml-2" >
                    <svg className="w-8 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </label>


                <div className="fixed top-0 left-0 z-50 w-64 h-full transition-all duration-500 transform -translate-x-full bg-white dark:bg-zinc-950 shadow-lg peer-checked:translate-x-0">
                    <ClickOutside onClick={disableDrawer}>
                        <div className="px-2 py-4 flex flex-col justify-between">
                            <button onClick={disableDrawer} className='absolute top-4 right-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='text-black dark:text-white' viewBox="0 0 24 24" width="24" height="24" fill="none">
                                    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className={`mt-8 flex-1`}>
                                <ul className='flex flex-col gap-2'>
                                    {pages.map((item: any) => (
                                        <NavItem href={item.href} open={true} icon={item.image} key={item.label}>
                                            <Label className='cursor-pointer select-none'>{item.label}</Label>
                                        </NavItem>
                                    ))}
                                    <NavItem open={true} icon={
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                                                <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    }>
                                        <Label className='cursor-pointer select-none'>Logout</Label>
                                    </NavItem>
                                </ul>
                            </div>
                        </div>
                    </ClickOutside>
                </div>
            </div>
        </div>

    )
}

export default Navigation;
