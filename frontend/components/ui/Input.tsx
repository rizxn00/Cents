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
        <input id={id} name={name} type={type} value={value} defaultValue={defaultValue} className={`w-full rounded-lg text-sm font-light bg-gray-200 dark:bg-zinc-900 py-3 pl-3 pr-2 text-black dark:text-white outline-none focus:border-orange-700 dark:focus:border-orange-700 focus:border ${className}`} />
    )
}
