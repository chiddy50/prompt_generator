"use client"

import { useState } from 'react';
import type { ReactNode } from 'react';

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
} as const;

type MoodCategory = keyof typeof MOODS;
type MoodValue<T extends MoodCategory> = keyof typeof MOODS[T];

export default function LightMoodSelector({
    onSelectionChange
}: {
    onSelectionChange: (selections: Record<MoodCategory, string | null>) => void
}) {
    const [activeCategory, setActiveCategory] = useState<MoodCategory>('INTENSITY');
    const [selections, setSelections] = useState<Record<MoodCategory, string | null>>({
        INTENSITY: null,
        DIRECTION: null,
        STYLE: null
    });

    const handleSelect = (category: MoodCategory, value: string) => {
        const newSelections = {
            ...selections,
            [category]: selections[category] === value ? null : value
        };
        setSelections(newSelections);
        onSelectionChange(newSelections);
    };

    const getIconForMood = (category: MoodCategory, value: string): ReactNode => {
        const baseClasses = "w-5 h-5 mr-2";

        switch (value) {
            case 'SOFT':
                return <CloudIcon className={`${baseClasses} text-blue-300`} />;
            case 'HARD':
                return <SunIcon className={`${baseClasses} text-yellow-400`} />;
            case 'FRONTAL':
                return <FrontCameraIcon className={`${baseClasses} text-gray-300`} />;
            case 'SIDELIT':
                return <SideLightIcon className={`${baseClasses} text-orange-400`} />;
            case 'GOLDEN_HOUR':
                return <SunsetIcon className={`${baseClasses} text-amber-500`} />;
            case 'COOL_BLUE':
                return <SnowflakeIcon className={`${baseClasses} text-cyan-400`} />;
            default:
                return <LightBulbIcon className={`${baseClasses} text-purple-400`} />;
        }
    };

    return (
        <div className=" bg-gray-900 rounded-xl overflow-hidden">
            {/* Category Selector */}
            <div className="flex border-b border-gray-700">
                {Object.keys(MOODS).map((category) => (
                    <button
                        key={category}
                        className={`flex-1 py-3 px-4 text-xs font-medium transition-colors ${activeCategory === category ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveCategory(category as MoodCategory)}
                    >
                        {category.charAt(0) + category.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>

            {/* Mood Options */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                    {activeCategory.replace(/_/g, ' ')}
                </h3>

                <div className="space-y-2">
                    {Object.entries(MOODS[activeCategory]).map(([key, description]) => (
                        <button
                            key={key}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-start ${selections[activeCategory] === key ? 'bg-blue-900/50 ring-2 ring-blue-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                            onClick={() => handleSelect(activeCategory, key)}
                        >
                            {getIconForMood(activeCategory, key)}
                            <div>
                                <div className="font-medium text-white capitalize">
                                    {key.replace(/_/g, ' ')}
                                </div>
                                <div className="text-xs text-gray-300 mt-1">
                                    {description}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Moods Preview */}
            <div className="p-4 bg-gray-800/50 border-t border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Current Mood Selection:</h4>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(selections).map(([category, value]) => (
                        value && (
                            <div key={`${category}-${value}`} className="bg-gray-700/50 px-3 py-1 rounded-full text-xs flex items-center">
                                <span className="text-blue-300 mr-1">
                                    {category.charAt(0)}
                                </span>
                                <span className="text-white">
                                    {value.replace(/_/g, ' ').toLowerCase()}
                                </span>
                            </div>
                        )
                    ))}
                    {Object.values(selections).every(v => !v) && (
                        <div className="text-gray-400 text-sm">No moods selected yet</div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Example icons (you would replace with actual icon components)
function CloudIcon({ className }: { className: string }) {
    return <div className={className}>☁️</div>;
}
function SunIcon({ className }: { className: string }) {
    return <div className={className}>☀️</div>;
}
function FrontCameraIcon({ className }: { className: string }) {
    return <div className={className}>📷</div>;
}
function SideLightIcon({ className }: { className: string }) {
    return <div className={className}>💡</div>;
}
function SunsetIcon({ className }: { className: string }) {
    return <div className={className}>🌅</div>;
}
function SnowflakeIcon({ className }: { className: string }) {
    return <div className={className}>❄️</div>;
}
function LightBulbIcon({ className }: { className: string }) {
    return <div className={className}>💡</div>;
}