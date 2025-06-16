"use client"

import { useState, useRef, useEffect } from 'react';

// Generic type for category data structure
type CategoryData<T extends Record<string, string[]>> = T;

interface GenericMultiSelectProps<T extends Record<string, string[]>> {
    options: CategoryData<T>;
    selectedOptions: Partial<Record<keyof T, string[]>>;
    onSelect: (category: keyof T, option: string) => void;
    onRemove?: (category: keyof T, option: string) => void;
    categoryLabels?: Partial<Record<keyof T, string>>;
    className?: string;
    maxSelections?: number;
    placeholder?: string;
    title?: string;
    gridCols?: 1 | 2 | 3;
}

export default function GenericMultiSelect<T extends Record<string, string[]>>({
    options,
    selectedOptions,
    onSelect,
    onRemove,
    categoryLabels = {},
    className = '',
    maxSelections = Infinity,
    placeholder = 'Select items...',
    title = 'Categories',
    gridCols = 2
}: GenericMultiSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<keyof T | null>(null);
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

    // Auto-select first category when dropdown opens
    useEffect(() => {
        if (isOpen && !currentCategory) {
            const firstCategory = Object.keys(options)[0] as keyof T;
            setCurrentCategory(firstCategory);
        }
    }, [isOpen, currentCategory, options]);

    const handleCategorySelect = (category: keyof T) => {
        setCurrentCategory(category);
    };

    const handleOptionSelect = (option: string) => {
        if (currentCategory) {
            onSelect(currentCategory, option);
        }
    };

    const handleRemoveOption = (category: keyof T, option: string) => {
        // Always remove - use onRemove if provided, otherwise use onSelect for toggle behavior
        if (onRemove) {
            onRemove(category, option);
        } else {
            // Only call onSelect if the item is currently selected (to remove it)
            if (isOptionSelected(category, option)) {
                onSelect(category, option);
            }
        }
    };

    const isOptionSelected = (category: keyof T, option: string) => {
        return selectedOptions[category]?.includes(option) || false;
    };

    const getCategoryLabel = (category: keyof T) => {
        if (categoryLabels[category]) {
            return categoryLabels[category];
        }
        // Convert camelCase/snake_case to readable format
        const categoryStr = String(category);
        return categoryStr
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_-]/g, ' ')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };

    const countSelectedInCategory = (category: keyof T) => {
        return selectedOptions[category]?.length || 0;
    };

    const totalSelected = Object.values(selectedOptions).flat().length;

    const getGridClass = () => {
        switch (gridCols) {
            case 1: return 'grid-cols-1';
            case 2: return 'grid-cols-1 md:grid-cols-2';
            case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
            default: return 'grid-cols-1 md:grid-cols-2';
        }
    };

    return (
        <div className={`relative w-full max-w-4xl ${className}`} ref={dropdownRef}>
            {/* Main button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                // disabled={totalSelected >= maxSelections}
                className={`w-full px-4 py-2 text-xs text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none transition-colors 
                `}
                // ${totalSelected >= maxSelections ? 'opacity-75 cursor-not-allowed' : ''}
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        {totalSelected > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(selectedOptions).map(([category, options]) =>
                                    options?.map(option => (
                                        <span
                                            key={`${String(category)}-${option}`}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full border border-blue-200"
                                        >
                                            <span className="font-medium">{getCategoryLabel(category as keyof T)}:</span>
                                            <span>{option}</span>
                                            <span
                                                role="button"
                                                tabIndex={0}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveOption(category as keyof T, option);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleRemoveOption(category as keyof T, option);
                                                    }
                                                }}
                                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors cursor-pointer"
                                                title={`Remove ${option}`}
                                            >
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </span>
                                    ))
                                )}
                            </div>
                        ) : (
                            <span className="text-gray-500">{placeholder}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        {maxSelections < Infinity && (
                            <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {totalSelected}/{maxSelections} selected
                            </span>
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
                    <div className="flex h-80 overflow-hidden">
                        {/* Category sidebar */}
                        <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-gray-50">
                            <div className="p-2">
                                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 px-2">
                                    {title}
                                </h4>
                                {Object.keys(options).map((category) => (
                                    <button
                                        key={String(category)}
                                        onClick={() => handleCategorySelect(category as keyof T)}
                                        className={`w-full px-3 py-2 text-left text-xs rounded-md mb-1 transition-colors ${
                                            currentCategory === category 
                                                ? 'bg-blue-100 text-blue-800 font-medium border border-blue-200' 
                                                : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{getCategoryLabel(category as keyof T)}</span>
                                            {countSelectedInCategory(category as keyof T) > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                        {countSelectedInCategory(category as keyof T)}
                                                    </span>
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
                                            <h3 className="font-bold text-sm text-gray-800">
                                                {getCategoryLabel(currentCategory)}
                                            </h3>
                                            {maxSelections < Infinity && (
                                                <span className="text-xs text-gray-500">
                                                    {totalSelected}/{maxSelections} selected
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`grid ${getGridClass()} gap-1 p-2`}>
                                        {options[currentCategory].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleOptionSelect(option)}
                                                disabled={
                                                    !isOptionSelected(currentCategory, option) &&
                                                    totalSelected >= maxSelections
                                                }
                                                className={`p-2 text-left rounded text-xs flex items-start transition-colors ${
                                                    isOptionSelected(currentCategory, option)
                                                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-800'
                                                } ${
                                                    !isOptionSelected(currentCategory, option) &&
                                                    totalSelected >= maxSelections
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                            >
                                                <span
                                                    className={`flex items-center justify-center w-4 h-4 mt-0.5 mr-2 border rounded-sm flex-shrink-0 transition-colors ${
                                                        isOptionSelected(currentCategory, option)
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
                                <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                                    <div className="text-center">
                                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

// Example usage with different data structures
function GenericMultiSelectExamples() {
    // Hair accessories (your original data)
    const hairAccessories = {
        functional: [
            "Hairpins", "Bobby pins", "Clips (barrette, claw)", "Headbands", 
            "Scrunchies", "Hair elastics", "Hair nets", "Bandanas"
        ],
        fashion: [
            "Ribbons", "Silk flowers", "Pearl pins", "Crystal hair vines", 
            "Feather extensions", "Chain accents", "Gemstone combs"
        ],
        formal: [
            "Tiaras", "Hair crowns", "Bridal combs", "Crystal hairpins", 
            "Pearl-encrusted bands", "Ornate hair combs"
        ],
        fantasy: [
            "Living flower vines", "Glowing rune clips", "Enchanted crystal hairpins", 
            "Fae-wing hair combs", "Dragon-scale ribbons"
        ]
    };

    // Clothing options
    const clothingOptions = {
        tops: ["T-shirt", "Blouse", "Tank top", "Sweater", "Hoodie", "Jacket"],
        bottoms: ["Jeans", "Trousers", "Shorts", "Skirt", "Dress", "Leggings"],
        footwear: ["Sneakers", "Boots", "Sandals", "Heels", "Flats", "Loafers"],
        accessories: ["Hat", "Scarf", "Belt", "Watch", "Jewelry", "Bag"]
    };

    // Skills/abilities
    const skillOptions = {
        combat: ["Sword Fighting", "Archery", "Hand-to-Hand", "Shield Use", "Tactical Planning"],
        magic: ["Fire Magic", "Water Magic", "Healing", "Illusion", "Enchantment", "Summoning"],
        social: ["Persuasion", "Deception", "Intimidation", "Leadership", "Diplomacy"],
        technical: ["Lockpicking", "Trap Detection", "Engineering", "Alchemy", "Research"]
    };

    const [hairSelections, setHairSelections] = useState({});
    const [clothingSelections, setClothingSelections] = useState({});
    const [skillSelections, setSkillSelections] = useState({});

    // Handle selection toggle
    const handleSelection = (selections, setSelections) => (category, option) => {
        setSelections(prev => {
            const currentCategorySelections = prev[category] || [];
            const isSelected = currentCategorySelections.includes(option);
            
            if (isSelected) {
                // Remove option
                return {
                    ...prev,
                    [category]: currentCategorySelections.filter(item => item !== option)
                };
            } else {
                // Add option
                return {
                    ...prev,
                    [category]: [...currentCategorySelections, option]
                };
            }
        });
    };

    // Custom labels
    const hairLabels = {
        sciFi: "Sci-Fi",
        makeshift: "Makeshift/Damaged"
    };

    const skillLabels = {
        combat: "Combat Skills",
        magic: "Magic Abilities",
        social: "Social Skills",
        technical: "Technical Skills"
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Generic Multi-Select Component Examples</h1>
                <p className="text-sm text-gray-600 mb-6">Select multiple items from different categories. Each example uses the same generic component with different data.</p>
                
                {/* Hair Accessories */}
                <div className="mb-8">
                    <h2 className="text-base sm:text-lg font-semibold mb-4">Hair Accessories</h2>
                    <GenericMultiSelect
                        options={hairAccessories}
                        selectedOptions={hairSelections}
                        onSelect={handleSelection(hairSelections, setHairSelections)}
                        categoryLabels={hairLabels}
                        placeholder="Select hair accessories..."
                        title="Accessory Types"
                        maxSelections={10}
                        gridCols={2}
                    />
                </div>

                {/* Clothing */}
                <div className="mb-8">
                    <h2 className="text-base sm:text-lg font-semibold mb-4">Clothing Items</h2>
                    <GenericMultiSelect
                        options={clothingOptions}
                        selectedOptions={clothingSelections}
                        onSelect={handleSelection(clothingSelections, setClothingSelections)}
                        placeholder="Select clothing items..."
                        title="Clothing Categories"
                        maxSelections={8}
                        gridCols={1}
                    />
                </div>

                {/* Skills */}
                <div className="mb-8">
                    <h2 className="text-base sm:text-lg font-semibold mb-4">Character Skills</h2>
                    <GenericMultiSelect
                        options={skillOptions}
                        selectedOptions={skillSelections}
                        onSelect={handleSelection(skillSelections, setSkillSelections)}
                        categoryLabels={skillLabels}
                        placeholder="Select character skills..."
                        title="Skill Categories"
                        maxSelections={12}
                        gridCols={3}
                    />
                </div>

                {/* Display selections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Hair Selections */}
                    {Object.keys(hairSelections).length > 0 && (
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h3 className="text-sm font-medium text-purple-700 mb-3">Selected Hair Accessories:</h3>
                            <div className="space-y-2">
                                {Object.entries(hairSelections).map(([category, options]) => (
                                    options.length > 0 && (
                                        <div key={category}>
                                            <span className="text-xs font-medium text-purple-600 capitalize">
                                                {hairLabels[category] || category}:
                                            </span>
                                            <div className="ml-2 text-xs text-purple-600">
                                                {options.join(', ')}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Clothing Selections */}
                    {Object.keys(clothingSelections).length > 0 && (
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h3 className="text-sm font-medium text-green-700 mb-3">Selected Clothing:</h3>
                            <div className="space-y-2">
                                {Object.entries(clothingSelections).map(([category, options]) => (
                                    options.length > 0 && (
                                        <div key={category}>
                                            <span className="text-xs font-medium text-green-600 capitalize">
                                                {category}:
                                            </span>
                                            <div className="ml-2 text-xs text-green-600">
                                                {options.join(', ')}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skill Selections */}
                    {Object.keys(skillSelections).length > 0 && (
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <h3 className="text-sm font-medium text-orange-700 mb-3">Selected Skills:</h3>
                            <div className="space-y-2">
                                {Object.entries(skillSelections).map(([category, options]) => (
                                    options.length > 0 && (
                                        <div key={category}>
                                            <span className="text-xs font-medium text-orange-600">
                                                {skillLabels[category] || category}:
                                            </span>
                                            <div className="ml-2 text-xs text-orange-600">
                                                {options.join(', ')}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
