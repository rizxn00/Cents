import React from 'react'

type labelType = {
    children: string
    className?: string
}

export default function Label({ children, className }: labelType) {
    return (
        <p className={`${className}`}>
            {children}
        </p>
    )
}
