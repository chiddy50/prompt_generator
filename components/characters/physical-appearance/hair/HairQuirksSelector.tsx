"use client"

import { useState, useRef, useEffect } from 'react';

const hairQuirks = [
    "Unruly hair that defies styling",
    "Split ends from heat damage",
    "Balding with visible patches",
    "Stubborn cowlick that sticks up",
    "Twirls hair when nervous",
    "Color shifts in different light",
    "One section grows faster",
    "Curls only on one side",
    "Permanent bedhead look",
    "Attracts static electricity",
    "Constantly tucks behind ears",
    "Grows in spiky directions",
    "Premature gray streaks",
    "Frizzes in humidity",
    "Zigzag natural part",
    "Sheds excessively everywhere",
    "Won't hold hair products",
    "Grows unusually fast or slow",
    "Braids small sections unconsciously",
    "Tangles easily, needs brushing",
    "Natural highlight patterns",
    "Sticks up after wearing hats",
    "Pulls or tugs absentmindedly",
    "Natural mohawk shape",
    "Chronic dandruff issues",
    "Texture changes with seasons",
    "Chews on hair ends",
    "Perfect spiral curls",
    "One side grows thicker",
    "Repels water, stays dry",
    "Runs fingers through nervously",
    "Patchy different textures",
    "Double crown growth pattern",
    "Gets oily within hours",
    "Twists into temporary knots",
    "Unusual shine or dullness",
    "Styles while thinking",
    "Grows straight up",
    "Falls in front of eyes",
    "Reacts to weather changes",
    "No quirks"
];

interface HairQuirksSelectorProps {
    selectedQuirks: string[];
    onSelect: (quirks: string[]) => void;
    className?: string;
    maxSelections?: number;
}

export default function HairQuirksSelector({
    selectedQuirks = [],
    onSelect,
    className = '',
    maxSelections = Infinity,
}: HairQuirksSelectorProps) {
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

    const handleQuirkToggle = (quirk: string) => {
        let newQuirks: string[];

        if (quirk === "No quirks") {
            newQuirks = ["No quirks"];
        } else if (selectedQuirks.includes(quirk)) {
            newQuirks = selectedQuirks.filter(q => q !== quirk);
            // If removing the last quirk, automatically select "No quirks"
            if (newQuirks.length === 0) {
                newQuirks = ["No quirks"];
            }
        } else {
            // If selecting a new quirk, remove "No quirks" if it was selected
            newQuirks = [...selectedQuirks.filter(q => q !== "No quirks"), quirk];
        }

        // Enforce max selections
        if (newQuirks.length <= maxSelections) {
            onSelect(newQuirks);
        }
    };

    const isQuirkSelected = (quirk: string) => {
        return selectedQuirks.includes(quirk);
    };

    return (
        <div className={`relative text-xs ${className}`} ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${selectedQuirks.length >= maxSelections ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                role="button"
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
            >
                {selectedQuirks.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {selectedQuirks.map(quirk => (
                            <span
                                key={quirk}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center"
                            >
                                {quirk}
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleQuirkToggle(quirk);
                                    }}
                                    className="ml-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Remove ${quirk}`}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleQuirkToggle(quirk);
                                        }
                                    }}
                                >
                                    ×
                                </span>
                            </span>
                        ))}
                    </div>
                ) : (
                    'Select hair quirks...'
                )}
                {maxSelections < Infinity && (
                    <div className="text-xs text-gray-500 mt-1">
                        {selectedQuirks.length}/{maxSelections} selected
                    </div>
                )}
            </div>

            {isOpen && (
                <ul
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                    role="listbox"
                >
                    {hairQuirks.map((quirk) => (
                        <li
                            key={quirk}
                            role="option"
                            aria-selected={isQuirkSelected(quirk)}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${isQuirkSelected(quirk) ? 'bg-blue-100 text-blue-800' : 'text-gray-900'
                                } ${!isQuirkSelected(quirk) && selectedQuirks.length >= maxSelections
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                                }`}
                            onClick={() => handleQuirkToggle(quirk)}
                        >
                            <div className="flex items-center">
                                <span
                                    className={`flex items-center justify-center w-4 h-4 mr-2 border rounded-sm ${isQuirkSelected(quirk) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                        }`}
                                >
                                    {isQuirkSelected(quirk) && (
                                        <svg
                                            className="w-3 h-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </span>
                                <span className="block truncate">{quirk}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}