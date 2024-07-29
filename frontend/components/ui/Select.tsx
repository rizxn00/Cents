import React, { useState, useEffect, useRef } from 'react'
import ClickOutside from '../ClickOutside';

type selectPropType = {
    options: string[]
    value?:string
    placeholder?: string
    defaultValue?:string
    onChange?: (value: string) => void 
}

export default function Select({ options, value, placeholder, defaultValue,onChange}: selectPropType) {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const filtered = options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [searchTerm, options]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setShowOptions(false);
        setSearchTerm('');
        if(onChange) onChange(option);
    };

    const handleButtonClick = () => {
        setShowOptions(!showOptions);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <ClickOutside onClick={() => setShowOptions(false)}>
            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={handleButtonClick}
                    value={value}
                    defaultValue={defaultValue}
                    className="relative w-full outline-none cursor-default rounded-md py-3.5 pl-3 text-left text-sm font-light bg-gray-200 dark:bg-zinc-900 focus:border-orange-700 dark:focus:border-orange-700 focus:border"
                >
                    <span className="block truncate text-black dark:text-white">
                        {selectedOption || placeholder || defaultValue || value}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button>
                {showOptions && (
                    <div className="absolute z-10 mt-1 w-full bg-zinc-100 dark:bg-zinc-950 dark:border rounded-md shadow-lg">
                        <div className='p-2'>
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="w-full rounded-md bg-gray-200 dark:bg-zinc-900 py-3 pl-3 pr-2 text-black dark:text-white outline-none text-sm "
                            placeholder="Search..."
                        />
                        </div>
                        <ul className="max-h-48 overflow-auto py-1 text-base focus:outline-none sm:text-sm">
                            {filteredOptions.map((option: string) => (
                                <li
                                    className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-black"
                                    key={option}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <div className="flex items-center">
                                        <span className="block truncate font-light text-sm">{option}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </ClickOutside>
    )
}