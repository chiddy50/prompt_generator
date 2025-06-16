"use client"

import { Trash2, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

interface SingleSelectCategorySelectorProps<T extends Record<string, string[]>> {
    options: T;
    categoryLabels?: Partial<Record<keyof T, string>>;
    onSelect?: (category: keyof T, option: string) => void;
    onRemove?: (category: keyof T) => void;
    selectedOption?: { category: keyof T; value: string } | null;
    className?: string;
    placeholder?: string;
    title?: string;
}

function SingleSelectCategorySelector<T extends Record<string, string[]>>({
    options,
    categoryLabels = {},
    onSelect,
    onRemove,
    selectedOption = null,
    className = '',
    placeholder = 'Select a feature...',
    title = 'Categories'
}: SingleSelectCategorySelectorProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<keyof T | null>(null);
    const [internalSelection, setInternalSelection] = useState<{ category: keyof T; value: string } | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Use internal state if no external handlers provided
    const effectiveSelection = selectedOption !== undefined ? selectedOption : internalSelection;
    const categories = Object.keys(options) as (keyof T)[];

    // Helper function to format category labels
    const getCategoryLabel = useCallback((category: keyof T): string => {
        if (categoryLabels[category]) {
            return categoryLabels[category] as string;
        }
        // Convert camelCase to readable format
        const categoryStr = String(category);
        return categoryStr
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }, [categoryLabels]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setCurrentCategory(null);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Auto-select first category when dropdown opens
    useEffect(() => {
        if (isOpen && !currentCategory && categories.length > 0) {
            setCurrentCategory(categories[0]);
        }
    }, [isOpen, currentCategory, categories]);

    // Event handlers
    const handleToggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleCategorySelect = useCallback((category: keyof T) => {
        setCurrentCategory(category);
    }, []);

    const handleOptionSelect = useCallback((option: string) => {
        if (!currentCategory) return;
        
        if (onSelect) {
            onSelect(currentCategory, option);
        } else {
            setInternalSelection({ category: currentCategory, value: option });
        }
        // Keep dropdown open as per requirement
    }, [currentCategory, onSelect]);

    const handleRemoveSelection = useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (!effectiveSelection) return;

        if (onRemove) {
            onRemove(effectiveSelection.category);
        } else {
            setInternalSelection(null);
        }
    }, [effectiveSelection, onRemove]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    }, []);

    // Render functions
    const renderSelectedOption = () => {
        if (!effectiveSelection) return null;

        return (
            <div className="flex items-center">
                <span className="inline-flex capitalize items-center gap-1 px-3 py-1 text-[10px] bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                    <span className="font-medium">
                        {getCategoryLabel(effectiveSelection.category)}:
                    </span>
                    <span>{effectiveSelection.value}</span>
                    <span
                        onClick={handleRemoveSelection}
                        onKeyDown={(e) => handleKeyDown(e, () => handleRemoveSelection(e))}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-300"
                        title={`Remove ${effectiveSelection.value}`}
                        aria-label={`Remove ${effectiveSelection.value}`}
                        role="button"
                        tabIndex={0}
                    >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path 
                                fillRule="evenodd" 
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </span>
                </span>
            </div>
        );
    };

    const renderCategoryButton = (category: keyof T) => {
        const isSelected = currentCategory === category;
        const hasSelection = effectiveSelection?.category === category;

        return (
            <button
                key={String(category)}
                onClick={() => handleCategorySelect(category)}
                className={`w-full px-3 py-2 text-left text-xs rounded-md mb-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    isSelected
                        ? 'bg-blue-100 text-blue-800 font-medium border border-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
                <div className="flex capitalize items-center justify-between">
                    <span>{getCategoryLabel(category)}</span>
                    {hasSelection && (
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-xs text-blue-600">✓</span>
                        </div>
                    )}
                </div>
            </button>
        );
    };

    const renderOptionButton = (option: string) => {
        const isSelected = effectiveSelection?.category === currentCategory && 
                          effectiveSelection?.value === option;

        return (
            <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={`w-full px-3 py-2 text-left text-xs rounded-md mb-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    isSelected
                        ? 'bg-blue-100 text-blue-800 border border-blue-200 font-medium'
                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-800'
                }`}
            >
                <div className="flex items-center capitalize justify-between">
                    <span>{option}</span>
                    {isSelected && <span className="text-blue-600">✓</span>}
                </div>
            </button>
        );
    };

    const renderEmptyState = () => (
        <div className="flex items-center justify-center h-full text-gray-500 text-xs">
            <div className="text-center">
                <svg 
                    className="w-8 h-8 mx-auto mb-2 text-gray-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                </svg>
                <p>Select a category to view options</p>
            </div>
        </div>
    );

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
            {/* Main trigger button */}
            <button
                onClick={handleToggleDropdown}
                className="w-full px-4 py-2 text-left text-xs bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        {effectiveSelection ? (
                            renderSelectedOption()
                        ) : (
                            <span className="text-gray-500">{placeholder}</span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-2">
                        {effectiveSelection && (
                            <span
                                onClick={handleRemoveSelection}
                                onKeyDown={(e) => handleKeyDown(e, () => handleRemoveSelection(e))}
                                className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-red-300 cursor-pointer"
                                title="Clear selection"
                                aria-label="Clear selection"
                                role="button"
                                tabIndex={0}
                            >
                                <Trash2 size={12} />
                            </span>
                        )}
                        <ChevronDown 
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                            }`} 
                        />
                    </div>
                </div>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl">
                    <div className="flex h-72 overflow-hidden">
                        {/* Category sidebar */}
                        <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-gray-50">
                            <div className="p-2">
                                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 px-2">
                                    {title}
                                </h4>
                                {categories.map(renderCategoryButton)}
                            </div>
                        </div>

                        {/* Options panel */}
                        <div className="w-2/3 overflow-y-auto">
                            {currentCategory ? (
                                <div>
                                    {/* Sticky header */}
                                    <div className="sticky top-0 px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
                                        <div className="flex capitalize items-center justify-between">
                                            <h3 className="font-bold text-sm text-gray-800">
                                                {getCategoryLabel(currentCategory)}
                                            </h3>
                                            {effectiveSelection?.category === currentCategory && (
                                                <span
                                                    onClick={() => {
                                                        if (onRemove) {
                                                            onRemove(currentCategory);
                                                        } else {
                                                            setInternalSelection(null);
                                                        }
                                                    }}
                                                    className="text-xs capitalize text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-red-300 cursor-pointer"
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            if (onRemove) {
                                                                onRemove(currentCategory);
                                                            } else {
                                                                setInternalSelection(null);
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Remove current
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Options list */}
                                    <div className="p-2">
                                        {options[currentCategory].map(renderOptionButton)}
                                    </div>
                                </div>
                            ) : (
                                renderEmptyState()
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleSelectCategorySelector;