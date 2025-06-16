export const lightingDesign = {
    types: [
        {
            name: "Sodium Vapor Backlight",
            description: "Sodium vapor backlight + soft frontal fill"
        },
        {
            name: "Ring Light",
            description: "Ring light + practical lamp motivation"
        },
        {
            name: "Window Light",
            description: "Window light + bounce card setup"
        },
        {
            name: "Neon Tube Lighting",
            description: "Neon tube lighting + hard key"
        },
        {
            name: "Fire/Candlelight",
            description: "Fire/candlelight + warm fill"
        },
        {
            name: "LED Panel Grid",
            description: "LED panel grid + colored gels"
        }
    ],
    qualities: [
        {
            name: "Hard Directional Light",
            description: "Hard directional light with sharp shadows"
        },
        {
            name: "Diffused Ambient Glow",
            description: "Diffused ambient glow"
        },
        {
            name: "Soft Beauty Lighting",
            description: "Soft beauty lighting with gradual falloff"
        },
        {
            name: "Harsh Overhead Fluorescent",
            description: "Harsh overhead fluorescent"
        },
        {
            name: "Moody Side-Lit",
            description: "Moody side-lit with dramatic contrast"
        },
        {
            name: "Even, Shadowless Lighting",
            description: "Even, shadowless lighting"
        }
    ],
    colors: [
        {
            name: "Teal and Magenta Split-Toning",
            description: "Teal and magenta split-toning"
        },
        {
            name: "Warm Tungsten vs Cool Daylight Mix",
            description: "Warm tungsten vs cool daylight mix"
        },
        {
            name: "Monochromatic Blue Wash",
            description: "Monochromatic blue wash"
        },
        {
            name: "Golden Hour Warmth",
            description: "Golden hour warmth with purple shadows"
        },
        {
            name: "Neon Pink and Cyan Contrast",
            description: "Neon pink and cyan contrast"
        },
        {
            name: "Natural White Balance",
            description: "Natural white balance with single colored accent"
        }
    ]
};

console.log(lightingDesign);

const types = lightingDesign.types;
console.log(types);
// Output: [{...}, {...}, ...]

const qualities = lightingDesign.qualities;
console.log(qualities);
// Output: [{...}, {...}, ...]

const colors = lightingDesign.colors;
console.log(colors);
// Output: [{...}, {...}, ...]

console.log("Lighting Design Types:");
lightingDesign.types.forEach((type) => {
    console.log(type.name, type.description);
});

console.log("\nLighting Design Qualities:");
lightingDesign.qualities.forEach((quality) => {
    console.log(quality.name, quality.description);
});

console.log("\nLighting Design Colors:");
lightingDesign.colors.forEach((color) => {
    console.log(color.name, color.description);
});



export const lightingSystems =  [
    "3-Point Lighting (Key + Fill + Back)",
    "Natural Window Lighting",
    "Single Dramatic Key Light",
    "Practical Light Motivated",
    "Ambient/Global Illumination",
    "Cinematic Motivated Lighting",
    "Studio Softbox Setup",
    "Rim Light Dominant",
    "Top Down Lighting",
    "Bottom Up Lighting"
]
    


export const lightingPresets = {
    // LIGHTING SYSTEMS (choose one primary approach)
    systems: {
        threePoint: "3-Point Lighting (Key + Fill + Back)",
        natural: "Natural Window Lighting",
        dramatic: "Single Dramatic Key Light",
        practical: "Practical Light Motivated",
        ambient: "Ambient/Global Illumination",
        cinematic: "Cinematic Motivated Lighting",
        studio: "Studio Softbox Setup",
        rim: "Rim Light Dominant",
        overhead: "Top Down Lighting",
        underglow: "Bottom Up Lighting"
    },

    // LIGHT MOODS (can mix multiple)
    moods: {
        intensity: {
            harsh: "Harsh/Contrasty",
            soft: "Soft/Dreamy",
            medium: "Balanced",
            chiaroscuro: "Extreme Light/Shadow"
        },
        sourceQuality: {
            natural: "Natural Sunlight",
            artificial: "Artificial/Urban",
            magical: "Magical/Unnatural",
            organic: "Fire/Candlelight"
        },
        emotionalTone: {
            romantic: "Romantic/Warm",
            eerie: "Eerie/Cold",
            dramatic: "Dramatic/Theatrical",
            clinical: "Clinical/Sterile",
            nostalgic: "Nostalgic/Vintage"
        }
    },

    // LIGHTING DESIGN (specific technical recipes)
    designs: {
        types: [
            "Sodium vapor backlight + soft frontal fill",
            "Ring light + practical lamp motivation",
            "Window light + bounce card setup",
            "Neonut light + hard key",
            "Fire/candlelight + warm fill",
            "LED panel grid + colored gels",
            "Book light setup (bounced key)",
            "China ball ambient + directional kicker",
            "Par can backlight + diffusion frame",
            "Fresnel spotlights with barn doors"
        ],

        qualities: [
            "Hard directional with sharp shadows",
            "Diffused ambient glow",
            "Soft beauty lighting with gradual falloff",
            "Harsh overhead fluorescent",
            "Moody side-lit with dramatic contrast",
            "Even, shadowless lighting",
            "Dappled light (through foliage)",
            "Flickering/variable intensity",
            "Directional shafts (window light)",
            "Subtle volumetric scattering"
        ],

        colors: [
            "Teal and magenta split-toning",
            "Warm tungsten vs cool daylight mix",
            "Monochromatic blue wash",
            "Golden hour warmth with purple shadows",
            "Neon pink and cyan contrast",
            "Natural white balance with single colored accent",
            "Sodium vapor orange + moonlit blue",
            "RGBYCM color wheel opposition",
            "Sepia tones with white highlights",
            "Bi-color temperature conflict"
        ],

        styles: {
            cinematic: [
                "David Fincher - Green/Teal Shadows",
                "Roger Deakins - Natural Motivated",
                "Film Noir - High Contrast B&W",
                "Amelie - Golden Warmth",
                "Blade Runner - Neon Practicals"
            ],
            artistic: [
                "Rembrandt - Single Light Source",
                "Vermeer - Window Light",
                "Caravaggio - Chiaroscuro",
                "Impressionist - Dappled Light",
                "Cyberpunk - Neon Glow"
            ],
            technical: [
                "Product Lighting - Even & Shadowless",
                "Beauty Lighting - Butterfly Pattern",
                "Interview Lighting - Eye Light Included",
                "Archviz - Accurate Sun Study",
                "Macro - Ring Light Illumination"
            ]
        }
    },

    // SPECIAL EFFECTS
    effects: {
        atmospheric: [
            "Volumetric fog shafts",
            "Light bloom/glare",
            "Lens flares",
            "God rays",
            "Heat distortion"
        ],
        animation: [
            "Pulsing neon",
            "Flickering fire",
            "TV screen strobe",
            "Lightning flashes",
            "Police light rotation"
        ],
        interaction: [
            "Character-cast shadows",
            "Dynamic time-of-day",
            "Light-reactive materials",
            "Reflective surfaces",
            "Subsurface scattering"
        ]
    }
};

// Example usage:
const sceneLighting = {
    system: lightingPresets.systems.cinematic,
    moods: [
        lightingPresets.moods.intensity.dramatic,
        lightingPresets.moods.sourceQuality.artificial,
        lightingPresets.moods.emotionalTone.eerie
    ],
    design: {
        type: lightingPresets.designs.types[3], // Donut light + hard key
        quality: lightingPresets.designs.qualities[4], // Moody side-lit
        color: lightingPresets.designs.colors[5], // Natural + colored accent
        style: lightingPresets.designs.styles.cinematic[4] // Blade Runner
    },
    effects: [
        lightingPresets.effects.atmospheric[0], // Volumetric fog
        lightingPresets.effects.animation[1] // Flickering fire
    ]
};









const lightingSystem = {
    // The foundational approach to lighting your scene
    systems: {
        threePoint: {
            name: "3-Point Lighting",
            description: "The standard professional setup with three light sources",
            components: {
                key: {
                    description: "Main light source placed at 45° to create shadows (like the sun)"
                },
                fill: {
                    description: "Softer light opposite the key to reduce shadows (like light bouncing off walls)"
                },
                back: {
                    description: "Light behind subject to create separation (like a halo effect)"
                }
            }
        },
        natural: {
            name: "Natural Lighting",
            description: "Uses apparent natural sources like windows or sunlight"
        },
        dramatic: {
            name: "Single Light Drama",
            description: "One strong light source for high contrast scenes"
        },
        practical: {
            name: "Practical Lighting",
            description: "Uses visible light sources within the scene (lamps, TVs, etc.)"
        }
    },

    // The emotional feeling created by lighting
    moods: {
        soft: {
            description: "Gentle, even lighting that flatters subjects (like beauty product ads)"
        },
        hard: {
            description: "Sharp shadows and strong contrast (like thriller movies)"
        },
        natural: {
            description: "Authentic-looking light that seems real (like documentaries)"
        },
        colored: {
            description: "Vibrant colored lights (like nightclub scenes)"
        },
        highKey: {
            description: "Bright and cheerful with few shadows (like sitcoms)"
        },
        lowKey: {
            description: "Dark and moody with deep shadows (like film noir)"
        },
        goldenHour: {
            description: "Warm sunset-like glow (romantic scenes)"
        },
        clinical: {
            description: "Cold, shadowless light (like hospitals)"
        }
    },

    // The specific technical recipes for lighting
    designs: {
        types: [
            {
                name: "Sodium vapor backlight + soft frontal fill",
                description: "Orange streetlight behind subject with gentle front lighting"
            },
            {
                name: "Ring light + practical lamp motivation",
                description: "Circular camera light with visible lamps justifying other lights"
            },
            {
                name: "Window light + bounce card setup",
                description: "Natural sunlight plus white reflector to soften shadows"
            }
        ],

        qualities: [
            {
                name: "Hard directional light",
                description: "Strong light creating sharp-edged shadows (like sunlight at noon)"
            },
            {
                name: "Diffused ambient glow",
                description: "Soft light coming from all directions (like cloudy days)"
            },
            {
                name: "Harsh overhead fluorescent",
                description: "Unflattering light from above (like office lighting)"
            }
        ],

        colors: [
            {
                name: "Teal and orange split-toning",
                description: "Warm highlights with cool shadows (blockbuster movie look)"
            },
            {
                name: "Warm tungsten vs cool daylight mix",
                description: "Conflict between orange indoor and blue outdoor light"
            },
            {
                name: "Monochromatic blue wash",
                description: "Everything tinted blue (moonlight effect)"
            }
        ]
    },

    // Simple presets combining systems, moods and designs
    presets: {
        filmNoir: {
            system: "dramatic",
            mood: "lowKey",
            design: {
                type: "Single hard key light",
                quality: "Hard shadows with sharp edges",
                color: "High contrast black & white"
            }
        },
        romCom: {
            system: "threePoint",
            mood: "highKey",
            design: {
                type: "Soft key + generous fill",
                quality: "Flattering, shadow-minimized",
                color: "Warm skin tones with bright colors"
            }
        },
        sciFi: {
            system: "practical",
            mood: "colored",
            design: {
                type: "Neon practicals + LED accents",
                quality: "Glowing edges with dark mids",
                color: "Electric blues and purples"
            }
        }
    }
};










const lightingSystemOptions = {
    // The foundational approach to lighting your scene
    SYSTEMS: {
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
    },

    // The emotional atmosphere created by lighting
    MOODS: {
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
    },

    // The specific technical recipe of lights
    DESIGNS: {
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
    },

    // Ready-to-use lighting recipes
    PRESETS: {
        PORTRAIT: "Softbox key + reflector fill + hair light back",
        NOIR: "Hard sidelight + smoke/haze + deep shadows",
        SCI_FI: "Cool blue fill + neon accent lights",
        ROMANTIC: "Warm golden backlight + soft frontal glow",
        HORROR: "Underside lighting + practical flicker effect",
        PRODUCT: "Clean white light + reflective surfaces"
    }
};











// qualitySettings: {
//     resolution: [
//       "4K", "8K", "16K",
//       "high definition", "ultra high definition",
//       "standard definition"
//     ],
//     focus: [
//       "sharp focus", "soft focus", "dreamy focus",
//       "selective focus", "partial focus"
//     ],
//     colorGrading: [
//       "naturalistic", "cinematic", "stylized",
//       "vibrant", "muted", "monochromatic"
//     ]
//   }