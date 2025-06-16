"use client"
import React, { useState } from 'react';

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

function GenericMultiSelect<T extends Record<string, string[]>>({
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

    // Auto-select first category when dropdown opens
    React.useEffect(() => {
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
        if (onRemove) {
            onRemove(category, option);
        } else {
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
        <div className={`relative w-full max-w-4xl ${className}`}>
            {/* Main button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={totalSelected >= maxSelections}
                className={`w-full px-4 py-2 text-xs text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none transition-colors ${totalSelected >= maxSelections ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
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
                                        className={`w-full px-3 py-2 text-left text-xs rounded-md mb-1 transition-colors ${currentCategory === category
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
                                                className={`p-2 text-left rounded text-xs flex items-start transition-colors ${isOptionSelected(currentCategory, option)
                                                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-800'
                                                    } ${!isOptionSelected(currentCategory, option) &&
                                                        totalSelected >= maxSelections
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : ''
                                                    }`}
                                            >
                                                <span
                                                    className={`flex items-center justify-center w-4 h-4 mt-0.5 mr-2 border rounded-sm flex-shrink-0 transition-colors ${isOptionSelected(currentCategory, option)
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

// Character creation demo
export default function CharacterCreator() {
    // Props data
    const props = {
        bags: [
            "Handbag", "Purse", "Clutch", "Tote bag", "Shoulder bag",
            "Crossbody bag", "Backpack", "Messenger bag", "Briefcase",
            "Satchel", "Duffle bag", "Gym bag", "Laptop bag"
        ],
        accessories: [
            "Belt", "Suspenders", "Pocket square", "Handkerchief", "Wallet",
            "Phone case", "Keys", "Umbrella", "Walking stick", "Cane"
        ],
        tech: [
            "Smartphone", "Tablet", "Laptop", "Headphones", "Earbuds",
            "Smart watch", "Fitness tracker", "Camera"
        ],
        cultural: [
            "Prayer beads", "Fan", "Cultural staff", "Traditional bag",
            "Ceremonial items", "Cultural symbols"
        ]
    };

    // Poses data - organized by category
    const poses = {
        general: [
            "Heroic stance", "Confident stand", "Casual lean", "Arms crossed",
            "Hands on hips", "At attention", "Slouched posture", "Weight on one leg",
            "Sitting upright", "Lounging casually", "Perched on edge", "Legs crossed",
            "Knees drawn up", "Sitting backwards on chair", "Side-saddle sit", "Lotus position"
        ],
        action: [
            "Mid-stride walk", "Running pose", "Jumping mid-air", "Dodging attack",
            "Swinging weapon", "Casting spell", "Drawing bow", "Throwing object"
        ],
        combat: [
            "Battle-ready stance", "Defensive guard", "Wounded stance", "Victorious pose",
            "Defeated kneeling", "Last stand", "Sneak attack pose", "Counter-attack windup"
        ],
        emotional: [
            "Celebratory cheer", "Despair crouch", "Thoughtful chin rub", "Angry fist clench",
            "Shocked recoil", "Joyful leap", "Nervous fidget", "Bored slouch"
        ],
        interaction: [
            "Pointing forward", "Reaching out", "Helping hand extended", "Carrying object",
            "Pushing/pulling", "Hugging self", "Handshake moment", "Covering face"
        ],
        relaxed: [
            "Lying on back", "Sideways lounge", "Stretching arms up", "Yawning pose",
            "Reading pose", "Looking at phone", "Resting head on hand", "Sleeping position"
        ],
        fantasy: [
            "Channeling magic", "Riding mythical creature", "Summoning pose",
            "Floating meditation", "Dragon taming stance", "Wings spread wide", "Shadow merging"
        ],
        scifi: [
            "Hologram interaction", "Zero-g float", "Piloting controls", "Wielding energy weapon",
            "Cybernetic enhancement activation", "Scanning with device", "Hacking terminal", "Dodging laser fire"
        ]
    };

    const [selectedProps, setSelectedProps] = useState({});
    const [selectedPoses, setSelectedPoses] = useState({});

    const handlePropSelect = (category, item) => {
        setSelectedProps(prev => {
            const currentItems = prev[category] || [];
            const isSelected = currentItems.includes(item);

            return {
                ...prev,
                [category]: isSelected
                    ? currentItems.filter(i => i !== item)
                    : [...currentItems, item]
            };
        });
    };

    const handlePropRemove = (category, item) => {
        setSelectedProps(prev => ({
            ...prev,
            [category]: (prev[category] || []).filter(i => i !== item)
        }));
    };

    const handlePoseSelect = (category, pose) => {
        setSelectedPoses(prev => {
            // For poses, only allow one selection at a time
            return { [category]: [pose] };
        });
    };

    const handlePoseRemove = (category, pose) => {
        setSelectedPoses(prev => ({
            ...prev,
            [category]: (prev[category] || []).filter(p => p !== pose)
        }));
    };

    const clearAll = () => {
        setSelectedProps({});
        setSelectedPoses({});
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Character Creator</h1>
                <p className="text-gray-600">Select props and poses to create your perfect character</p>
            </div>

            {/* Props Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Character Props</h2>
                    <span className="text-sm text-gray-500">
                        Multiple selections allowed
                    </span>
                </div>
                <GenericMultiSelect
                    options={props}
                    selectedOptions={selectedProps}
                    onSelect={handlePropSelect}
                    onRemove={handlePropRemove}
                    title="Props"
                    placeholder="Select character props..."
                    gridCols={2}
                />
            </div>

            {/* Poses Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Character Pose</h2>
                    <span className="text-sm text-gray-500">
                        One pose at a time
                    </span>
                </div>
                <GenericMultiSelect
                    options={poses}
                    selectedOptions={selectedPoses}
                    onSelect={handlePoseSelect}
                    onRemove={handlePoseRemove}
                    title="Pose Categories"
                    placeholder="Select character pose..."
                    maxSelections={1}
                    gridCols={1}
                    categoryLabels={{
                        general: "General Poses",
                        action: "Action Poses",
                        combat: "Combat Poses",
                        emotional: "Emotional Poses",
                        interaction: "Interaction Poses",
                        relaxed: "Relaxed Poses",
                        fantasy: "Fantasy Poses",
                        scifi: "Sci-Fi Poses"
                    }}
                />
            </div>

            {/* Character Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Character Summary</h2>
                    {(Object.keys(selectedProps).length > 0 || Object.keys(selectedPoses).length > 0) && (
                        <button
                            onClick={clearAll}
                            className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Selected Props */}
                    <div>
                        <h3 className="font-medium text-gray-700 mb-3">Selected Props</h3>
                        {Object.keys(selectedProps).length > 0 ? (
                            <div className="space-y-2">
                                {Object.entries(selectedProps).map(([category, items]) =>
                                    items?.length > 0 && (
                                        <div key={category} className="bg-blue-50 p-3 rounded-md">
                                            <div className="font-medium text-blue-800 text-sm capitalize mb-1">
                                                {category}
                                            </div>
                                            <div className="text-sm text-blue-700">
                                                {items.join(', ')}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No props selected</p>
                        )}
                    </div>

                    {/* Selected Pose */}
                    <div>
                        <h3 className="font-medium text-gray-700 mb-3">Selected Pose</h3>
                        {Object.keys(selectedPoses).length > 0 ? (
                            <div className="space-y-2">
                                {Object.entries(selectedPoses).map(([category, poses]) =>
                                    poses?.length > 0 && (
                                        <div key={category} className="bg-green-50 p-3 rounded-md">
                                            <div className="font-medium text-green-800 text-sm capitalize mb-1">
                                                {category.charAt(0).toUpperCase() + category.slice(1)} Pose
                                            </div>
                                            <div className="text-sm text-green-700">
                                                {poses[0]}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No pose selected</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}