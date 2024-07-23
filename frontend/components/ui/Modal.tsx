import React, { ReactNode } from 'react'
import Label from './Label'
import { Button, CancelButton } from './Button'
import ClickOutside from '../ClickOutside'

type modalPropType = {
    Title: string
    children: ReactNode
    buttonText: string
    onClose: () => void
    isOpen: boolean
}

export default function Modal({ children, Title, onClose, isOpen, buttonText }: modalPropType) {

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-400 dark:bg-gray-600 bg-opacity-50 dark:bg-opacity-50 transition-opacity z-10" aria-hidden="true">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"></div>
                <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className={`relative p-4 w-full max-w-2xl max-h-full animate-slideUp` }>
                        <ClickOutside onClick={onClose}>
                            <div className="relative bg-white rounded-lg shadow dark:bg-zinc-950">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <Label className="text-xl font-semibold text-black dark:text-white">
                                        {Title}
                                    </Label>
                                    <Button type='button' onClick={onClose} className="w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </Button>
                                </div>
                                <div className="p-4 md:p-5 space-y-4">
                                    {children}
                                </div>
                                <div className="flex justify-end gap-2 p-4 md:p-5 ">
                                    <Button type="submit" className='px-4'>{buttonText}</Button>
                                    <CancelButton type='button' onClick={onClose} className='px-4'>Cancel</CancelButton>
                                </div>
                            </div>
                        </ClickOutside>
                    </div>
                </div>
            </div>
        </div>
    )
}
