import React, { ReactNode, useEffect, useRef } from 'react'
import Label from './Label'
import Button from './Button'

type modalPropType = {
    Title: string
    children: ReactNode
    buttonText: string
    onClose: () => void
    isOpen: boolean
}

export default function Modal({ children, Title, onClose, isOpen, buttonText }: modalPropType) {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to check if the clicked target is inside the modal
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', () => handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', () => handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity z-10" aria-hidden="true">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"></div>
                <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div ref={modalRef} className={`relative p-4 w-full max-w-2xl max-h-full`}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <Label className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {Title}
                                </Label>
                                <Button type='button' onClick={onClose} className="w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
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
                                <button type="button" className='px-4 bg-gray-300 p-2 rounded-lg text-black' onClick={onClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
