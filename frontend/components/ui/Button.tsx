import React, { ReactNode } from 'react'

type buttonType = {
    children:ReactNode
    className?:string
    type:any
    onClick?:any
}

export default function Button({ children, className, type, onClick }:buttonType) {
    return (
        <button type={type} onClick={onClick} className={`bg-orange-700 hover:bg-orange-600 transition-all text-white p-2 rounded-lg ${className}`}>
            {children}
        </button>
    )
}
