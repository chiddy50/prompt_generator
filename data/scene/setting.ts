export const settingDetails = {
    timeOfDay: ["morning", "afternoon", "evening", "night"],
    weather: ["sunny", "rainy", "snowy", "foggy", "windy"],
    location: [
        "Living room",
        "Bedroom room",
        "Kitchen",
        "Studio",
        "City",
        "Suburb",
        "Small town",
        "Village",
        "Countryside",
        "Forest",
        "Mountains",
        "Beach",
        "Island",
        "Desert",
        "Jungle",
        "Arctic",
        "Tundra",
        "Plains",
        "Savanna",
        "Canyon",
        "Valley",
        "Cave",
        "Ruins",
        "Underwater",
        "Space station",
        "Alien planet",
        "Parallel universe",
        "Historical period (e.g., medieval castle, ancient civilization)",
        "Futuristic cityscape",
        "Dystopian society",
        "Post-apocalyptic wasteland",
        "Magical realm",
        "Fairy tale kingdom",
        "Dream world"
    ],
    season: ["spring", "summer", "autumn", "winter"],
    atmospheres: [
        "Calm",
        "Eerie",
        "Bustling",
        "Tranquil",
        "Tense",
        "Magical",
        "Foreboding",
        "Chaotic",
        "Serene",
        "Melancholic",
        "Romantic",
        "Enigmatic",
        "Exciting",
        "Dreamy",
        "Grim",
        "Hopeful",
        "Surreal",
        "Lively",
        "Intense",
        "Peaceful"
    ]
}


export const environmentParameters = {
    // TEMPORAL SETTINGS
    timeOfDay: [
        "dawn", "early morning", "morning", "late morning",
        "noon", "afternoon", "late afternoon", "dusk",
        "evening", "night", "late night", "midnight"
    ],
    
    season: [
        "spring", "summer", "autumn", "winter",
        "wet season", "dry season", "monsoon"
    ],
    
    timePeriodOptions: [
        "prehistoric", "ancient", "classical antiquity", "medieval",
        "renaissance", "industrial age", "victorian era", "early 20th century",
        "mid-century modern", "1960s", "1970s", "1980s", "1990s",
        "early 2000s", "contemporary", "near future", "far future",
        "post-apocalyptic", "steampunk", "cyberpunk", "retro-futuristic"
    ],

    // WEATHER & ATMOSPHERIC CONDITIONS
    weatherOptions: [
        "clear", "sunny", "partly cloudy", "overcast", "cloudy",
        "light rain", "heavy rain", "drizzle", "thunderstorm", "lightning",
        "light snow", "heavy snow", "blizzard", "sleet", "hail",
        "foggy", "misty", "hazy", "humid", "dry",
        "windy", "breezy", "calm", "stormy", "hurricane", "tornado"
    ],

    atmosphericEffects: [
        "golden hour lighting", "blue hour", "harsh sunlight", "filtered light",
        "dramatic shadows", "soft diffused light", "backlit", "silhouette",
        "god rays", "lens flare", "rainbow", "aurora", "meteor shower"
    ],

    // LOCATION TYPE
    locationType: {
        indoor: [
            "residential", "commercial", "industrial", "institutional",
            "entertainment", "hospitality", "retail", "office", "studio"
        ],
        
        outdoor: [
            "urban", "suburban", "rural", "wilderness", "coastal",
            "mountainous", "desert", "tropical", "arctic", "agricultural"
        ]
    },

    // SPECIFIC ENVIRONMENTS
    specificEnvironments: {
        indoor: [
            // Residential
            "living room", "bedroom", "kitchen", "bathroom", "dining room",
            "home office", "basement", "attic", "garage", "hallway",
            "walk-in closet", "pantry", "laundry room", "nursery", "study",
            
            // Commercial/Public
            "restaurant", "cafe", "bar", "nightclub", "shopping mall",
            "grocery store", "bookstore", "library", "museum", "gallery",
            "theater", "cinema", "concert hall", "gym", "spa",
            "hotel lobby", "hotel room", "office", "conference room",
            "classroom", "laboratory", "hospital", "clinic", "pharmacy",
            "bank", "post office", "train station", "airport terminal",
            "subway station", "elevator", "stairwell", "parking garage",
            
            // Studio/Creative
            "photography studio", "art studio", "recording studio",
            "dance studio", "workshop", "maker space", "rehearsal room",
            
            // Industrial/Utility
            "factory", "warehouse", "server room", "control room",
            "mechanical room", "storage facility", "bunker", "vault"
        ],
        
        outdoor: [
            // Urban
            "city street", "downtown", "business district", "residential street",
            "alleyway", "plaza", "town square", "park", "rooftop",
            "balcony", "fire escape", "construction site", "parking lot",
            "bridge", "overpass", "tunnel entrance", "subway entrance",
            
            // Suburban/Residential
            "front yard", "backyard", "driveway", "porch", "patio",
            "deck", "garden", "suburban street", "cul-de-sac",
            "neighborhood park", "playground", "swimming pool area",
            
            // Natural Landscapes
            "forest", "jungle", "rainforest", "woodland", "grove",
            "meadow", "field", "prairie", "grassland", "savanna",
            "desert", "oasis", "dunes", "badlands", "canyon",
            "valley", "cliff", "plateau", "hills", "mountains",
            "peak", "cave", "cavern", "underground chamber",
            
            // Water Features
            "beach", "coastline", "pier", "dock", "marina",
            "lake", "pond", "river", "stream", "waterfall",
            "rapids", "hot springs", "geyser", "swamp", "marsh",
            "wetlands", "coral reef", "underwater", "ocean depths",
            
            // Special Locations
            "island", "archipelago", "volcano", "glacier", "iceberg",
            "tundra", "arctic landscape", "space", "alien planet",
            "moon surface", "space station exterior", "asteroid",
            
            // Rural/Agricultural
            "farm", "ranch", "barn", "silo", "vineyard", "orchard",
            "wheat field", "corn maze", "pasture", "stable", "henhouse",
            
            // Historical/Fantasy
            "ruins", "ancient temple", "castle", "fortress", "monastery",
            "village square", "medieval market", "colosseum", "pyramid",
            "stone circle", "magical forest", "enchanted garden",
            "fairy ring", "crystal cave", "floating island", "portal",
            
            // Dystopian/Sci-Fi
            "post-apocalyptic wasteland", "abandoned city", "space colony",
            "cyberpunk alley", "neon-lit street", "flying car highway",
            "energy field", "holographic environment", "virtual reality space"
        ]
    },

    // BACKGROUND CONTROL
    backgroundControl: {
        wallTreatments: [
            "plain white", "textured white", "colored solid", "gradient",
            "brick", "stone", "wood paneling", "tile", "concrete",
            "wallpaper", "mural", "graffiti", "chalkboard", "whiteboard",
            "mirrors", "windows", "curtains", "blinds", "artwork",
            "shelving", "built-ins", "exposed beams", "industrial pipes",
            "fabric backdrop", "seamless paper", "greenscreen", "cyc wall"
        ],
        
        spaceDensity: [
            "minimalist", "sparse", "moderate", "busy", "cluttered",
            "maximalist", "organized chaos", "sterile", "lived-in",
            "abandoned", "under construction", "freshly cleaned"
        ],
        
        specificBackgroundElements: {
            // Furniture
            furniture: [
                "furniture", "seating", "tables", "storage", "decorative objects",
                "plants", "flowers", "trees", "architectural details",
            ],
            
            // Technology
            technology: [
                "screens", "monitors", "devices", "cables", "equipment",
                "machinery", "vehicles", "tools", "instruments",
            ],
            
            // Natural Elements
            naturalElements: [
                "grass", "flowers", "vines", "moss", "water features",
                "rocks", "boulders", "logs", "branches", "leaves",
            ],
            
            // Atmospheric Elements
            atmosphericElements: [
                "smoke", "steam", "fog", "dust particles", "bubbles",
                "sparks", "fire", "candles", "string lights", "neon signs",
            ],
            
            // Architectural
            architectural: [
                "columns", "arches", "doorways", "stairs", "railings",
                "beams", "pipes", "ducts", "vents", "fixtures"
            ]
        },
        
        depthLayers: {
            foreground: [
                "out-of-focus elements", "bokeh", "frame elements",
                "partial objects", "leading lines", "foreground blur",
                "close objects", "overhanging elements"
            ],
            
            midground: [
                "main subject area", "primary focus plane",
                "supporting elements", "contextual objects",
                "secondary subjects", "interaction space"
            ],
            
            background: [
                "distant elements", "background blur", "context setting",
                "horizon line", "sky elements", "far architecture",
                "landscape features", "atmospheric perspective",
                "infinity backdrop", "negative space"
            ]
        }
    },

    // ATMOSPHERIC QUALITIES
    atmospheres: {
        // Emotional Tones
        emotionalTones: [
            "serene", "peaceful", "tranquil", "calm", "relaxing",
            "energetic", "vibrant", "lively", "dynamic", "exciting",
            "romantic", "intimate", "cozy", "warm", "inviting",
            "mysterious", "enigmatic", "secretive", "hidden", "obscure",
            "dramatic", "intense", "powerful", "bold", "striking",
            "melancholic", "nostalgic", "wistful", "bittersweet", "longing",
            "hopeful", "optimistic", "uplifting", "inspiring", "joyful",
            "somber", "serious", "contemplative", "reflective", "meditative",
        ],
        
        // Tension Levels
        tensionLevels: [
            "tense", "suspenseful", "anxious", "nervous", "uncomfortable",
            "chaotic", "frantic", "hectic", "overwhelming", "busy",
            "eerie", "creepy", "unsettling", "ominous", "foreboding",
            "threatening", "dangerous", "hostile", "aggressive", "volatile",
        ],
        
        // Fantasy/Surreal
        fantasty: [
            "magical", "enchanted", "mystical", "otherworldly", "ethereal",
            "dreamlike", "surreal", "fantastical", "whimsical", "playful",
            "haunting", "ghostly", "supernatural", "paranormal", "spiritual",
        ],
        
        // Realism Levels
        realismLevels: [
            "realistic", "natural", "authentic", "candid", "documentary",
            "stylized", "artistic", "conceptual", "abstract", "experimental",
            "cinematic", "theatrical", "staged", "posed", "editorial"
        ]
    },

    // LIGHTING CONDITIONS
    lightingConditions: [
        "natural daylight", "artificial lighting", "mixed lighting",
        "soft lighting", "hard lighting", "dramatic lighting",
        "even lighting", "directional lighting", "ambient lighting",
        "accent lighting", "mood lighting", "clinical lighting",
        "warm lighting", "cool lighting", "colored lighting",
        "low light", "bright light", "high contrast", "low contrast",
        "silhouette", "rim lighting", "backlighting", "side lighting"
    ]
};


export const temporalSettings = {
    timeOfDay: environmentParameters.timeOfDay,
    season: environmentParameters.season,
    timePeriodOptions: environmentParameters.timePeriodOptions,
}



export const environmentalConditions = {
    weatherOptions: environmentParameters.weatherOptions,
    atmosphericEffects: environmentParameters.atmosphericEffects,
}

export const indoorOptions = {
    // Residential
    residential: [        
        "living room", "bedroom", "kitchen", "bathroom", "dining room",
        "home office", "basement", "attic", "garage", "hallway",
        "walk-in closet", "pantry", "laundry room", "nursery", "study",
    ],
    commercial: [
        // Commercial/Public
        "restaurant", "cafe", "bar", "nightclub", "shopping mall",
        "grocery store", "bookstore", "library", "museum", "gallery",
        "theater", "cinema", "concert hall", "gym", "spa",
        "hotel lobby", "hotel room", "office", "conference room",
        "classroom", "laboratory", "hospital", "clinic", "pharmacy",
        "bank", "post office", "train station", "airport terminal",
        "subway station", "elevator", "stairwell", "parking garage",
    ],
    
    creative: [
        // Studio/Creative
        "photography studio", "art studio", "recording studio",
        "dance studio", "workshop", "maker space", "rehearsal room",
    ],

    industrial: [
        // Industrial/Utility
        "factory", "warehouse", "server room", "control room",
        "mechanical room", "storage facility", "bunker", "vault"
    ]
    
}

export const outdoorOptions = {
    urban: [
        // Urban
        "city street", "downtown", "business district", "residential street",
        "alleyway", "plaza", "town square", "park", "rooftop",
        "balcony", "fire escape", "construction site", "parking lot",
        "bridge", "overpass", "tunnel entrance", "subway entrance",
    ],
    
    residential: [
        // Suburban/Residential
        "front yard", "backyard", "driveway", "porch", "patio",
        "deck", "garden", "suburban street", "cul-de-sac",
        "neighborhood park", "playground", "swimming pool area",
    ],

    naturalLandscapes: [
        // Natural Landscapes
        "forest", "jungle", "rainforest", "woodland", "grove",
        "meadow", "field", "prairie", "grassland", "savanna",
        "desert", "oasis", "dunes", "badlands", "canyon",
        "valley", "cliff", "plateau", "hills", "mountains",
        "peak", "cave", "cavern", "underground chamber",
    ],

    waterFeatures: [
        // Water Features
        "beach", "coastline", "pier", "dock", "marina",
        "lake", "pond", "river", "stream", "waterfall",
        "rapids", "hot springs", "geyser", "swamp", "marsh",
        "wetlands", "coral reef", "underwater", "ocean depths",        
    ],

    specialLocations: [
        // Special Locations
        "island", "archipelago", "volcano", "glacier", "iceberg",
        "tundra", "arctic landscape", "space", "alien planet",
        "moon surface", "space station exterior", "asteroid",
    ],
    
    rural: [        
        // Rural/Agricultural
        "farm", "ranch", "barn", "silo", "vineyard", "orchard",
        "wheat field", "corn maze", "pasture", "stable", "henhouse",        
    ],
    
    historical: [
        // Historical/Fantasy
        "ruins", "ancient temple", "castle", "fortress", "monastery",
        "village square", "medieval market", "colosseum", "pyramid",
        "stone circle", "magical forest", "enchanted garden",
        "fairy ring", "crystal cave", "floating island", "portal",        
    ],

    sciFi: [
        // Dystopian/Sci-Fi
        "post-apocalyptic wasteland", "abandoned city", "space colony",
        "cyberpunk alley", "neon-lit street", "flying car highway",
        "energy field", "holographic environment", "virtual reality space"
    ]
}
