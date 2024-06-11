import React from 'react'

type inputTypes = {
    type?: string,
    className?: string,
}

export default function Input({ type, className }: inputTypes) {
    return (
        <input type={type} className={`w-full px-2 py-1.5 text-sm border border-zinc-100 rounded-lg outline-none ${className}`} />
    )
}
