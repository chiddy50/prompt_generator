"use client"

import { useState, useRef, useEffect } from 'react';

export const hairAccessories = {
    // PRACTICAL
    functional: [
        "Hairpins",
        "Bobby pins",
        "Clips (barrette, claw)",
        "Headbands",
        "Scrunchies",
        "Hair elastics",
        "Hair nets",
        "Bandanas",
        "Turbans",
        "Hair sticks",
        "Hair forks",
        "Bun cages"
    ],

    // DECORATIVE
    fashion: [
        "Ribbons",
        "Silk flowers",
        "Pearl pins",
        "Crystal hair vines",
        "Feather extensions",
        "Chain accents",
        "Gemstone combs",
        "Lace hair cuffs",
        "Hair jewelry (gold/silver)",
        "Beaded strands",
        "Tinsel streaks",
        "Charms on strands"
    ],

    // FORMAL/OCCASION
    formal: [
        "Tiaras",
        "Hair crowns",
        "Bridal combs",
        "Crystal hairpins",
        "Pearl-encrusted bands",
        "Ornate hair combs",
        "Jeweled hair vines",
        "Metallic hair chains",
        "Hair mantles (for royalty)"
    ],

    // FANTASY
    fantasy: [
        "Living flower vines",
        "Glowing rune clips",
        "Enchanted crystal hairpins",
        "Fae-wing hair combs",
        "Dragon-scale ribbons",
        "Elven leaf crowns",
        "Witch's bone charms",
        "Arcane focus hair rings",
        "Spirit lantern hair orbs"
    ],

    // SCI-FI
    sciFi: [
        "Holo-hair projectors",
        "Neon wire extensions",
        "Nanotech hair weaves",
        "Cybernetic hair implants",
        "Floating hair nodes",
        "Data-stream hair threads",
        "LED hair cuffs",
        "Magnetic hair spikes"
    ],

    // HISTORICAL/CULTURAL
    cultural: [
        "Geisha kanzashi",
        "African beadwork",
        "Native American hair pipes",
        "Victorian hair mourning jewelry",
        "Chinese hairpins (zan)",
        "Indian jasmine strands",
        "Viking braid cuffs",
        "Ancient Greek hair nets"
    ],

    // DAMAGED/IMPROVISED
    makeshift: [
        "Twine ties",
        "Rusty pins",
        "Broken comb pieces",
        "Scrap metal clips",
        "Bone fragments as pins",
        "Burnt ribbon remnants",
        "Torn fabric strips",
        "Thorn-and-vine bindings"
    ],

    // SPECIAL/UNUSUAL
    unique: [
        "Sentient hair accessories",
        "Parasitic hair jewelry",
        "Hair that changes color",
        "Floating halo-like rings",
        "Miniature familiars as clips",
        "Hair that glows in the dark",
        "Weaponized hairpins",
        "Illusory hair ornaments"
    ]
};

type HairAccessoryCategory = keyof typeof hairAccessories;
type HairAccessoryOption = string;

interface HairAccessorySelectorProps {
    selectedOptions: Partial<Record<HairAccessoryCategory, HairAccessoryOption[]>>;
    onSelect: (category: HairAccessoryCategory, option: HairAccessoryOption) => void;
    className?: string;
    maxSelections?: number;
}

export default function HairAccessorySelector({
    selectedOptions,
    onSelect,
    className = '',
    maxSelections = Infinity
}: HairAccessorySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<HairAccessoryCategory | null>(null);
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

    const handleCategorySelect = (category: HairAccessoryCategory) => {
        setCurrentCategory(category);
    };

    const handleOptionSelect = (option: HairAccessoryOption) => {
        if (currentCategory) {
            onSelect(currentCategory, option);
        }
    };

    const isOptionSelected = (category: HairAccessoryCategory, option: HairAccessoryOption) => {
        return selectedOptions[category]?.includes(option) || false;
    };

    const getCategoryLabel = (category: HairAccessoryCategory) => {
        const labels: Record<HairAccessoryCategory, string> = {
            functional: 'Functional',
            fashion: 'Decorative',
            formal: 'Formal',
            fantasy: 'Fantasy',
            sciFi: 'Sci-Fi',
            cultural: 'Cultural',
            makeshift: 'Makeshift',
            unique: 'Unique'
        };
        return labels[category];
    };

    const countSelectedInCategory = (category: HairAccessoryCategory) => {
        return selectedOptions[category]?.length || 0;
    };

    const totalSelected = Object.values(selectedOptions).flat().length;

    return (
        <div className={`relative w-full max-w-3xl ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={totalSelected >= maxSelections}
                className={`w-full px-4 py-2 capitalize text-xs text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none  ${totalSelected >= maxSelections ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
            >
                {totalSelected > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(selectedOptions).map(([category, options]) =>
                            options?.map(option => (
                                <span
                                    key={`${category}-${option}`}
                                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center"
                                >
                                    {option}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOptionSelect(option);
                                        }}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))
                        )}
                    </div>
                ) : (
                    'Select hair accessories...'
                )}
                {maxSelections < Infinity && (
                    <div className="text-xs text-gray-500 mt-1">
                        {totalSelected}/{maxSelections} selected
                    </div>
                )}
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="flex h-[32rem] overflow-hidden">
                        {/* Category sidebar */}
                        <div className="w-1/4 overflow-y-auto border-r border-gray-200 bg-gray-50">
                            {Object.keys(hairAccessories).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategorySelect(category as HairAccessoryCategory)}
                                    className={`w-full px-4 py-2 text-left capitalize text-xs flex justify-between items-center ${currentCategory === category
                                            ? 'bg-blue-100 text-blue-800 font-medium'
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{getCategoryLabel(category as HairAccessoryCategory)}</span>
                                    {countSelectedInCategory(category as HairAccessoryCategory) > 0 && (
                                        <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            {countSelectedInCategory(category as HairAccessoryCategory)}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Options panel */}
                        <div className="w-3/4 overflow-y-auto">
                            {currentCategory ? (
                                <div>
                                    <div className="sticky top-0 px-4 py-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                        <h3 className="font-bold text-sm">
                                            {getCategoryLabel(currentCategory)}
                                        </h3>
                                        {maxSelections < Infinity && (
                                            <span className="text-xs text-gray-500">
                                                {totalSelected}/{maxSelections} selected
                                            </span>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                                        {hairAccessories[currentCategory].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleOptionSelect(option)}
                                                disabled={
                                                    !isOptionSelected(currentCategory, option) &&
                                                    totalSelected >= maxSelections
                                                }
                                                className={`p-2 text-left rounded capitalize text-xs flex items-start ${isOptionSelected(currentCategory, option)
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'hover:bg-gray-50'
                                                    } ${!isOptionSelected(currentCategory, option) &&
                                                        totalSelected >= maxSelections
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : ''
                                                    }`}
                                            >
                                                <span
                                                    className={`flex items-center justify-center w-4 h-4 mt-0.5 capitalize mr-2 border rounded-sm flex-shrink-0 ${isOptionSelected(currentCategory, option)
                                                            ? 'bg-blue-500 border-blue-500'
                                                            : 'border-gray-300'
                                                        }`}
                                                >
                                                    {isOptionSelected(currentCategory, option) && (
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
                                                <span>{option}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                    Select a category
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}