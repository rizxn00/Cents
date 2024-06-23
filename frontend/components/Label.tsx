import React, { ReactNode } from 'react'

type labelType = {
    children: ReactNode
    className?: string
}

export default function Label({ children, className }: labelType) {
    return (
        <p className={`${className}`}>
            {children}
        </p>
    )
}
