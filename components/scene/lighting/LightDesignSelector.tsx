"use client"

import React, { useState } from 'react';
import { Lightbulb, Palette, Settings, Eye } from 'lucide-react';

const DESIGNS = {
    TYPES: {
        STUDIO: [
            "Beauty dish + softbox combo",
            "Ring light + hair light",
            "LED panel grid with diffusion"
        ],
        NATURAL: [
            "Window light + bounce card",
            "Sunlight through curtains",
            "Dappled tree shadow effect"
        ],
        ARTISTIC: [
            "Gelled backlight + clean front light",
            "Neon tube lighting + hard key",
            "Projector pattern lighting"
        ],
        PRACTICAL: [
            "Table lamp + overhead light mix",
            "Candlelight + fireplace glow",
            "Computer monitor glow + room light"
        ]
    },
    QUALITY: {
        SHADOWS: [
            "Razor sharp shadows",
            "Soft blurred shadows",
            "Double shadows (from multiple lights)"
        ],
        FALLOFF: [
            "Quick falloff (light doesn't spread far)",
            "Gradual falloff (soft transition to dark)",
            "Even illumination (no falloff)"
        ],
        DIFFUSION: [
            "Bare bulb (harsh light)",
            "Through diffusion material (soft light)",
            "Bounced light (indirect illumination)"
        ]
    },
    COLOR: {
        TEMPERATURE: [
            "Warm orange (like candlelight)",
            "Cool blue (like moonlight)",
            "Neutral white (like office lights)"
        ],
        CREATIVE: [
            "Teal and orange complementary colors",
            "Monochromatic single-color wash",
            "RGB dynamic color changing",
            "Split-toning (warm lights/cool shadows)"
        ],
        SOURCES: [
            "Tungsten (warm bulbs)",
            "Fluorescent (cool tubes)",
            "LED (adjustable color)",
            "Natural (sunlight color changes)"
        ]
    }
};

const LightDesignSelector = () => {
    const [selections, setSelections] = useState({});
    const [activeCategory, setActiveCategory] = useState('TYPES');

    const handleSelection = (category, subcategory, option) => {
        const key = `${category}_${subcategory}`;
        setSelections(prev => {
            const newSelections = { ...prev };
            if (newSelections[key] === option) {
                delete newSelections[key];
            } else {
                newSelections[key] = option;
            }
            return newSelections;
        });
    };

    const getIconForCategory = (category) => {
        switch (category) {
            case 'TYPES': return <Lightbulb className="w-5 h-5" />;
            case 'QUALITY': return <Settings className="w-5 h-5" />;
            case 'COLOR': return <Palette className="w-5 h-5" />;
            default: return <Eye className="w-5 h-5" />;
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'TYPES': return 'blue';
            case 'QUALITY': return 'purple';
            case 'COLOR': return 'orange';
            default: return 'gray';
        }
    };

    const formatCategoryName = (name) => {
        return name.charAt(0) + name.slice(1).toLowerCase();
    };

    const formatSubcategoryName = (name) => {
        return name.split('_').map(word =>
            word.charAt(0) + word.slice(1).toLowerCase()
        ).join(' ');
    };

    const getSelectedCount = () => {
        return Object.keys(selections).length;
    };

    return (
        <div className="bg-white mt-5">
            <div className="mb-8">
                {/* <h1 className="text-xl font-bold text-gray-900 mb-2">Light Design Selector</h1> */}
                {/* <p className="text-gray-600">Choose your perfect lighting setup from professional options</p> */}
                {getSelectedCount() > 0 && (
                    <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-lg inline-block">
                        {getSelectedCount()} selection{getSelectedCount() !== 1 ? 's' : ''} made
                    </div>
                )}
            </div>

            {/* Category Navigation */}
            <div className="flex space-x-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
                {Object.keys(DESIGNS).map((category) => {
                    const color = getCategoryColor(category);
                    const isActive = activeCategory === category;

                    return (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`flex items-center space-x-2 px-4 py-3 text-[11px] rounded-lg font-medium transition-all duration-200 ${isActive
                                ? `bg-${color}-500 text-white shadow-lg transform scale-105`
                                : `text-gray-600 hover:bg-${color}-50 hover:text-${color}-600`
                                }`}
                        >
                            {getIconForCategory(category)}
                            <span>{formatCategoryName(category)}</span>
                        </button>
                    );
                })}
            </div>

            {/* Active Category Content */}
            <div className="space-y-8">
                {Object.entries(DESIGNS[activeCategory]).map(([subcategory, options]) => {
                    const categoryColor = getCategoryColor(activeCategory);
                    const selectedOption = selections[`${activeCategory}_${subcategory}`];

                    return (
                        <div key={subcategory} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className={`bg-${categoryColor}-50 px-6 py-4 border-b border-${categoryColor}-100`}>
                                <h3 className={`text-md font-semibold text-${categoryColor}-900`}>
                                    {formatSubcategoryName(subcategory)}
                                </h3>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                                    {options.map((option, index) => {
                                        const isSelected = selectedOption === option;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleSelection(activeCategory, subcategory, option)}
                                                className={`text-left text-xs p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${isSelected
                                                    ? `border-${categoryColor}-500 bg-${categoryColor}-50 shadow-lg transform scale-105`
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <span className={`text-xs font-medium ${isSelected ? `text-${categoryColor}-800` : 'text-gray-700'
                                                        }`}>
                                                        {option}
                                                    </span>
                                                    {isSelected && (
                                                        <div className={`w-3 h-3 rounded-full bg-${categoryColor}-500 flex-shrink-0 ml-2 mt-0.5`}></div>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Selection Summary */}
            {Object.keys(selections).length > 0 && (
                <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Your Light Design Selection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {Object.entries(selections).map(([key, value]) => {
                            const [category, subcategory] = key.split('_');
                            const color = getCategoryColor(category);

                            return (
                                <div key={key} className={`p-4 rounded-lg bg-${color}-50 border border-${color}-200 relative`}>
                                    <div className={`text-xs font-semibold text-${color}-600 uppercase tracking-wide mb-1`}>
                                        {formatCategoryName(category)} • {formatSubcategoryName(subcategory)}
                                    </div>
                                    <div className={`text-xs font-medium text-${color}-900`}>
                                        {value}
                                    </div>
                                    <button
                                        onClick={() =>
                                            setSelections(prev => {
                                                const newSelections = { ...prev };
                                                delete newSelections[key];
                                                return newSelections;
                                            })}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    >
                                        ×
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={() => console.log('Selected designs:', selections)}
                            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                        >
                            Apply Selection
                        </button>
                        <button
                            onClick={() => setSelections({})}
                            className="ml-3 text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LightDesignSelector;