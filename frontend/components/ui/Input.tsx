import React, { ChangeEvent } from 'react'

type inputTypes = {
    id?: string
    type?: any
    required?:boolean
    className?: string
    name?:string
    accept?: string
    value?:any
    defaultValue?:string
    onChange?: (e: any) => void
}

export default function Input({ id, type, accept,className, value, defaultValue, name, required= false, onChange }: inputTypes) {
    return (
        <input id={id} name={name} accept={accept} type={type} value={value} required={required} defaultValue={defaultValue} onChange={onChange} className={`w-full rounded-lg text-sm font-light bg-gray-200 dark:bg-zinc-900 py-3 pl-3 pr-2 text-black dark:text-white outline-none focus:border-orange-700 dark:focus:border-orange-700 focus:border ${className}`} />
    )
}
