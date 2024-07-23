'use client'

import React, { ReactNode, useEffect } from 'react';

type buttonType = {
    children: ReactNode;
    className?: string;
    type: any;
    onClick?: any;
};

export function Button({ children, className, type, onClick }: buttonType) {
    useEffect(() => {
        const button = document.getElementById('button');
        button?.addEventListener('click', () => {
            button.classList.add('animate-press');
            setTimeout(() => {
                button.classList.remove('animate-press');
            }, 1000);
        });

        // Cleanup event listener
        return () => {
            button?.removeEventListener('click', () => {
                button.classList.add('animate-press');
                setTimeout(() => {
                    button.classList.remove('animate-press');
                }, 1000);
            });
        };
    }, []);

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
    useEffect(() => {
        const button = document.getElementById('button');
        button?.addEventListener('click', () => {
            button.classList.add('animate-press');
            setTimeout(() => {
                button.classList.remove('animate-press');
            }, 1000);
        });

        // Cleanup event listener
        return () => {
            button?.removeEventListener('click', () => {
                button.classList.add('animate-press');
                setTimeout(() => {
                    button.classList.remove('animate-press');
                }, 1000);
            });
        };
    }, []);

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
