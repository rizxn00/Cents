import React, { ReactNode } from 'react'

type labelType = {
    htmlFor?:string,
    children: ReactNode
    className?: string,
}

export default function Label({ htmlFor, children, className }: labelType) {
    return (
        <label htmlFor={htmlFor} className={`${className} text-black dark:text-white h-full overflow-hidden`}>
            {children}
        </label>
    )
}
