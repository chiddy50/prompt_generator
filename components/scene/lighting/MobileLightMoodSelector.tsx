"use client"

import { useState } from 'react';
import type { ReactNode } from 'react';


const MOODS = {
  // Physical light characteristics
  INTENSITY: {
    SOFT: "Gentle, diffused lighting with gradual shadows",
    HARD: "Sharp, directional lighting with defined shadows",
    MIXED: "Controlled contrast with both soft and hard elements",
    CHIAROSCURO: "Extreme contrast between light and dark areas"
  },

  // Spatial relationship to subject
  DIRECTION: {
    FRONTAL: "Flat illumination minimizing texture",
    SIDELIT: "Reveals texture and creates volume",
    BACKLIT: "Creates silhouettes or rim lighting",
    TOPLIT: "Dramatic downward shadows",
    UNDERLIT: "Unnatural upward shadows",
    DIAGONAL: "45° angle for balanced dimensionality"
  },

  // Overall aesthetic approach
  STYLE: {
    HIGH_KEY: "Bright, low-contrast (commercial/optimistic)",
    LOW_KEY: "Dark, high-contrast (noir/mysterious)",
    GOLDEN_HOUR: "Warm, directional with long shadows",
    COOL_BLUE: "Cold, sterile or technological",
    BIOLUMINESCENT: "Ethereal glowing light sources",
    NEON_NOIR: "Saturated artificial colors in darkness"
  },

  // New important categories:
  
  // Light color properties
  COLOR_TEMPERATURE: {
    TUNGSTEN: "Warm orange (3200K - indoor bulbs)",
    DAYLIGHT: "Cool blue (5600K - natural sun)",
    MIXED: "Creative combination of temperatures",
    TEAL_ORANGE: "Cinematic complementary scheme",
    MONOCHROMATIC: "Single hue variation",
    FULL_SPECTRUM: "Natural balanced white"
  },

  // Light movement and change
  DYNAMICS: {
    STATIC: "Consistent unchanging light",
    FLICKER: "Fire/TV/neon fluctuation effect",
    PULSING: "Rhythmic intensity variation",
    SHIFTING: "Gradual color/temperature change",
    STROBE: "Harsh intermittent flashes",
    MOTIVATED: "Changes with visible in-scene cause"
  },

  // Light diffusion methods
  TEXTURE: {
    CLEAN: "Smooth, shadowless quality",
    DIFFUSED: "Frosted/softened light",
    PATTERNED: "Gobo/shadow patterns",
    DAPPLED: "Natural light through foliage",
    HAZY: "Atmospheric volume lighting",
    PRISMATIC: "Rainbow refraction effects"
  },

  // Psychological impact
  EMOTION: {
    ROMANTIC: "Warm, soft with gentle falloff",
    MENACING: "Harsh, unpredictable shadows",
    CLINICAL: "Even, shadowless illumination",
    MYSTERIOUS: "Partial illumination with pools of light",
    HOPEFUL: "Gradually brightening front light",
    ISOLATING: "Single source in darkness"
  },

  // Specialized techniques
  TECHNIQUES: {
    RIM_LIGHT: "Accent separation from background",
    KICKER: "Secondary rim light from opposite side",
    PRACTICAL: "Visible in-scene light sources",
    BOUNCED: "Indirect reflected illumination",
    SILHOUETTE: "Backlight with no fill",
    LENS_FLARE: "Controlled optical artifacts"
  }
} as const;

// const MOODS = {
//   INTENSITY: {
//     SOFT: "Gentle, even lighting with soft shadows (like cloudy day)",
//     HARD: "Dramatic lighting with sharp shadows (like noon sun)",
//     MIXED: "Combination of soft and hard lighting in different areas"
//   },
//   DIRECTION: {
//     FRONTAL: "Light from camera position (flat, even look)",
//     SIDELIT: "Light from side (creates depth and texture)",
//     BACKLIT: "Light from behind (silhouettes or glow effects)",
//     TOPLIT: "Light from above (stylish downward shadows)",
//     UNDERLIT: "Light from below (unnatural, creepy feeling)"
//   },
//   STYLE: {
//     HIGH_KEY: "Bright, low-contrast (happy/commercial look)",
//     LOW_KEY: "Dark, high-contrast (moody/dramatic look)",
//     GOLDEN_HOUR: "Warm sunset-like glow (romantic/nostalgic)",
//     COOL_BLUE: "Cold, technological feeling (night/sci-fi)"
//   }
// } as const;

type MoodCategory = keyof typeof MOODS;
type MoodValue<T extends MoodCategory> = keyof typeof MOODS[T];

export default function MobileLightMoodSelector({
  onSelectionChange
}: {
  onSelectionChange: (selections: Record<MoodCategory, string | null>) => void
}) {
  const [selections, setSelections] = useState<Record<MoodCategory, string | null>>({
    INTENSITY: null,
    DIRECTION: null,
    STYLE: null,
    COLOR_TEMPERATURE: null,
    DYNAMICS: null,
    TEXTURE: null,
    EMOTION: null,
    TECHNIQUES: null,
  });
  const [openDropdown, setOpenDropdown] = useState<MoodCategory | null>(null);

  const handleSelect = (category: MoodCategory, value: string) => {
    const newSelections = {
      ...selections,
      [category]: selections[category] === value ? null : value
    };
    setSelections(newSelections);
    onSelectionChange(newSelections);
    setOpenDropdown(null); // Close dropdown after selection
  };

  const toggleDropdown = (category: MoodCategory) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const getIconForMood = (value: string): ReactNode => {
    const baseClasses = "w-4 h-4 mr-2";

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
    <div className="w-full bg-gray-900 rounded-lg p-4 space-y-3">
      <h2 className="text-lg font-bold text-white mb-2">Lighting Mood</h2>
      
      {Object.entries(MOODS).map(([category, moods]) => (
        <div key={category} className="relative">
          {/* Dropdown Trigger */}
          <button
            onClick={() => toggleDropdown(category as MoodCategory)}
            className={`w-full flex justify-between items-center p-3 rounded-lg transition-colors ${openDropdown === category ? 'bg-gray-700' : 'bg-gray-800'}`}
          >
            <div className="flex items-center">
              <span className="font-medium text-white capitalize">
                {category.toLowerCase()}
              </span>
              {selections[category as MoodCategory] && (
                <span className="ml-2 text-xs bg-blue-900/50 px-2 py-1 rounded-full text-blue-300">
                  {selections[category as MoodCategory]?.replace(/_/g, ' ').toLowerCase()}
                </span>
              )}
            </div>
            <ChevronIcon className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === category ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Content */}
          {openDropdown === category && (
            <div className="mt-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {Object.entries(moods).map(([key, description]) => (
                <button
                  key={key}
                  onClick={() => handleSelect(category as MoodCategory, key)}
                  className={`w-full text-left p-3 flex items-start hover:bg-gray-700 transition-colors ${selections[category as MoodCategory] === key ? 'bg-blue-900/30' : ''}`}
                >
                  {getIconForMood(key)}
                  <div className="flex-1">
                    <div className="font-medium text-white capitalize text-sm">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                      {description}
                    </div>
                  </div>
                  {selections[category as MoodCategory] === key && (
                    <CheckIcon className="w-4 h-4 text-blue-400 ml-2" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Icons
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
function ChevronIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}