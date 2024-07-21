import React, { useState, useEffect, useRef } from 'react'
import ClickOutside from '../ClickOutside';

type selectPropType = {
    options: string[]
    placeholder?: string
}

export default function Select({ options, placeholder }: selectPropType) {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
    const buttonRef = useRef<HTMLButtonElement>(null);

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
    };

    const handleButtonClick = () => {
        setShowOptions(!showOptions);
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Backspace') {
            setSearchTerm(prev => prev.slice(0, -1));
        } else if (event.key.length === 1) {
            setSearchTerm(prev => prev + event.key);
        }
    };

    return (
        <ClickOutside onClick={() => setShowOptions(false)}>
            <div className="relative mt-2">
                <button 
                    ref={buttonRef}
                    type="button" 
                    onClick={handleButtonClick}
                    onKeyDown={handleKeyDown}
                    className="relative w-full cursor-default rounded-md focus:ring-1 focus:ring-orange-400 focus:ring-inset py-3.5 pl-3 text-left text-sm font-light border bg-gray-100 dark:bg-zinc-900"
                >
                    <span className="block truncate">
                        {searchTerm || selectedOption || placeholder}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button>
                {showOptions &&
                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-950 dark:border py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredOptions.map((option: string) => (
                    <li 
                        className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-black"
                        key={option}
                        onClick={() => handleOptionClick(option)}
                    >
                        <div className="flex items-center">
                            <span className="block truncate font-light text-sm">{option}</span>
                        </div>
                    </li>
                    ))}
                </ul>
                }
            </div>
        </ClickOutside>
    )
}