'use client'

import React, { useState, ReactNode, memo, useEffect } from 'react'
import Label from './ui/Label'
import Link from 'next/link';
import ClickOutside from './ClickOutside';
import { usePathname, useRouter } from 'next/navigation';
import Tooltip from './ui/Tooltip';
import Modal from './ui/Modal';

interface NavItemProps {
    open?: boolean
    icon: ReactNode
    children: ReactNode
    href?: string | object;
    className?: ReactNode
    onClick?: () => void
}

const NavItem = memo(({ open, icon, children, href = '', className, onClick }: NavItemProps) => (
    <Link href={href}>
        {!open ? (
            <Tooltip text={children}>
                <div onClick={onClick} className={`flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-black z-50 rounded-md py-3 px-2 transition-all ${!open && 'justify-center'} cursor-pointer ${className}`}>
                    {icon}
                </div>
            </Tooltip>
        ) :
            <div onClick={onClick} className={`flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-black z-50 rounded-md py-3 px-2 transition-all ${!open && 'justify-center'} cursor-pointer ${className}`}>
                {icon}
                <span>{children}</span>
            </div>
        }
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

    const [open, setOpen] = useState(() => {
        // This function will only run once on initial render
        if (typeof window !== 'undefined') {
            const savedOpen = localStorage.getItem('navigationOpen');
            return savedOpen !== null ? JSON.parse(savedOpen) : false;
        }
        return false;
    });

    const [logout, setLogout] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const pathname = usePathname();

    useEffect(() => {
        // Load the navigation state from localStorage when the component mounts
        const savedOpen = localStorage.getItem('navigationOpen');
        if (savedOpen !== null) {
            setOpen(JSON.parse(savedOpen));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('navigationOpen', JSON.stringify(open));
    }, [open]);

    const router = useRouter()

    const handleLogout = (event: any) => {

        event.preventDefault()
        setIsSubmitting(true)

        setTimeout(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            localStorage.removeItem("navigationOpen")
            localStorage.removeItem("currency")
            router.push('/auth/signin')
            setIsSubmitting(false)
        }, 2000)
    }


    const pages = [
        {
            'href': 'dashboard',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='text-black dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8V6Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 19C2 18.0681 2 17.6022 2.15224 17.2346C2.35523 16.7446 2.74458 16.3552 3.23463 16.1522C3.60218 16 4.06812 16 5 16H7C7.93188 16 8.39782 16 8.76537 16.1522C9.25542 16.3552 9.64477 16.7446 9.84776 17.2346C10 17.6022 10 18.0681 10 19C10 19.9319 10 20.3978 9.84776 20.7654C9.64477 21.2554 9.25542 21.6448 8.76537 21.8478C8.39782 22 7.93188 22 7 22H5C4.06812 22 3.60218 22 3.23463 21.8478C2.74458 21.6448 2.35523 21.2554 2.15224 20.7654C2 20.3978 2 19.9319 2 19Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M14 16C14 14.1144 14 13.1716 14.5858 12.5858C15.1716 12 16.1144 12 18 12C19.8856 12 20.8284 12 21.4142 12.5858C22 13.1716 22 14.1144 22 16V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V16Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M14 5C14 4.06812 14 3.60218 14.1522 3.23463C14.3552 2.74458 14.7446 2.35523 15.2346 2.15224C15.6022 2 16.0681 2 17 2H19C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5C22 5.93188 22 6.39782 21.8478 6.76537C21.6448 7.25542 21.2554 7.64477 20.7654 7.84776C20.3978 8 19.9319 8 19 8H17C16.0681 8 15.6022 8 15.2346 7.84776C14.7446 7.64477 14.3552 7.25542 14.1522 6.76537C14 6.39782 14 5.93188 14 5Z" stroke="currentColor" strokeWidth="1.5" />
                </svg></div>),
            'label': 'Dashboard',
        },
        {
            'href': 'expenses',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='text-black dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 6L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.5 9.875C13.6716 9.875 13 10.4626 13 11.1875C13 11.9124 13.6716 12.5 14.5 12.5C15.3284 12.5 16 13.0876 16 13.8125C16 14.5374 15.3284 15.125 14.5 15.125M14.5 9.875C15.1531 9.875 15.7087 10.2402 15.9146 10.75M14.5 9.875V9M14.5 15.125C13.8469 15.125 13.2913 14.7598 13.0854 14.25M14.5 15.125V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>),
            'label': 'Expense',
        },
        {
            'href': 'incomes',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='text-black dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>),
            'label': 'Income',
        },
        {
            'href': 'profile',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='text-black dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>),
            'label': 'Profile',
        },
        {
            'href': 'settings',
            'image': (<div>
                <svg xmlns="http://www.w3.org/2000/svg" className='text-black dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </div>),
            'label': 'Settings',
        },
    ]



    return (
        <div>
            <aside
                className={`relative h-screen overflow-y-hidden bg-zinc-100 dark:bg-neutral-900 transition-all hidden flex-col  md:flex ${open ? 'w-48' : 'w-16'}`}>
                <div className={`mt-5 m-2 flex-1`}>
                    <ul className='flex flex-col gap-2 transition-all'>
                        <button className='flex justify-center' onClick={() => setOpen(!open)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className='text-black dark:text-white' fill="none">
                            <path d="M4 8.5L20 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 15.5L20 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></button>
                        {pages.map((item: any) => (
                            <NavItem href={item.href} open={open} icon={item.image} key={item.label} className={pathname.includes(item.href) && 'bg-gray-200 dark:bg-black'}>
                                <Label className='cursor-pointer select-none'>{item.label}</Label>
                            </NavItem>
                        ))}
                        <NavItem onClick={() => setLogout(true)} open={open} icon={
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className='text-black dark:text-white' viewBox="0 0 24 24" width="28" height="28" fill="none">
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

            <div className="md:hidden">
                <div className="fixed top-0 left-0 right-0 z-40 p-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-md">
                    <input type="checkbox" id="drawer-toggle" className="sr-only peer" />
                    <label htmlFor="drawer-toggle" className="cursor-pointer w-9 h-9 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white w-9 h-9" viewBox="0 0 24 24" fill="none">
                            <path d="M4 8.5L20 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 15.5L20 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </label>
                    <div className="fixed top-0 left-0 z-50 w-64 min-h-screen  transition-transform duration-500 -translate-x-full bg-zinc-100 dark:bg-neutral-900 shadow-lg peer-checked:translate-x-0">
                        <ClickOutside onClick={disableDrawer}>
                            <div className="px-2 py-4 flex flex-col justify-between h-full">
                                <button onClick={disableDrawer} className="absolute top-4 right-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white w-6 h-6" viewBox="0 0 24 24" fill="none">
                                        <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <div className="mt-10 flex-1">
                                    <ul className="flex flex-col gap-2 transition-all">
                                        {pages.map((item: any) => (
                                            <NavItem
                                                href={item.href}
                                                open={true}
                                                icon={item.image}
                                                key={item.label}
                                                className={pathname.includes(item.href) ? 'bg-gray-200 dark:bg-black' : ''}
                                            >
                                                <Label className="cursor-pointer select-none">{item.label}</Label>
                                            </NavItem>
                                        ))}
                                        <NavItem onClick={() => setLogout(true)} open={true} icon={
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white w-7 h-7" viewBox="0 0 24 24" fill="none">
                                                    <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        }>
                                            <Label className="cursor-pointer select-none">Logout</Label>
                                        </NavItem>
                                    </ul>
                                </div>
                            </div>
                        </ClickOutside>
                    </div>
                </div>
            </div>

            <Modal isOpen={logout} Title='Logout' onClose={() => setLogout(false)} buttonText='Logout' onSubmit={handleLogout} isLoading={isSubmitting} loadingText='logging out'>
                <div className='flex gap-3 items-center'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38" className='text-black dark:text-white' fill="none">
                            <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <Label>Are you sure you wanna logout ? </Label>
                </div>
            </Modal>
        </div>

    )
}

export default Navigation;
