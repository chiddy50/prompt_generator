"use client"

import { Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const facialHair = {
    // BEARDS
    beards: [
        "Clean-shaven",
        "Stubble (light/heavy)",
        "Goatee (classic/wide)",
        "Van Dyke (goatee + mustache)",
        "Balbo (trimmed beard + mustache)",
        "Garibaldi (full, rounded)",
        "Anchor (chin strap + thin mustache)",
        "Dwarven (braided)"
    ],

    // MUSTACHES
    mustaches: [
        "Pencil thin",
        "Handlebar (curled)",
        "Fu Manchu (long drooping)",
        "Walrus (thick/bushy)",
        "Chevron (thick straight)",
        "Imperial (twisted up)",
        "Toothbrush (small rectangle)"
    ],

    // PATCHES & SIDEBURNS
    partialHair: [
        "Mutton chops",
        "Sideburns (short/long)",
        "Soul patch",
        "Chin strap",
        "Cyberpunk circuit implants",
        "Fae glow-stubble"
    ],

    // FANTASY
    fantasyHair: [
        "Living vine beard",
        "Crystal-encrusted",
        "Smoke-like wisps",
        "Bioluminescent stubble",
        "Scar-shaped hair gaps"
    ]
};

type FacialHairCategory = keyof typeof facialHair;
type FacialHairOption = string;

interface FacialHairSelectorProps {
    onSelect: (category: FacialHairCategory, option: FacialHairOption) => void;
    onRemove?: (category: FacialHairCategory) => void;
    selectedOptions: Partial<Record<FacialHairCategory, FacialHairOption>>;
    className?: string;
}

export default function FacialHairSelector({
    onSelect,
    onRemove,
    selectedOptions,
    className = ''
}: FacialHairSelectorProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<FacialHairCategory | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setCurrentCategory(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Auto-select first category when dropdown opens
    useEffect(() => {
        if (isOpen && !currentCategory) {
            const firstCategory = Object.keys(facialHair)[0] as FacialHairCategory;
            setCurrentCategory(firstCategory);
        }
    }, [isOpen, currentCategory]);

    const handleCategorySelect = (category: FacialHairCategory) => {
        setCurrentCategory(category);
    };

    const handleOptionSelect = (option: FacialHairOption) => {
        if (currentCategory) {
            onSelect(currentCategory, option);
            setIsOpen(false);
            setCurrentCategory(null);
        }
    };

    const handleRemoveSelection = (category: FacialHairCategory, event: React.MouseEvent) => {
        event.stopPropagation();
        if (onRemove) {
            onRemove(category);
        }
    };

    const handleClearAll = () => {
        if (onRemove) {
            Object.keys(selectedOptions).forEach(category => {
                if (selectedOptions[category as FacialHairCategory]) {
                    onRemove(category as FacialHairCategory);
                }
            });
        }
    };

    const getCategoryLabel = (category: FacialHairCategory) => {
        const labels: Record<FacialHairCategory, string> = {
            beards: 'Beards',
            mustaches: 'Mustaches',
            partialHair: 'Patches & Sideburns',
            fantasyHair: 'Fantasy Styles'
        };
        return labels[category];
    };

    const hasSelections = Object.values(selectedOptions).some(option => option);
    const selectedCount = Object.values(selectedOptions).filter(option => option).length;

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
            {/* Main button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-left text-xs bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none transition-colors"
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        {hasSelections ? (
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(selectedOptions).map(([category, option]) => (
                                    option && (
                                        <span
                                            key={`${category}-${option}`}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full border border-blue-200"
                                        >
                                            <span className="font-medium">{getCategoryLabel(category as FacialHairCategory)}:</span>
                                            <span>{option}</span>
                                            <span
                                                onClick={(e) => handleRemoveSelection(category as FacialHairCategory, e)}
                                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors cursor-pointer"
                                                title={`Remove ${option}`}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        handleRemoveSelection(category as FacialHairCategory, e);
                                                    }
                                                }}
                                            >
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </span>
                                    )
                                ))}
                            </div>
                        ) : (
                            <span className="text-gray-500">Select facial hair styles...</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        {hasSelections && (
                            <>
                                <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {selectedCount} selected
                                </span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearAll();
                                    }}
                                    className="text-[10px] text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors cursor-pointer"
                                    title="Clear all selections"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleClearAll();
                                        }
                                    }}
                                >
                                    {/* Clear all */}
                                    <Trash2 size={12} />

                                </span>
                            </>
                        )}
                        <svg 
                            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl">
                    <div className="flex h-72 overflow-hidden">
                        {/* Category sidebar */}
                        <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-gray-50">
                            <div className="p-2">
                                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 px-2">
                                    Categories
                                </h4>
                                {Object.keys(facialHair).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategorySelect(category as FacialHairCategory)}
                                        className={`w-full px-3 py-2 text-left text-xs rounded-md mb-1 transition-colors ${
                                            currentCategory === category 
                                                ? 'bg-blue-100 text-blue-800 font-medium border border-blue-200' 
                                                : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{getCategoryLabel(category as FacialHairCategory)}</span>
                                            {selectedOptions[category as FacialHairCategory] && (
                                                <div className="flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                    <span className="text-xs text-blue-600">✓</span>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Options panel */}
                        <div className="w-2/3 overflow-y-auto">
                            {currentCategory ? (
                                <div>
                                    <div className="sticky top-0 px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-sm text-gray-800">
                                                {getCategoryLabel(currentCategory)}
                                            </h3>
                                            {selectedOptions[currentCategory] && onRemove && (
                                                <span
                                                    onClick={() => onRemove(currentCategory)}
                                                    className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors cursor-pointer"
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            onRemove(currentCategory);
                                                        }
                                                    }}
                                                >
                                                    Remove current
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        {facialHair[currentCategory].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleOptionSelect(option)}
                                                className={`w-full px-3 py-2 text-left text-xs rounded-md mb-1 transition-colors ${
                                                    selectedOptions[currentCategory] === option 
                                                        ? 'bg-blue-100 text-blue-800 border border-blue-200 font-medium' 
                                                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-800'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{option}</span>
                                                    {selectedOptions[currentCategory] === option && (
                                                        <span className="text-blue-600">✓</span>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                                    <div className="text-center">
                                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                                        </svg>
                                        <p>Select a category to view options</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}