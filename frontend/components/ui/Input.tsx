import React from 'react'

type inputTypes = {
    id?: string, 
    type?: any,
    className?: string,
    name?:string,
    value?:string,
    defaultValue?:string
}

export default function Input({ id, type, className, value, defaultValue, name }: inputTypes) {
    return (
        <input id={id} name={name} type={type} value={value} defaultValue={defaultValue} className={`w-full rounded-lg border text-sm font-light bg-gray-100 dark:bg-zinc-900 py-3 pl-3 pr-2 focus:ring-1 focus:ring-orange-400 focus:ring-inset text-black dark:text-white outline-none ${className}`} />
    )
}
