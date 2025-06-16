"use client"

import { useState, useRef, useEffect } from 'react';

export const skinTones = [
    "Alabaster",
    "Ivory",
    "Porcelain",
    "Cream",
    "Fair",
    "Pale",
    "Rosy",
    "Peche",
    "Beige",
    "Light Brown",
    "Honey",
    "Golden",
    "Tan",
    "Caramel",
    "Bronze",
    "Copper",
    "Mahogany",
    "Chestnut",
    "Walnut",
    "Dark Brown",
    "Cocoa",
    "Mocha",
    "Russet",
    "Tawny",
    "Sienna",
    "Umber",
    "Ebony",
    "Raven",
    "Obsidian",
    "Onyx",
    "Olive",
    "Unusual colors"
];

interface SkinToneSelectorProps {
    selectedTone: string | null;
    onSelect: (tone: string) => void;
    className?: string;
    showColorPreview?: boolean;
}

export default function SkinToneSelector({
    selectedTone,
    onSelect,
    className = '',
    showColorPreview = true,
}: SkinToneSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Map skin tone names to Tailwind CSS color classes
    const getToneColorClass = (tone: string) => {
        const colorMap: Record<string, string> = {
            Alabaster: 'bg-[#f2e8df]',
            Ivory: 'bg-[#fffff0]',
            Porcelain: 'bg-[#f7f3e6]',
            Cream: 'bg-[#fffdd0]',
            Fair: 'bg-[#ffebcd]',
            Pale: 'bg-[#f5deb3]',
            Rosy: 'bg-[#ffdbdb]',
            Peche: 'bg-[#ffdab9]',
            Beige: 'bg-[#f5f5dc]',
            'Light Brown': 'bg-[#c19a6b]',
            Honey: 'bg-[#f5b876]',
            Golden: 'bg-[#ffd700]',
            Tan: 'bg-[#d2b48c]',
            Caramel: 'bg-[#c68542]',
            Bronze: 'bg-[#cd7f32]',
            Copper: 'bg-[#b87333]',
            Mahogany: 'bg-[#c04000]',
            Chestnut: 'bg-[#954535]',
            Walnut: 'bg-[#773f1a]',
            'Dark Brown': 'bg-[#654321]',
            Cocoa: 'bg-[#4e3629]',
            Mocha: 'bg-[#4b3832]',
            Russet: 'bg-[#80461b]',
            Tawny: 'bg-[#cd5700]',
            Sienna: 'bg-[#a0522d]',
            Umber: 'bg-[#635147]',
            Ebony: 'bg-[#555d50]',
            Raven: 'bg-[#3a3a3a]',
            Obsidian: 'bg-[#2e2e2e]',
            Onyx: 'bg-[#0f0f0f]',
            Olive: 'bg-[#808000]',
            'Unusual colors': 'bg-gradient-to-r from-blue-300 via-green-300 to-purple-300'
        };
        return colorMap[tone] || 'bg-gray-200';
    };

    return (
        <div className={`relative text-xs ${className}`} ref={dropdownRef}>
            <button
                type="button"
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    {showColorPreview && selectedTone && (
                        <span
                            className={`w-4 h-4 rounded-full mr-2 ${getToneColorClass(selectedTone)}`}
                            aria-hidden="true"
                        />
                    )}
                    <span className="truncate">
                        {selectedTone || "Select skin tone..."}
                    </span>
                </div>
                <svg
                    className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <ul
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                    role="listbox"
                >
                    {skinTones.map((tone) => (
                        <li
                            key={tone}
                            role="option"
                            aria-selected={selectedTone === tone}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${selectedTone === tone ? 'bg-blue-100 text-blue-800' : 'text-gray-900'
                                }`}
                            onClick={() => {
                                onSelect(tone);
                                setIsOpen(false);
                            }}
                        >
                            <div className="flex items-center">
                                {showColorPreview && (
                                    <span
                                        className={`w-4 h-4 rounded-full mr-2 ${getToneColorClass(tone)}`}
                                        aria-hidden="true"
                                    />
                                )}
                                <span className="block truncate">{tone}</span>
                                {selectedTone === tone && (
                                    <svg
                                        className="w-5 h-5 ml-2 text-blue-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}