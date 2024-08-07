import React, { ReactNode } from 'react';

type buttonType = {
    children?: ReactNode;
    className?: string;
    type: any;
    onClick?: any;
};

export function Button({ children, className, type, onClick }: buttonType) {

    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-orange-800 hover:bg-orange-700 transition-all text-white p-2 rounded ${className}}`}
        >
            {children}
        </button>
    );
}

export function CancelButton({ children, className, type, onClick }: buttonType) {

    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-gray-300 hover:bg-gray-400 transition-all text-black p-2 rounded ${className}`}
        >
            {children}
        </button>
    );
}

export function LoadingButton({ children, className, type, onClick }: buttonType) {

    return (
        <button
            disabled
            type={type}
            onClick={onClick}
            className={`bg-orange-900 transition-all text-white p-2 rounded ${className} flex justify-evenly items-center cursor-not-allowed`}
        >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100" enableBackground="new 0 0 0 0" className='w-8 h-5'>
                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="1s"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite" />
                </path>
            </svg>
            {children}
        </button>
    );
}
