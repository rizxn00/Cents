import React, { ReactNode } from 'react';

type buttonType = {
    children: ReactNode;
    className?: string;
    type: any;
    onClick?: any;
};

export function Button({ children, className, type, onClick }: buttonType) {

    return (
        <button
            id="button"
            type={type}
            onClick={onClick}
            className={`bg-orange-700 hover:bg-orange-600 transition-all text-white p-2 rounded ${className}`}
        >
            {children}
        </button>
    );
}

export function CancelButton({ children, className, type, onClick }: buttonType) {

    return (
        <button
            id="button"
            type={type}
            onClick={onClick}
            className={`bg-gray-300 hover:bg-gray-400 transition-all text-black p-2 rounded ${className}`}
        >
            {children}
        </button>
    );
}
