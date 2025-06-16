"use client"

import { useState, useRef, useEffect, useCallback } from 'react';

// Generic types for the component
type CategoryData = Record<string, string[]>;
type CategoryKey<T extends CategoryData> = keyof T;
type OptionValue<T extends CategoryData> = T[CategoryKey<T>][number];
type SelectedOptions<T extends CategoryData> = Partial<Record<CategoryKey<T>, OptionValue<T>[]>>;

interface MultipleCategorySelectorProps<T extends CategoryData> {
    data: T;
    categoryLabels?: Partial<Record<CategoryKey<T>, string>>;
    onSelectionChange: (selectedOptions: SelectedOptions<T>) => void;
    placeholder?: string;
    className?: string;
    maxHeight?: string;
    allowClear?: boolean;
    state?: SelectedOptions<T>; // New prop for initial state
}

export default function MultipleCategorySelector<T extends CategoryData>({
    data,
    categoryLabels = {},
    onSelectionChange,
    placeholder = "Select options...",
    className = "",
    maxHeight = "h-96",
    allowClear = true,
    state = {} // Default to empty object
}: MultipleCategorySelectorProps<T>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<CategoryKey<T> | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions<T>>(state);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize state on mount if state prop is provided
    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setSelectedOptions(state);
        }
    }, []); // Empty dependency array to run only on mount

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

    // Notify parent of selection changes
    useEffect(() => {
        onSelectionChange(selectedOptions);
    }, [selectedOptions, onSelectionChange]);

    const handleCategorySelect = useCallback((category: CategoryKey<T>) => {
        setCurrentCategory(category);
    }, []);

    const handleOptionToggle = useCallback((category: CategoryKey<T>, option: OptionValue<T>) => {
        setSelectedOptions(prev => {
            const categoryOptions = prev[category] || [];
            const isSelected = categoryOptions.includes(option);

            if (isSelected) {
                // Remove option
                const newOptions = categoryOptions.filter(item => item !== option);
                if (newOptions.length === 0) {
                    const { [category]: removed, ...rest } = prev;
                    return rest;
                }
                return { ...prev, [category]: newOptions };
            } else {
                // Add option
                return { ...prev, [category]: [...categoryOptions, option] };
            }
        });
    }, []);

    const handleClearAll = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedOptions({});
        setCurrentCategory(null);
    }, []);

    const handleClearCategory = useCallback((category: CategoryKey<T>, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedOptions(prev => {
            const { [category]: removed, ...rest } = prev;
            return rest;
        });
    }, []);

    const isOptionSelected = useCallback((category: CategoryKey<T>, option: OptionValue<T>) => {
        return selectedOptions[category]?.includes(option) || false;
    }, [selectedOptions]);

    const getCategoryLabel = useCallback((category: CategoryKey<T>) => {
        return categoryLabels[category] || String(category);
    }, [categoryLabels]);

    const countSelectedInCategory = useCallback((category: CategoryKey<T>) => {
        return selectedOptions[category]?.length || 0;
    }, [selectedOptions]);

    const getTotalSelectedCount = useCallback(() => {
        return Object.values(selectedOptions).reduce((total, options) => total + (options?.length || 0), 0);
    }, [selectedOptions]);

    const getSelectedOptionsFlat = useCallback(() => {
        return Object.entries(selectedOptions).flatMap(([category, options]) =>
            (options as OptionValue<T>[])?.map(option => ({ category: category as CategoryKey<T>, option })) || []
        );
    }, [selectedOptions]);

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-left bg-white border text-xs border-gray-300 rounded-md shadow-sm focus:outline-none flex items-center justify-between"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex-1 min-w-0">
                    {getTotalSelectedCount() > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {getSelectedOptionsFlat().slice(0, 3).map(({ category, option }) => (
                                <span
                                    key={`${String(category)}-${option}`}
                                    className="inline-flex items-center px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full"
                                >
                                    <span className="truncate max-w-20">{option}</span>
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOptionToggle(category, option);
                                        }}
                                        className="ml-1 hover:text-blue-600 cursor-pointer"
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Remove ${option}`}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleOptionToggle(category, option);
                                            }
                                        }}
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </span>
                            ))}
                            {getTotalSelectedCount() > 3 && (
                                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                                    +{getTotalSelectedCount() - 3} more
                                </span>
                            )}
                        </div>
                    ) : (
                        <span className="text-gray-500">{placeholder}</span>
                    )}
                </div>

                <div className="flex items-center ml-2 gap-2">
                    {allowClear && getTotalSelectedCount() > 0 && (
                        <span
                            onClick={handleClearAll}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-label="Clear all selections"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleClearAll(e as any);
                                }
                            }}
                        >
                            <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    )}

                    <svg
                        className={`w-5 h-5 transition-transform duration-200 text-gray-400 ${isOpen ? 'transform rotate-180' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {/* Clear all button at the top */}
                    {allowClear && getTotalSelectedCount() > 0 && (
                        <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                            <span
                                onClick={handleClearAll}
                                className="text-sm text-red-600 hover:text-red-800 font-medium cursor-pointer"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleClearAll(e as any);
                                    }
                                }}
                            >
                                Clear All ({getTotalSelectedCount()})
                            </span>
                        </div>
                    )}

                    <div className={`flex ${maxHeight} overflow-hidden`}>
                        {/* Category sidebar */}
                        <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-gray-50">
                            {Object.keys(data).map((category) => {
                                const categoryKey = category as CategoryKey<T>;
                                const selectedCount = countSelectedInCategory(categoryKey);

                                return (
                                    <div key={String(category)} className="relative">
                                        <button
                                            onClick={() => handleCategorySelect(categoryKey)}
                                            className={`w-full px-4 py-3 text-left text-xs flex justify-between items-center group ${currentCategory === category
                                                    ? 'bg-blue-100 text-blue-800 font-medium'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <span className="capitalize">{getCategoryLabel(categoryKey)}</span>
                                            <div className="flex items-center gap-2">
                                                {selectedCount > 0 && (
                                                    <>
                                                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                            {selectedCount}
                                                        </span>
                                                        {allowClear && (
                                                            <span
                                                                onClick={(e) => handleClearCategory(categoryKey, e)}
                                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-full transition-all cursor-pointer"
                                                                role="button"
                                                                tabIndex={0}
                                                                aria-label={`Clear ${getCategoryLabel(categoryKey)}`}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                                        e.preventDefault();
                                                                        handleClearCategory(categoryKey, e as any);
                                                                    }
                                                                }}
                                                            >
                                                                <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Options panel */}
                        <div className="w-2/3 overflow-y-auto">
                            {currentCategory ? (
                                <div>
                                    <div className="sticky top-0 px-4 py-3 bg-gray-50 border-b border-gray-200">
                                        <h3 className="font-bold text-sm capitalize">{getCategoryLabel(currentCategory)}</h3>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {data[currentCategory].map((option) => {
                                            const isSelected = isOptionSelected(currentCategory, option);

                                            return (
                                                <button
                                                    key={option}
                                                    onClick={() => handleOptionToggle(currentCategory, option)}
                                                    className={`w-full px-4 py-3 text-left text-xs flex items-center hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50 text-blue-800' : ''
                                                        }`}
                                                >
                                                    <span className={`w-4 h-4 flex items-center justify-center mr-3 border rounded-sm transition-colors ${isSelected
                                                            ? 'bg-blue-500 border-blue-500'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                        }`}>
                                                        {isSelected && (
                                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                    <span className="capitalize">{option}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                    Select a category to view options
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}