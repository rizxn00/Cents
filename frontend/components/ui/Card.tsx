import React, { ReactNode } from 'react'

type cardPropType = {
    children: ReactNode
    className?: string
    onClick?:  () => void
}

export default function Card({ children, className, onClick }: cardPropType) {
    return (
        <div onClick={onClick} className={` ${className} rounded-xl hover:shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] bg-zinc-100 dark:bg-neutral-900 px-5 py-5 dark:hover:shadow-zinc-800 dark:shadow-zinc-800 transition-all `}>
            {children}
        </div>
    )
}

