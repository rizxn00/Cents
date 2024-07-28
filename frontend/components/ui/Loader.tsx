import React, { useState, useEffect } from 'react';

export const Loader = () => {
    const currencies = ['₹', '¥', '₩', '$', '€', '£'];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % currencies.length);
        }, 1000); // Change every 1 second (adjust as needed)

        return () => clearInterval(interval);
    }, [currencies.length]);

    return (
        <div className="flex justify-center items-center w-full h-96">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex justify-center items-center animate-bounce">
                <span className="text-xl font-bold text-white relative">
                    {currencies.map((currency, index) => (
                        <span
                            key={currency}
                            className={`absolute inset-0 flex items-center justify-center ${
                                index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {currency}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
};