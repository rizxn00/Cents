import React, { ReactNode } from 'react'

type cardPropType = {
    children: ReactNode
    className?: string
}

export default function Card({ children, className }: cardPropType) {
    return (
        <div className={`bg-gray-50 w-full ${className} rounded-lg shadow-sm p-3`}>
            {children}
        </div>
    )
}
