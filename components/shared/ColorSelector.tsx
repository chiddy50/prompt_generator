"use client"

import React, { useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface CategoryData {
    [key: string]: string[];
}

// Color Selector Component
const ColorSelector: React.FC<{
    colors: CategoryData;
    selectedColor: string;
    onColorChange: (color: string) => void;
}> = ({ colors, selectedColor, onColorChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getColorStyle = (colorName: string): React.CSSProperties => {
        const colorMap: { [key: string]: string } = {
            // Basic colors
            'Black': '#000000', 'White': '#FFFFFF', 'Gray': '#808080', 'Brown': '#8B4513',
            'Beige': '#F5F5DC', 'Cream': '#FFFDD0', 'Ivory': '#FFFFF0', 'Nude': '#E3BC9A',

            // Warm colors
            'Red': '#FF0000', 'Crimson': '#DC143C', 'Burgundy': '#800020', 'Maroon': '#800000',
            'Pink': '#FFC0CB', 'Rose': '#FF66CC', 'Coral': '#FF7F50', 'Orange': '#FFA500',
            'Peach': '#FFCBA4', 'Apricot': '#FBCEB1', 'Yellow': '#FFFF00', 'Gold': '#FFD700',
            'Amber': '#FFBF00', 'Mustard': '#FFDB58',

            // Cool colors
            'Blue': '#0000FF', 'Navy': '#000080', 'Sky Blue': '#87CEEB', 'Teal': '#008080',
            'Turquoise': '#40E0D0', 'Cyan': '#00FFFF', 'Green': '#008000', 'Forest Green': '#228B22',
            'Emerald': '#50C878', 'Mint': '#98FB98', 'Sage': '#9CAF88', 'Olive': '#808000',
            'Purple': '#800080', 'Violet': '#8A2BE2', 'Lavender': '#E6E6FA', 'Indigo': '#4B0082',
            'Magenta': '#FF00FF', 'Plum': '#8E4585',

            // Metallic
            'Silver': '#C0C0C0', 'Bronze': '#CD7F32', 'Copper': '#B87333', 'Rose Gold': '#E8B4A0',
            'Platinum': '#E5E4E2', 'Pearl': '#F8F6F0', 'Iridescent': '#FF00FF', 'Holographic': '#00FFFF',
            'Metallic Black': '#1C1C1C', 'Metallic White': '#F8F8FF',

            // Earth
            'Khaki': '#C3B091', 'Tan': '#D2B48C', 'Camel': '#C19A6B', 'Rust': '#B7410E',
            'Terra Cotta': '#E2725B', 'Sienna': '#A0522D', 'Chocolate': '#D2691E',
            'Espresso': '#3C2415', 'Mocha': '#967117', 'Sand': '#C2B280', 'Stone': '#8D8D8D',
            'Clay': '#B66A50'
        };

        return { backgroundColor: colorMap[colorName] || '#CCCCCC' };
    };

    const handleColorSelect = (color: string) => {
        onColorChange(color);
        setIsOpen(false);
    };

    const handleClearColor = (event: React.MouseEvent) => {
        event.stopPropagation();
        onColorChange('');
    };

    const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };

    return (
        <div className="relative">
            {/* Color Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs">
                        <div
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={selectedColor ? getColorStyle(selectedColor) : { backgroundColor: '#f3f4f6' }}
                        />
                        <span className={selectedColor ? 'text-gray-900' : 'text-gray-500'}>
                            {selectedColor || 'Select a color'}
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {selectedColor && (
                            <span
                                onClick={handleClearColor}
                                onKeyDown={(e) => handleKeyDown(e, () => handleClearColor(e))}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-200"
                                title="Clear color selection"
                                aria-label="Clear color selection"
                                role="button"
                                tabIndex={0}
                            >
                                <X className="h-4 w-4" />
                            </span>
                        )}
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </button>

            {/* Color Dropdown */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    <div className="p-3">
                        {/* Clear option at the top */}
                        {selectedColor && (
                            <div className="mb-4 pb-3 border-b border-gray-200">
                                <button
                                    onClick={() => {
                                        onColorChange('');
                                        setIsOpen(false);
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                                >
                                    <div className="flex items-center space-x-2">
                                        <X className="h-4 w-4" />
                                        <span>Clear selection</span>
                                    </div>
                                </button>
                            </div>
                        )}
                        
                        {Object.entries(colors).map(([categoryKey, colorList]) => (
                            <div key={categoryKey} className="mb-4 last:mb-0">
                                <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                                    {categoryKey.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                    {colorList.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleColorSelect(color)}
                                            className={`group relative w-full aspect-square rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-200 ${selectedColor === color
                                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            style={getColorStyle(color)}
                                            title={color}
                                        >
                                            {selectedColor === color && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Check className="h-4 w-4 text-white drop-shadow-lg" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorSelector;