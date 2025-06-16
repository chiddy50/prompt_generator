"use client"

import { eyeColors } from '@/data/character/eye';
import { EyeColor } from '@/types/EyeColourType';
import { useState, useRef, useEffect } from 'react';

// type EyeColor = typeof eyeColors[number];

interface EyeColorSelectorProps {
    selectedColor: EyeColor | null;
    onSelect: (color: EyeColor) => void;
    className?: string;
}

// Map eye colors to their corresponding Tailwind CSS color classes
const colorSwatches: Record<EyeColor, string> = {
    "Amber": "bg-amber-400",
    "Blue": "bg-blue-500",
    "Bronze": "bg-amber-700",
    "Brown": "bg-amber-900",
    "Copper": "bg-orange-700",
    "Emerald Green": "bg-emerald-500",
    "Gray": "bg-gray-400",
    "Green": "bg-green-500",
    "Golden": "bg-yellow-400",
    "Glowing": "bg-gradient-to-r from-yellow-300 to-yellow-100",
    "Heterochromia": "bg-gradient-to-r from-blue-500 to-green-500",
    "Honey": "bg-amber-300",
    "Ice Blue": "bg-cyan-200",
    "Mauve": "bg-purple-300",
    "Multicolored": "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    "Purple": "bg-purple-500",
    "Red": "bg-red-500",
    "Turquoise": "bg-teal-400",
    "Violet": "bg-violet-500",
    "Yellow": "bg-yellow-300"
};

export default function EyeColorSelector({
    selectedColor,
    onSelect,
    className = ''
}: EyeColorSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (color: EyeColor) => {
        onSelect(color);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Dropdown button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-left bg-white dark:text-white text-xs dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none flex justify-between items-center"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    {selectedColor && (
                        <span
                            className={`w-4 h-4 rounded-full mr-3 ${colorSwatches[selectedColor]}`}
                            aria-hidden="true"
                        />
                    )}
                    <span className="truncate">
                        {selectedColor || "Select eye color..."}
                    </span>
                </div>
                <svg
                    className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg overflow-hidden">
                    <ul
                        className="max-h-60 overflow-y-auto py-1"
                        role="listbox"
                    >
                        {eyeColors.map((color) => (
                            <li
                                key={color}
                                role="option"
                                aria-selected={selectedColor === color}
                                onClick={() => handleSelect(color)}
                                className={`px-3 py-2 text-xs cursor-default flex items-center ${selectedColor === color
                                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span
                                    className={`w-4 h-4 rounded-full mr-3 ${colorSwatches[color]}`}
                                    aria-hidden="true"
                                />
                                {color}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
