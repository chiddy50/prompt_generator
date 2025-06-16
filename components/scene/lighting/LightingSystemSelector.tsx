"use client"

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const SYSTEM = {
    THREE_POINT: {
        description: "The standard professional setup with key, fill, and back lights",
        components: {
            KEY: "Main light source creating shadows (like the sun)",
            FILL: "Softer light reducing shadows (like light bouncing off walls)",
            BACK: "Light behind subject creating separation (halo effect)"
        }
    },
    NATURAL: {
        description: "Light appears to come from natural sources like windows/sun",
        examples: ["Window light", "Sunlight", "Skylight"]
    },
    SINGLE_SOURCE: {
        description: "Dramatic lighting using just one strong light",
        examples: ["Single spotlight", "Flashlight effect", "Candlelight"]
    },
    PRACTICAL: {
        description: "Using visible light sources within the scene itself",
        examples: ["Lamps", "Neon signs", "TV glow", "Fireplace"]
    }
};

export default function LightingSystemSelector({ onSelect }: { onSelect: (system: string) => void }) {
    const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<string | null>(null);

    const handleSelect = (system: string) => {
        setSelectedSystem(system);
        onSelect(system);
        setShowDetails(null); // Close details when selecting
    };

    const toggleDetails = (system: string) => {
        setShowDetails(showDetails === system ? null : system);
    };

    return (
        <div className="mt-4">
            {/* <h2 className="text-xl font-bold mb-4 text-white">Lighting System</h2>
            <p className="text-gray-900 mb-4">Lighting System</p> */}

            <div className="space-y-3">
                {Object.entries(SYSTEM).map(([key, system]) => (
                    <div
                        key={key}
                        className={`rounded-lg overflow-hidden transition-all ${selectedSystem === key ? 'bg-gray-100 text-gray-900 border border-gray-200' : 'bg-gray-900 text-white'}`}
                    >
                        <div
                            className="p-4 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleDetails(key)}
                        >
                            <div>
                                <h3 className="font-extrabold capitalize">{key.replace('_', ' ')}</h3>
                                <p className="text-xs font-light">{system.description}</p>
                            </div>
                            <button
                                className={`text-xs px-3 py-1.5 rounded-lg ${selectedSystem === key ? 'bg-gray-900 text-white' : 'text-gray-900 bg-white'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(key);
                                }}
                            >
                                {selectedSystem === key ? 'Selected' : 'Select'}
                            </button>
                        </div>

                        {showDetails === key && (
                            <div className="p-4 bg-gray-700">
                                {'components' in system ? (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-300 mb-2">Components:</h4>
                                        <ul className="space-y-2">
                                            {Object.entries(system.components).map(([compKey, description]) => (
                                                <li key={compKey} className="text-xs text-gray-300 flex items-center gap-2">
                                                    <span className="font-medium flex items-center gap-1">{compKey} <ArrowRight size={10} /> </span>  <span> {description} </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-300 mb-2">Examples:</h4>
                                        <ul className="space-y-1">
                                            {system.examples.map((example, index) => (
                                                <li key={index} className="text-xs text-gray-300">• {example}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* {selectedSystem && (
                <div className="mt-6 p-3 bg-gray-900 rounded-lg ">
                    <p className="text-white text-sm">
                        <span className="font-medium capitalize">Selected:</span> {selectedSystem.replace('_', ' ')}
                    </p>
                </div>
            )} */}
        </div>
    );
}
