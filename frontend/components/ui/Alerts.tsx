import React, { useEffect, useState } from "react"

interface AlertProps {
    message: string
    onClose: () => void
    className?: string
    autoCloseDelay?: number
}

const Alert: React.FC<AlertProps & { type: 'success' | 'error' }> = ({ message, onClose, className, autoCloseDelay = 5000, type }) => {
    const [isClosing, setIsClosing] = useState<boolean>(false);

    useEffect(() => {
        const autoCloseTimer = setTimeout(() => {
            setIsClosing(true);
        }, autoCloseDelay);

        if (isClosing) {
            const closeTimer = setTimeout(() => {
                onClose();
            }, 200);

            return () => {
                clearTimeout(closeTimer);
                clearTimeout(autoCloseTimer);
            };
        }

        return () => clearTimeout(autoCloseTimer);
    }, [isClosing, onClose, autoCloseDelay]);

    const handleClose = () => {
        setIsClosing(true);
    };

    const alertStyles = type === 'success'
        ? 'text-green-800 border-green-300 bg-green-50 dark:bg-green-950 dark:text-green-400 dark:border-green-800'
        : 'text-red-800 border-red-300 bg-red-50 dark:bg-red-950 dark:text-red-400 dark:border-red-800';

    return (
        <div className={`${isClosing ? 'animate-slideDown' : 'animate-slideUp'} absolute bottom-5 right-5 whitespace-nowrap flex justify-between items-center p-4 text-sm border rounded-lg z-50 ${alertStyles} ${className}`} role="alert">
            <div className="flex items-center space-x-2">
                {type === 'success' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                        <path d="M7.32612 18.092C6.99877 18.3667 6.71531 18.5029 6.42014 18.5C5.73998 18.4931 5.17341 17.7974 4.04028 16.4061L2.52531 14.5458C1.90142 13.7798 1.82509 12.6392 2.34013 11.7785C2.92845 10.7954 4.05674 10.52 4.93607 11.0133M10.9222 8.5C11.7133 7.66585 12.5575 6.8322 13.4783 5.98679C13.9225 5.57893 14.4762 5.43447 15 5.52681" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14.1057 16.311C16.3656 13.6916 18.5472 11.9146 21.2876 9.39818C22.1078 8.64496 22.2345 7.3247 21.591 6.3893C20.9072 5.39517 19.6077 5.19647 18.7282 5.98679C16.218 8.24236 14.2651 10.4141 12.4126 12.7354C12.3154 12.8572 12.2668 12.9181 12.2163 12.9524C12.0884 13.0393 11.9285 13.0403 11.7998 12.9548C11.749 12.9211 11.7003 12.8613 11.6029 12.7419L10.6158 11.5311C9.71508 10.4263 8.09956 10.5486 7.34754 11.7785C6.82128 12.6392 6.89927 13.7798 7.53675 14.5458L9.0847 16.4061C10.2425 17.7974 10.8214 18.4931 11.5164 18.5C12.2114 18.5068 12.8428 17.7748 14.1057 16.311Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                        <path d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M11.992 16H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 13L12 8.99997" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>)}
                <span className="sr-only">{type === 'success' ? 'Success' : 'Danger'}</span>
                <div>
                    {message}
                </div>
            </div>
            <div>
                <button type="button" onClick={handleClose} className="ms-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#toast-danger" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export const SuccessAlert: React.FC<AlertProps> = (props) => <Alert {...props} type="success" />;
export const ErrorAlert: React.FC<AlertProps> = (props) => <Alert {...props} type="error" />;
