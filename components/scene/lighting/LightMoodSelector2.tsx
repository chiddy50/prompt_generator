"use client"

import React, { useState } from 'react';
import { Sun, Navigation, Palette, Check, Sparkles } from 'lucide-react';

const MOODS = {
    INTENSITY: {
        SOFT: "Gentle, even lighting with soft shadows (like cloudy day)",
        HARD: "Dramatic lighting with sharp shadows (like noon sun)",
        MIXED: "Combination of soft and hard lighting in different areas"
    },
    DIRECTION: {
        FRONTAL: "Light from camera position (flat, even look)",
        SIDELIT: "Light from side (creates depth and texture)",
        BACKLIT: "Light from behind (silhouettes or glow effects)",
        TOPLIT: "Light from above (stylish downward shadows)",
        UNDERLIT: "Light from below (unnatural, creepy feeling)"
    },
    STYLE: {
        HIGH_KEY: "Bright, low-contrast (happy/commercial look)",
        LOW_KEY: "Dark, high-contrast (moody/dramatic look)",
        GOLDEN_HOUR: "Warm sunset-like glow (romantic/nostalgic)",
        COOL_BLUE: "Cold, technological feeling (night/sci-fi)"
    }
};

const LightMoodSelector2 = () => {
    const [selections, setSelections] = useState({});
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleSelection = (category, option) => {
        setSelections(prev => ({
            ...prev,
            [category]: option
        }));
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'INTENSITY': return <Sun className="w-5 h-5" />;
            case 'DIRECTION': return <Navigation className="w-5 h-5" />;
            case 'STYLE': return <Palette className="w-5 h-5" />;
            default: return <Sparkles className="w-5 h-5" />;
        }
    };

    const getCategoryGradient = (category) => {
        switch (category) {
            case 'INTENSITY': return 'from-amber-500 to-orange-600';
            case 'DIRECTION': return 'from-blue-500 to-indigo-600';
            case 'STYLE': return 'from-purple-500 to-pink-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    const getCategoryBg = (category) => {
        switch (category) {
            case 'INTENSITY': return 'bg-amber-50 border-amber-200';
            case 'DIRECTION': return 'bg-blue-50 border-blue-200';
            case 'STYLE': return 'bg-purple-50 border-purple-200';
            default: return 'bg-gray-50 border-gray-200';
        }
    };

    const getOptionColor = (category, option) => {
        const baseColors = {
            INTENSITY: 'amber',
            DIRECTION: 'blue',
            STYLE: 'purple'
        };

        const specialColors = {
            'INTENSITY_SOFT': 'emerald',
            'INTENSITY_HARD': 'red',
            'INTENSITY_MIXED': 'amber',
            'DIRECTION_FRONTAL': 'slate',
            'DIRECTION_SIDELIT': 'blue',
            'DIRECTION_BACKLIT': 'violet',
            'DIRECTION_TOPLIT': 'cyan',
            'DIRECTION_UNDERLIT': 'red',
            'STYLE_HIGH_KEY': 'yellow',
            'STYLE_LOW_KEY': 'gray',
            'STYLE_GOLDEN_HOUR': 'orange',
            'STYLE_COOL_BLUE': 'blue'
        };

        return specialColors[`${category}_${option}`] || baseColors[category] || 'gray';
    };

    const formatCategoryName = (category) => {
        return category.split('_').map(word =>
            word.charAt(0) + word.slice(1).toLowerCase()
        ).join(' ');
    };

    const formatOptionName = (option) => {
        return option.split('_').map(word =>
            word.charAt(0) + word.slice(1).toLowerCase()
        ).join(' ');
    };

    const getCompletionPercentage = () => {
        const totalCategories = Object.keys(MOODS).length;
        const selectedCategories = Object.keys(selections).length;
        return Math.round((selectedCategories / totalCategories) * 100);
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="p-4">

                {/* Header Section */}
                <div className="text-center mb-12">
                    {/* <div className="inline-flex items-center justify-center w-13 h-13 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div> */}
{/* 
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                        Light Mood
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Selector</span>
                    </h1> */}

                    {/* <p className="text-sm text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                        Define the perfect lighting atmosphere for your creative vision
                    </p> */}

                    {/* Progress Indicator */}
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-medium text-gray-700">Progress</span>
                            <span className="text-[11px] font-bold text-purple-600">{getCompletionPercentage()}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${getCompletionPercentage()}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-8">
                    {Object.entries(MOODS).map(([category, options]) => {
                        const selectedOption = selections[category];

                        return (
                            <div key={category} className="group">

                                {/* Category Header */}
                                <div className={`p-4 rounded-t-2xl border-2 ${getCategoryBg(category)} transition-all duration-300`}>
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryGradient(category)} shadow-lg`}>
                                            <div className="text-white">
                                                {getCategoryIcon(category)}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h2 className="text-md sm:text-xl font-bold text-gray-900 mb-1">
                                                {formatCategoryName(category)}
                                            </h2>
                                            <p className="text-gray-600 text-xs sm:text-sm">
                                                Choose your preferred {category.toLowerCase()} setting
                                            </p>
                                        </div>

                                        {selectedOption && (
                                            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                                                <Check className="w-4 h-4 text-green-500" />
                                                <span className="text-xs font-medium text-gray-700">Selected</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Options Grid */}
                                <div className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-white border-2 border-t-0 ${getCategoryBg(category)} rounded-b-2xl`}>
                                    {Object.entries(options).map(([option, description]) => {
                                        const isSelected = selectedOption === option;
                                        const colorScheme = getOptionColor(category, option);
                                        const cardKey = `${category}_${option}`;
                                        const isHovered = hoveredCard === cardKey;

                                        return (
                                            <button
                                                key={option}
                                                onClick={() => handleSelection(category, option)}
                                                onMouseEnter={() => setHoveredCard(cardKey)}
                                                onMouseLeave={() => setHoveredCard(null)}
                                                // bg-${colorScheme}-50 border-${colorScheme}-500 ring-${colorScheme}-200
                                                className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${isSelected
                                                        ? `border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200`
                                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                                    }`}
                                            >
                                                {/* Selection Indicator */}
                                                {isSelected && (
                                                    // bg-${colorScheme}-500
                                                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-lg`}>
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                )}

                                                {/* Option Title */}
                                                <h3 className={`text-md sm:text-md font-bold mb-1 transition-colors duration-300 ${isSelected ? `text-${colorScheme}-900` : 'text-gray-900'
                                                    }`}>
                                                    {formatOptionName(option)}
                                                </h3>

                                                {/* Description */}
                                                <p className={`text-xs sm:text-xs leading-relaxed transition-colors duration-300 ${isSelected ? `text-blue-700` : 'text-gray-600'
                                                    }`}>
                                                    {description}
                                                </p>

                                                {/* Hover Effect Overlay */}
                                                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${isHovered && !isSelected ? 'bg-gradient-to-br from-transparent to-gray-50 opacity-50' : 'opacity-0'
                                                    }`}></div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Selection Summary */}
                {Object.keys(selections).length > 0 && (
                    <div className="mt-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-6">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                                <Sparkles className="w-6 h-6 mr-3" />
                                Your Mood Selection
                            </h3>
                            <p className="text-gray-300 text-xs">
                                Perfect! Your lighting mood is taking shape
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                                {Object.entries(selections).map(([category, option]) => {
                                    const colorScheme = getOptionColor(category, option);

                                    return (
                                        <div key={category} className={`p-4 rounded-xl border-2 border-blue-200 bg-blue-50`}>
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className={`p-2 rounded-lg bg-blue-500`}>
                                                    <div className="text-white text-sm">
                                                        {getCategoryIcon(category)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={`text-xs font-bold text-blue-600 uppercase tracking-wider`}>
                                                        {formatCategoryName(category)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`text-lg font-bold text-blue-900 mb-1`}>
                                                {formatOptionName(option)}
                                            </div>
                                            <div className={`text-xs text-blue-700 leading-relaxed`}>
                                                {MOODS[category][option]}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => console.log('Applied mood selections:', selections)}
                                    className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:from-blue-700 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Apply Mood Settings
                                </button>
                                <button
                                    onClick={() => setSelections({})}
                                    className="px-8 py-4 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                                >
                                    Reset All
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LightMoodSelector2;