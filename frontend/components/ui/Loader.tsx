import React, { useState, useEffect } from 'react';

export const Loader = () => {
    const [currency, setCurrency] = useState<string>('$')

    useEffect(() => {
        const curr = localStorage.getItem('currency')
        if(curr) setCurrency(curr)
    }, [])

    return (
        <div className="flex justify-center items-center w-full h-96">
            <div className="relative w-20 h-20 rounded-full overflow-hidden animate-bounce bg-orange-700 flex items-center justify-center">
               {currency}
            </div>
        </div>
    );
};