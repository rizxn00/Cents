import React from 'react'

type buttonType = {
    children:string
    className?:string
}

export default function Button({ children, className }:buttonType) {
    return (
        <button className={`w-full bg-orange-500 text-white p-2 rounded-lg ${className}`}>
            {children}
        </button>
    )
}
