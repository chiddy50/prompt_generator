"use client"

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const CINEMATIC_MOODS = {
    INTENSITY: {
        SOFT: "Gentle, diffused lighting with gradual shadows",
        HARD: "Sharp, directional lighting with defined shadows",
        MIXED: "Controlled contrast with both soft and hard elements",
        CHIAROSCURO: "Extreme contrast between light and dark areas"
    },
    DIRECTION: {
        FRONTAL: "Flat illumination minimizing texture",
        SIDELIT: "Reveals texture and creates volume",
        BACKLIT: "Creates silhouettes or rim lighting",
        TOPLIT: "Dramatic downward shadows",
        UNDERLIT: "Unnatural upward shadows"
    },
    EMOTION: {
        ROMANTIC: "Warm, soft with gentle falloff",
        MENACING: "Harsh, unpredictable shadows",
        CLINICAL: "Even, shadowless illumination",
        MYSTERIOUS: "Partial illumination with pools of light"
    },
    COLOR_TEMPERATURE: {
        TUNGSTEN: "Warm orange (3200K - indoor bulbs)",
        DAYLIGHT: "Cool blue (5600K - natural sun)",
        TEAL_ORANGE: "Cinematic complementary scheme",
        MONOCHROMATIC: "Single hue variation"
    },
    DYNAMICS: {
        STATIC: "Consistent unchanging light",
        FLICKER: "Fire/TV/neon fluctuation effect",
        PULSING: "Rhythmic intensity variation",
        SHIFTING: "Gradual color/temperature change"
    },
    TECHNIQUES: {
        RIM_LIGHT: "Accent separation from background",
        PRACTICAL: "Visible in-scene light sources",
        BOUNCED: "Indirect reflected illumination",
        LENS_FLARE: "Controlled optical artifacts"
    }
} as const;

type MoodCategory = keyof typeof CINEMATIC_MOODS;
type MoodValue = typeof CINEMATIC_MOODS[MoodCategory][keyof typeof CINEMATIC_MOODS[MoodCategory]];

// Context-aware suggestions mapping
// const SUGGESTIONS: Record<string, Partial<Record<MoodCategory, string[]>> = {
const SUGGESTIONS: any = {

    HARD: {
        DIRECTION: ["SIDELIT", "BACKLIT", "TOPLIT"],
        EMOTION: ["MENACING", "MYSTERIOUS"],
        TECHNIQUES: ["RIM_LIGHT"]
    },
    SOFT: {
        DIRECTION: ["FRONTAL", "DIAGONAL"],
        EMOTION: ["ROMANTIC", "CLINICAL"],
        COLOR_TEMPERATURE: ["TUNGSTEN", "DAYLIGHT"]
    },
    ROMANTIC: {
        COLOR_TEMPERATURE: ["TUNGSTEN", "TEAL_ORANGE"],
        DYNAMICS: ["FLICKER", "STATIC"]
    },
    MENACING: {
        DYNAMICS: ["FLICKER", "PULSING"],
        TECHNIQUES: ["PRACTICAL", "RIM_LIGHT"]
    }
};

export default function AdvancedLightMoodSelector({
    selections, setSelections
}) {
    const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
    const [suggestedOptions, setSuggestedOptions] = useState<Partial<Record<MoodCategory, string[]>>>({});

    // Generate suggestions based on current selections
    useEffect(() => {
        const newSuggestions: Partial<Record<MoodCategory, string[]>> = {};

        Object.entries(selections).forEach(([category, value]) => {
            if (SUGGESTIONS[value]) {
                Object.entries(SUGGESTIONS[value]).forEach(([suggestCategory, values]) => {
                    newSuggestions[suggestCategory as MoodCategory] = values;
                });
            }
        });

        setSuggestedOptions(newSuggestions);
    }, [selections]);

    const handleSelect = (category: MoodCategory, value: string) => {
        setSelections(prev => ({
            ...prev,
            [category]: prev[category] === value ? undefined : value
        }));
    };

    const basicCategories: MoodCategory[] = ['INTENSITY', 'DIRECTION', 'EMOTION'];
    const advancedCategories: MoodCategory[] = ['COLOR_TEMPERATURE', 'DYNAMICS', 'TECHNIQUES'];

    const getIconForMood = (value: string): ReactNode => {
        const baseClasses = "w-4 h-4 mr-2";
        switch (value) {
            case 'SOFT': return <CloudIcon className={`${baseClasses} text-blue-300`} />;
            case 'HARD': return <SunIcon className={`${baseClasses} text-yellow-400`} />;
            case 'ROMANTIC': return <HeartIcon className={`${baseClasses} text-pink-400`} />;
            case 'MENACING': return <AlertIcon className={`${baseClasses} text-red-400`} />;
            default: return <LightBulbIcon className={`${baseClasses} text-purple-300`} />;
        }
    };

    return (
        <div className="w-full bg-gray-900 rounded-lg p-4 mt-5">
            {/* <h2 className="text-xl font-bold text-white mb-4">Cinematic Lighting Mood</h2> */}

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 mb-4">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'basic' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('basic')}
                >
                    Basic
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'advanced' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('advanced')}
                >
                    Advanced
                </button>
            </div>

            {/* Current Selections */}
            {Object.keys(selections).length > 0 && (
                <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-50 mb-2">Current Mood:</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(selections).map(([category, value]) => (
                            value && (
                                <div key={`${category}-${value}`} className="bg-blue-900/30 px-3 py-1 rounded-full text-xs flex items-center">
                                    <span className="text-blue-300 mr-1">
                                        {/* {category.charAt(0)} */}
                                        {category}
                                    </span>
                                    <span className="text-white">
                                        {value.toLowerCase().replace(/_/g, ' ')}
                                    </span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {/* Context-aware Suggestions */}
            {Object.keys(suggestedOptions).length > 0 && (
                <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="text-sm font-medium text-blue-300 mb-2">Suggested Options:</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(suggestedOptions).map(([category, values]) => (
                            values?.map(value => (
                                <button
                                    key={`suggest-${category}-${value}`}
                                    onClick={() => handleSelect(category as MoodCategory, value)}
                                    className={`text-xs p-2 text-white rounded flex items-center ${selections[category as MoodCategory] === value ? 'bg-blue-900/50' : 'bg-gray-700 hover:bg-gray-600'}`}
                                >
                                    {getIconForMood(value)}
                                    {category}: {value.toLowerCase().replace(/_/g, ' ')}
                                </button>
                            ))
                        ))}
                    </div>
                </div>
            )}

            {/* Main Controls */}
            <div className="space-y-4">
                {(activeTab === 'basic' ? basicCategories : advancedCategories).map(category => (
                    <div key={category} className="bg-gray-800 rounded-lg p-3">
                        <h3 className="font-medium text-white mb-2 capitalize">
                            {category.toLowerCase().replace(/_/g, ' ')}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(CINEMATIC_MOODS[category]).map(([key, description]) => (
                                <button
                                    key={key}
                                    onClick={() => handleSelect(category, key)}
                                    className={`text-xs p-2 text-white rounded flex flex-col ${selections[category] === key ? 'bg-blue-900/50 ring-1 ring-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                                >
                                    <div className="flex items-center">
                                        {getIconForMood(key)}
                                        <span className="font-medium capitalize">
                                            {key.toLowerCase().replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-300 mt-1 text-left truncate">
                                        {description}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Icons (replace with your preferred icon library)
function CloudIcon({ className }: { className: string }) {
    return <div className={className}>☁️</div>;
}
function SunIcon({ className }: { className: string }) {
    return <div className={className}>☀️</div>;
}
function HeartIcon({ className }: { className: string }) {
    return <div className={className}>❤️</div>;
}
function AlertIcon({ className }: { className: string }) {
    return <div className={className}>⚠️</div>;
}
function LightBulbIcon({ className }: { className: string }) {
    return <div className={className}>💡</div>;
}