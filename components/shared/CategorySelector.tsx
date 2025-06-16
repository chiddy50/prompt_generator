"use client"

import { Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface CategorySelectorProps<T extends Record<string, string[]>> {
    options: T;
    categoryLabels?: Partial<Record<keyof T, string>>;
    onSelect?: (category: keyof T, option: string) => void;
    onRemove?: (category: keyof T) => void;
    selectedOptions?: Partial<Record<keyof T, string>>;
    className?: string;
    placeholder?: string;
    title?: string;
}

function CategorySelector<T extends Record<string, string[]>>({
    options,
    categoryLabels = {},
    onSelect,
    onRemove,
    selectedOptions = {},
    className = '',
    placeholder = 'Select features...',
    title = 'Categories'
}: CategorySelectorProps<T>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<keyof T | null>(null);
    const [internalSelections, setInternalSelections] = useState<Partial<Record<keyof T, string>>>({});
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Use internal state if no external handlers provided
    const effectiveSelections = selectedOptions || internalSelections;

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
            const firstCategory = Object.keys(options)[0] as keyof T;
            setCurrentCategory(firstCategory);
        }
    }, [isOpen, currentCategory, options]);

    const handleCategorySelect = (category: keyof T) => {
        setCurrentCategory(category);
    };

    const handleOptionSelect = (option: string) => {
        if (currentCategory) {
            if (onSelect) {
                onSelect(currentCategory, option);
            } else {
                setInternalSelections(prev => ({
                    ...prev,
                    [currentCategory]: option
                }));
            }
            setIsOpen(false);
            setCurrentCategory(null);
        }
    };

    const handleRemoveSelection = (category: keyof T, event: React.MouseEvent) => {
        event.stopPropagation();
        if (onRemove) {
            onRemove(category);
        } else {
            setInternalSelections(prev => {
                const newSelections = { ...prev };
                delete newSelections[category];
                return newSelections;
            });
        }
    };

    const handleClearAll = () => {
        if (onRemove) {
            Object.keys(effectiveSelections).forEach(category => {
                if (effectiveSelections[category as keyof T]) {
                    onRemove(category as keyof T);
                }
            });
        } else {
            setInternalSelections({});
        }
    };

    const getCategoryLabel = (category: keyof T) => {
        if (categoryLabels[category]) {
            return categoryLabels[category];
        }
        // Convert camelCase to readable format
        const categoryStr = String(category);
        return categoryStr.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
    };

    const hasSelections = Object.values(effectiveSelections).some(option => option);
    const selectedCount = Object.values(effectiveSelections).filter(option => option).length;

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
                                {Object.entries(effectiveSelections).map(([category, option]) => (
                                    option && (
                                        <span
                                            key={`${String(category)}-${option}`}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full border border-blue-200"
                                        >
                                            <span className="font-medium">{getCategoryLabel(category as keyof T)}:</span>
                                            <span>{option}</span>
                                            <span
                                                onClick={(e) => handleRemoveSelection(category as keyof T, e)}
                                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors cursor-pointer"
                                                title={`Remove ${option}`}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        handleRemoveSelection(category as keyof T, e);
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
                            <span className="text-gray-500">{placeholder}</span>
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
                                    className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors cursor-pointer"
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
                                    <Trash2 size={12}/>
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
                                            {effectiveSelections[category as keyof T] && (
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
                                            <h3 className="font-bold text-sm text-gray-800">
                                                {getCategoryLabel(currentCategory)}
                                            </h3>
                                            {effectiveSelections[currentCategory] && (
                                                <span
                                                    onClick={() => {
                                                        if (onRemove) {
                                                            onRemove(currentCategory);
                                                        } else {
                                                            setInternalSelections(prev => {
                                                                const newSelections = { ...prev };
                                                                delete newSelections[currentCategory];
                                                                return newSelections;
                                                            });
                                                        }
                                                    }}
                                                    className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors cursor-pointer"
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            if (onRemove) {
                                                                onRemove(currentCategory);
                                                            } else {
                                                                setInternalSelections(prev => {
                                                                    const newSelections = { ...prev };
                                                                    delete newSelections[currentCategory];
                                                                    return newSelections;
                                                                });
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Remove current
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        {options[currentCategory].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleOptionSelect(option)}
                                                className={`w-full px-3 py-2 text-left text-xs rounded-md mb-1 transition-colors ${
                                                    effectiveSelections[currentCategory] === option 
                                                        ? 'bg-blue-100 text-blue-800 border border-blue-200 font-medium' 
                                                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-800'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{option}</span>
                                                    {effectiveSelections[currentCategory] === option && (
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

// Example usage with multiple different data structures
function CategorySelectorExamples() {
    // Lip options (your original data)
    const lipOptions = {
        shape: ["Full", "Thin", "Bow-shaped", "Downturned", "Heart-shaped", "Wide", "Uneven", "Cupid's bow prominent"],
        fullness: ["Very thin", "Naturally thin", "Average", "Plump", "Overfilled", "Uneven (one fuller)"],
        fantasyTypes: ["Elven (naturally tinted)", "Vampiric (dark/pierced)", "Fae (glowing)", "Merfolk (gilled corners)", "Demon (forked tongue visible)"],
        piercings: ["Labret", "Monroe", "Medusa", "Snake bites", "Spider bites", "Dahlia", "Cyber-ring", "Magnetic dots"],
        adornments: ["Permanent lipstick", "Metallic gloss", "Bioluminescent stain", "Runecarved", "Gemstone inlays", "Living vine tattoos"]
    };

    // Hair options (different data structure)
    const hairOptions = {
        length: ["Bald", "Buzz cut", "Short", "Medium", "Long", "Floor-length"],
        texture: ["Straight", "Wavy", "Curly", "Coily", "Kinky"],
        color: ["Black", "Brown", "Blonde", "Red", "Gray", "White", "Blue", "Purple", "Green", "Pink"],
        style: ["Loose", "Ponytail", "Bun", "Braids", "Dreadlocks", "Mohawk", "Undercut"]
    };

    // Clothing options (another different data structure)
    const clothingOptions = {
        topType: ["T-shirt", "Blouse", "Tank top", "Sweater", "Hoodie", "Jacket", "Coat"],
        bottomType: ["Jeans", "Trousers", "Shorts", "Skirt", "Dress", "Leggings"],
        footwear: ["Sneakers", "Boots", "Sandals", "Heels", "Flats", "Loafers"],
        accessories: ["Hat", "Scarf", "Belt", "Watch", "Jewelry", "Bag", "Sunglasses"]
    };

    const [lipSelections, setLipSelections] = useState({});
    const [hairSelections, setHairSelections] = useState({});
    const [clothingSelections, setClothingSelections] = useState({});

    // Custom category labels for better display names
    const lipLabels = {
        fantasyTypes: "Fantasy Type",
        fullness: "Lip Fullness"
    };

    const hairLabels = {
        topType: "Hair Length"
    };

    const clothingLabels = {
        topType: "Top Type",
        bottomType: "Bottom Type"
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-6">Generic Category Selector Examples</h1>
                
                {/* Lip Customizer */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Lip Features</h2>
                    <CategorySelector
                        options={lipOptions}
                        categoryLabels={lipLabels}
                        selectedOptions={lipSelections}
                        onSelect={(category, option) => setLipSelections(prev => ({ ...prev, [category]: option }))}
                        onRemove={(category) => {
                            setLipSelections(prev => {
                                const newSelections = { ...prev };
                                delete newSelections[category];
                                return newSelections;
                            });
                        }}
                        placeholder="Select lip features..."
                        title="Lip Categories"
                    />
                </div>

                {/* Hair Customizer */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Hair Features</h2>
                    <CategorySelector
                        options={hairOptions}
                        categoryLabels={hairLabels}
                        selectedOptions={hairSelections}
                        onSelect={(category, option) => setHairSelections(prev => ({ ...prev, [category]: option }))}
                        onRemove={(category) => {
                            setHairSelections(prev => {
                                const newSelections = { ...prev };
                                delete newSelections[category];
                                return newSelections;
                            });
                        }}
                        placeholder="Select hair features..."
                        title="Hair Categories"
                    />
                </div>

                {/* Clothing Customizer */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Clothing Features</h2>
                    <CategorySelector
                        options={clothingOptions}
                        categoryLabels={clothingLabels}
                        selectedOptions={clothingSelections}
                        onSelect={(category, option) => setClothingSelections(prev => ({ ...prev, [category]: option }))}
                        onRemove={(category) => {
                            setClothingSelections(prev => {
                                const newSelections = { ...prev };
                                delete newSelections[category];
                                return newSelections;
                            });
                        }}
                        placeholder="Select clothing features..."
                        title="Clothing Categories"
                    />
                </div>

                {/* Standalone Example (internal state) */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Standalone Example (Internal State)</h2>
                    <CategorySelector
                        options={lipOptions}
                        placeholder="Select features (standalone)..."
                        title="Features"
                    />
                </div>

                {/* Display all selections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Lip Selections */}
                    {Object.keys(lipSelections).length > 0 && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-700 mb-2">Selected Lip Features:</h3>
                            <div className="space-y-1">
                                {Object.entries(lipSelections).map(([category, option]) => (
                                    <div key={category} className="text-xs text-blue-600">
                                        <span className="font-medium">{lipLabels[category] || category}:</span> {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hair Selections */}
                    {Object.keys(hairSelections).length > 0 && (
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h3 className="text-sm font-medium text-green-700 mb-2">Selected Hair Features:</h3>
                            <div className="space-y-1">
                                {Object.entries(hairSelections).map(([category, option]) => (
                                    <div key={category} className="text-xs text-green-600">
                                        <span className="font-medium capitalize">{category}:</span> {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Clothing Selections */}
                    {Object.keys(clothingSelections).length > 0 && (
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <h3 className="text-sm font-medium text-orange-700 mb-2">Selected Clothing Features:</h3>
                            <div className="space-y-1">
                                {Object.entries(clothingSelections).map(([category, option]) => (
                                    <div key={category} className="text-xs text-orange-600">
                                        <span className="font-medium">{clothingLabels[category] || category}:</span> {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategorySelector;