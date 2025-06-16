"use client"

import { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
    options: string[];
    selectedItems?: string[];
    onSelectionChange?: (items: string[]) => void;
    className?: string;
    maxSelections?: number;
    placeholder?: string;
    noSelectionOption?: string;
    allowReset?: boolean;
    resetButtonText?: string;
    disabled?: boolean;
    searchable?: boolean;
    // Backward compatibility props
    selectedQuirks?: string[];
    onSelect?: (items: string[]) => void;
}

export default function MultiSelect({
    options = [],
    selectedItems: controlledSelectedItems,
    onSelectionChange,
    className = '',
    maxSelections = Infinity,
    placeholder = 'Select items...',
    noSelectionOption = 'No selection',
    allowReset = true,
    resetButtonText = 'Clear All',
    disabled = false,
    searchable = false,
    // Backward compatibility props
    selectedQuirks,
    onSelect,
}: MultiSelectProps) {
    // Handle backward compatibility
    const finalSelectedItems = controlledSelectedItems || selectedQuirks || [];
    const finalOnSelectionChange = onSelectionChange || onSelect || (() => {});
    
    // Internal state management
    const [internalSelectedItems, setInternalSelectedItems] = useState<string[]>(
        finalSelectedItems.length > 0 ? finalSelectedItems : 
        (noSelectionOption && options.includes(noSelectionOption) ? [noSelectionOption] : [])
    );
    
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Use controlled or internal state
    const selectedItems = controlledSelectedItems !== undefined ? controlledSelectedItems : internalSelectedItems;

    // Filter options based on search term
    const filteredOptions = searchable 
        ? options.filter(option => 
            option.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen, searchable]);

    const updateSelection = (newItems: string[]) => {
        if (controlledSelectedItems === undefined) {
            setInternalSelectedItems(newItems);
        }
        finalOnSelectionChange(newItems);
    };

    const handleItemToggle = (item: string) => {
        if (disabled) return;

        let newItems: string[];

        if (item === noSelectionOption) {
            newItems = [noSelectionOption];
        } else if (selectedItems.includes(item)) {
            newItems = selectedItems.filter(i => i !== item);
            // If removing the last item and noSelectionOption exists, select it
            if (newItems.length === 0 && options.includes(noSelectionOption)) {
                newItems = [noSelectionOption];
            }
        } else {
            // If selecting a new item, remove noSelectionOption if it was selected
            newItems = [...selectedItems.filter(i => i !== noSelectionOption), item];
        }

        // Enforce max selections
        if (newItems.length <= maxSelections) {
            updateSelection(newItems);
        }
    };

    const handleReset = () => {
        if (disabled) return;
        
        const resetItems = options.includes(noSelectionOption) ? [noSelectionOption] : [];
        updateSelection(resetItems);
        setSearchTerm('');
    };

    const isItemSelected = (item: string) => {
        return selectedItems.includes(item);
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setSearchTerm('');
            }
        }
    };

    const displayText = selectedItems.length > 0 ? null : placeholder;
    const showCounter = maxSelections < Infinity;
    const hasSelections = selectedItems.length > 0 && 
                         !(selectedItems.length === 1 && selectedItems[0] === noSelectionOption);

    return (
        <div className={`relative text-xs ${className}`} ref={dropdownRef}>
            <div
                onClick={toggleDropdown}
                className={`w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    disabled 
                        ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                        : selectedItems.length >= maxSelections 
                            ? 'opacity-75' 
                            : ''
                }`}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-disabled={disabled}
                onKeyDown={(e) => {
                    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        toggleDropdown();
                    }
                }}
            >
                {displayText ? (
                    <span className="text-gray-500">{displayText}</span>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {selectedItems
                            .filter(item => item !== noSelectionOption)
                            .map(item => (
                            <span
                                key={item}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center"
                            >
                                {item}
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!disabled) {
                                            handleItemToggle(item);
                                        }
                                    }}
                                    className={`ml-1 text-blue-600 hover:text-blue-800 cursor-pointer ${
                                        disabled ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                                    role="button"
                                    tabIndex={disabled ? -1 : 0}
                                    aria-label={`Remove ${item}`}
                                    onKeyDown={(e) => {
                                        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleItemToggle(item);
                                        }
                                    }}
                                >
                                    ×
                                </span>
                            </span>
                        ))}
                    </div>
                )}
                
                {/* Counter and Reset Button Row */}
                <div className="flex justify-between items-center mt-1">
                    {showCounter && (
                        <div className="text-xs text-gray-500">
                            {selectedItems.filter(item => item !== noSelectionOption).length}/{maxSelections} selected
                        </div>
                    )}
                    
                    {allowReset && hasSelections && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleReset();
                            }}
                            className={`text-xs text-red-600 hover:text-red-800 underline ${
                                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                            }`}
                            disabled={disabled}
                            type="button"
                        >
                            {resetButtonText}
                        </button>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden focus:outline-none">
                    {searchable && (
                        <div className="p-2 border-b border-gray-200">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search options..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}
                    
                    <ul className="max-h-48 overflow-auto" role="listbox">
                        {filteredOptions.length === 0 ? (
                            <li className="px-4 py-2 text-gray-500 text-center">
                                No options found
                            </li>
                        ) : (
                            filteredOptions.map((option) => (
                                <li
                                    key={option}
                                    role="option"
                                    aria-selected={isItemSelected(option)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                                        isItemSelected(option) 
                                            ? 'bg-blue-100 text-blue-800' 
                                            : 'text-gray-900'
                                    } ${
                                        !isItemSelected(option) && selectedItems.length >= maxSelections
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                    }`}
                                    onClick={() => handleItemToggle(option)}
                                >
                                    <div className="flex items-center">
                                        <span
                                            className={`flex items-center justify-center w-4 h-4 mr-2 border rounded-sm ${
                                                isItemSelected(option) 
                                                    ? 'bg-blue-500 border-blue-500' 
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {isItemSelected(option) && (
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
                                        <span className="block truncate">{option}</span>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

// Example usage with the original hair quirks data
export function HairQuirksSelector(props: any) {
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

    return (
        <MultiSelect
            options={hairQuirks}
            placeholder="Select hair quirks..."
            noSelectionOption="No quirks"
            {...props}
        />
    );
}

// Demo component showing various use cases
export function MultiSelectDemo() {
    const [fruits, setFruits] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>(['Red']);
    
    const fruitOptions = ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Blueberry', 'Mango', 'Pineapple'];
    const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Black', 'White'];
    
    return (
        <div className="p-6 space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Multi-Select Component Demo</h2>
            
            <div>
                <label className="block text-sm font-medium mb-2">Select Fruits (Max 3):</label>
                <MultiSelect
                    options={fruitOptions}
                    selectedItems={fruits}
                    onSelectionChange={setFruits}
                    maxSelections={3}
                    placeholder="Choose your favorite fruits..."
                    searchable={true}
                />
                <p className="text-xs text-gray-600 mt-1">Selected: {fruits.join(', ') || 'None'}</p>
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2">Select Colors (Controlled):</label>
                <MultiSelect
                    options={colorOptions}
                    selectedItems={colors}
                    onSelectionChange={setColors}
                    placeholder="Pick colors..."
                    allowReset={true}
                    resetButtonText="Reset Colors"
                />
                <p className="text-xs text-gray-600 mt-1">Selected: {colors.join(', ')}</p>
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2">Hair Quirks (Backward Compatible):</label>
                <HairQuirksSelector maxSelections={5} />
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2">Disabled Example:</label>
                <MultiSelect
                    options={['Option 1', 'Option 2', 'Option 3']}
                    selectedItems={['Option 1']}
                    disabled={true}
                    placeholder="This is disabled..."
                />
            </div>
        </div>
    );
}