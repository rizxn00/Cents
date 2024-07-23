'use client'
import React, { useEffect, useRef, useState } from 'react';
import Label from './Label';

interface TooltipProps {
    children?: React.ReactNode
    text: any
    className?: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const targetRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isVisible && targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top + window.scrollY,
                left: rect.right + window.scrollX + 10, // 10px offset from the right edge
            });
        }
    }, [isVisible]);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, 800); 
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="relative inline-block">
            <div
                ref={targetRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
            {isVisible && (
                <div
                    style={{
                        position: 'fixed',
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        zIndex: 9999,
                    }}
                    className="ml-2 mt-5 px-3 py-2 text-sm font-medium bg-gray-100 rounded-lg shadow-sm tooltip dark:bg-zinc-900">
                    <Label>{text}</Label>
                </div>
            )}
        </div>
    );
};

export default Tooltip;