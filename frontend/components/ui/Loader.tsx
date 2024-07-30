import React, { useState, useEffect } from 'react';

export const Loader = () => {
    const currencies = ['₹', '¥', '₩', '$', '€', '£'];
    const [currentIndices, setCurrentIndices] = useState([0, 1, 2]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndices((prevIndices) => [
                prevIndices[1],
                prevIndices[2],
                (prevIndices[2] + 1) % currencies.length
            ]);
        }, 1000);
        return () => clearInterval(interval);
    }, [currencies.length]);

    return (
        <div className="flex justify-center items-center w-full h-96">
            <div className="relative w-48 h-16">
                {[0, 1, 2].map((position, index) => (
                    <div
                        key={position}
                        className={`absolute top-0 w-16 h-16 bg-orange-800 border border-orange-900 rounded-full flex justify-center items-center transition-all duration-500 ease-in-out ${
                            position === 1 ? 'z-10 scale-125' : 'z-0 scale-100'
                        } ${
                            position === 0 ? 'left-0' : position === 1 ? 'left-16' : 'left-32'
                        }`}
                    >
                        <span className="text-xl font-bold text-white">
                            {currencies[currentIndices[index]]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};