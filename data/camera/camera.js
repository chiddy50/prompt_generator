const CAMERA_ANGLES_POSITIONS = {
    HEIGHT_LEVELS: {
        "Eye Level": {
            description: "Camera at person's eye height - Natural, comfortable feeling",
            emotion: "Neutral, balanced, everyday",
            useCase: "Standard dialogue, natural conversation scenes"
        },
        "Low Angle": {
            description: "Camera below eye level, looking up - Makes subject look powerful, important",
            emotion: "Makes subject look powerful/dominant",
            useCase: "Heroic shots, authority figures, empowerment"
        },
        "High Angle": {
            description: "Camera above, looking down - Makes subject look small, vulnerable",
            emotion: "Makes subject look weak/vulnerable",
            useCase: "Victim shots, showing submission, creating sympathy"
        },
        "Bird's Eye": {
            description: "Camera directly above - Shows patterns, relationships, god-like view",
            emotion: "All-seeing, omniscient perspective that reveals hidden patterns and relationships",
            useCase: "Establishing shots, surveillance feel, artistic compositions"
        },
        "Overhead": {
            description: "Camera positioned directly above the subject, looking straight down - Creates flat, graphic compositions",
            emotion: "Feels artistic, stylish, abstract",
            useCase: "Food photography, flat lay compositions, creative shots"
        },
        "Worm's Eye": {
            description: "Extreme low angle from ground level looking up - Creates dramatic, imposing feeling",
            emotion: "Subject appears monumental, overwhelming, intimidating",
            useCase: "Architecture, skyscrapers, making subjects appear godlike"
        }
    },

    DISTANCE_FROM_SUBJECT: {
        "Extreme Close-Up": {
            description: "Part of face or very small detail fills frame - Maximum intimacy and detail",
            emotion: "Intense, intimate, claustrophobic",
            useCase: "Showing emotion, revealing important details, creating tension"
        },
        "Close-Up": {
            description: "Face fills most of frame - Intimate, emotional connection",
            emotion: "Emotional, intense, detailed",
            useCase: "Character reactions, emotional moments, interviews"
        },
        "Medium Close-Up": {
            description: "From chest/shoulders up - Personal but not overwhelming",
            emotion: "Personal, engaging, comfortable intimacy",
            useCase: "Dialogue scenes, news anchors, personal conversations"
        },
        "Medium Shot": {
            description: "Waist up - Conversational, natural human interaction",
            emotion: "Comfortable and relatable, like having a normal conversation",
            useCase: "Standard dialogue, showing body language, natural interactions"
        },
        "Medium Wide": {
            description: "Knees up - Shows more environment while keeping subject prominent",
            emotion: "Balanced between personal and environmental context",
            useCase: "Action scenes, showing movement, group interactions"
        },
        "Wide Shot": {
            description: "Full body + environment - Shows context and location",
            emotion: "Shows the full scene or space",
            useCase: "Establishing character in environment, showing full action"
        },
        "Extreme Wide": {
            description: "Tiny person in big space - Shows scale and isolation",
            emotion: "Emphasizes vastness, can make subject feel small, lonely, or overwhelmed",
            useCase: "Landscape shots, showing isolation, epic scale"
        }
    },

    SPECIAL_ANGLES: {
        "Dutch Tilt": {
            description: "Camera tilted at an angle (15-45 degrees) - Creates visual tension",
            emotion: "Feels strange, dramatic, unsettling",
            useCase: "Thriller scenes, disorientation, psychological tension"
        },
        "Canted Angle": {
            description: "Slight camera tilt (5-15 degrees) - Subtle unease without being obvious",
            emotion: "Slightly off-balance, subtle tension",
            useCase: "Building suspense, showing character instability"
        },
        "Crash Zoom": {
            description: "Rapid zoom in on subject - Creates dramatic emphasis",
            emotion: "Shocking, sudden realization, comedic effect",
            useCase: "Reaction shots, sudden revelations, comedy"
        },
        "Dolly Zoom": {
            description: "Camera moves while zooming opposite direction - Creates vertigo effect",
            emotion: "Disorienting, supernatural, psychological unease",
            useCase: "Psychological thrillers, showing character realization"
        },
        "Whip Pan": {
            description: "Extremely fast horizontal camera movement - Creates motion blur",
            emotion: "Energetic, chaotic, following fast action",
            useCase: "Action sequences, quick scene transitions"
        },
        "Handheld": {
            description: "Camera held by operator without stabilization - Natural, documentary feel",
            emotion: "Realistic, intimate, sometimes chaotic",
            useCase: "Documentary style, action scenes, intimate moments"
        }
    },

    SHOT_TYPES: {
        "Over-the-Shoulder": {
            description: "Shows subject from behind another person's shoulder - Creates connection between characters",
            emotion: "Intimate dialogue, voyeuristic, conversational",
            useCase: "Dialogue scenes, showing character relationships"
        },
        "Point-of-View": {
            description: "Camera becomes the character's eyes - Audience sees what character sees",
            emotion: "Immersive, subjective, puts viewer in character's position",
            useCase: "First-person perspective, showing character's experience"
        },
        "Reverse Shot": {
            description: "Opposite angle of previous shot - Shows other side of conversation",
            emotion: "Balanced dialogue, back-and-forth conversation",
            useCase: "Dialogue scenes, showing both characters' perspectives"
        },
        "Two Shot": {
            description: "Two people in frame together - Shows relationship dynamic",
            emotion: "Relationship-focused, comparative, interactive",
            useCase: "Conversations, showing character relationships"
        },
        "Three Shot": {
            description: "Three people in frame - Group dynamic, triangle composition",
            emotion: "Group interaction, social dynamics",
            useCase: "Group conversations, showing multiple character relationships"
        },
        "Split Screen": {
            description: "Two or more shots displayed in one frame - Shows simultaneous action",
            emotion: "Comparison, parallel action, divided attention",
            useCase: "Phone conversations, parallel storylines, comparisons"
        },
        "Insert Shot": {
            description: "Extreme close-up of object or action detail - Highlights important elements",
            emotion: "Focused attention, revealing important details",
            useCase: "Showing important objects, revealing clues, emphasizing details"
        },
        "Cutaway": {
            description: "Shot away from main action - Provides context or reaction",
            emotion: "Contextual, provides breathing room, shows environment",
            useCase: "Showing reactions, environmental context, editorial purposes"
        }
    },

    MOVEMENT_TYPES: {
        "Static": {
            description: "Camera doesn't move - Stable, composed, deliberate framing",
            emotion: "Stable, formal, controlled",
            useCase: "Formal interviews, composed shots, emphasizing stability"
        },
        "Pan": {
            description: "Horizontal camera movement - Follows action or reveals space",
            emotion: "Smooth, revealing, following",
            useCase: "Following moving subjects, revealing landscapes"
        },
        "Tilt": {
            description: "Vertical camera movement - Reveals height or follows vertical action",
            emotion: "Revealing, following vertical movement",
            useCase: "Showing tall buildings, following vertical action"
        },
        "Dolly In": {
            description: "Camera moves toward subject - Increases intimacy and tension",
            emotion: "Intensifying, focusing attention, building tension",
            useCase: "Building suspense, increasing emotional intensity"
        },
        "Dolly Out": {
            description: "Camera moves away from subject - Reveals context, creates distance",
            emotion: "Revealing, distancing, providing context",
            useCase: "Revealing surprise elements, showing isolation"
        },
        "Truck/Track": {
            description: "Camera moves parallel to subject - Maintains consistent framing while showing movement",
            emotion: "Following, maintaining connection with moving subject",
            useCase: "Following walking characters, car scenes"
        },
        "Crane": {
            description: "Camera moves up and down on crane - Provides elevated perspective and smooth movement",
            emotion: "Elevated, smooth, cinematic",
            useCase: "Establishing shots, dramatic reveals, cinematic movements"
        },
        "Steadicam": {
            description: "Smooth handheld camera movement - Combines mobility with stability",
            emotion: "Smooth, following, immersive",
            useCase: "Following characters through spaces, smooth action sequences"
        },
        "Gimbal": {
            description: "Electronically stabilized smooth movement - Modern, precise, versatile",
            emotion: "Modern, smooth, precise",
            useCase: "Contemporary filmmaking, smooth complex movements"
        }
    },

    FOCUS_TECHNIQUES: {
        "Deep Focus": {
            description: "Everything in frame is in sharp focus - Shows multiple layers of action",
            emotion: "Allows viewer to choose what to look at, democratic viewing",
            useCase: "Complex scenes with multiple elements, artistic compositions"
        },
        "Shallow Focus": {
            description: "Only small portion of frame in focus - Directs attention to specific element",
            emotion: "Focused attention, dreamy, cinematic",
            useCase: "Portraits, isolating subjects, creating mood"
        },
        "Rack Focus": {
            description: "Focus shifts from one element to another during shot - Guides viewer's attention",
            emotion: "Revealing, guiding attention, narrative control",
            useCase: "Revealing new information, shifting story focus"
        },
        "Soft Focus": {
            description: "Slightly blurred focus for dreamy effect - Creates romantic or nostalgic mood",
            emotion: "Dreamy, romantic, nostalgic, ethereal",
            useCase: "Romantic scenes, flashbacks, dream sequences"
        },
        "Split Diopter": {
            description: "Part of lens creates two focus planes - Keeps foreground and background sharp",
            emotion: "Surreal, everything important is visible",
            useCase: "Showing multiple important elements at different distances"
        }
    }
};

// Helper functions for easy access
const getAllCameraAngles = () => {
    const angles = [];
    Object.keys(CAMERA_ANGLES_POSITIONS).forEach(category => {
        Object.keys(CAMERA_ANGLES_POSITIONS[category]).forEach(angle => {
            angles.push({
                category: category.replace(/_/g, ' ').toLowerCase(),
                name: angle,
                ...CAMERA_ANGLES_POSITIONS[category][angle]
            });
        });
    });
    return angles;
};

const getCameraAnglesByCategory = (category) => {
    const categoryKey = category.toUpperCase().replace(/ /g, '_');
    return CAMERA_ANGLES_POSITIONS[categoryKey] || {};
};

const searchCameraAngles = (query) => {
    const allAngles = getAllCameraAngles();
    const lowercaseQuery = query.toLowerCase();

    return allAngles.filter(angle =>
        angle.name.toLowerCase().includes(lowercaseQuery) ||
        angle.description.toLowerCase().includes(lowercaseQuery) ||
        angle.emotion.toLowerCase().includes(lowercaseQuery) ||
        angle.useCase.toLowerCase().includes(lowercaseQuery)
    );
};

// Simplified version matching your original format
export const cameraAngles = {
    heightLevels: [
        "Eye Level",
        "Low Angle",
        "High Angle",
        "Bird's Eye",
        "Overhead",
        "Worm's Eye"
    ],

    distanceFromSubject: [
        "Extreme Close-Up",
        "Close-Up",
        "Medium Close-Up",
        "Medium Shot",
        "Medium Wide",
        "Wide Shot",
        "Extreme Wide"
    ],

    specialAngles: [
        "Dutch Tilt",
        "Canted Angle",
        "Crash Zoom",
        "Dolly Zoom",
        "Whip Pan",
        "Handheld"
    ],

    shotTypes: [
        "Over-the-Shoulder",
        "Point-of-View",
        "Reverse Shot",
        "Two Shot",
        "Three Shot",
        "Split Screen",
        "Insert Shot",
        "Cutaway"
    ],

    movementTypes: [
        "Static",
        "Pan",
        "Tilt",
        "Dolly In",
        "Dolly Out",
        "Truck/Track",
        "Crane",
        "Steadicam",
        "Gimbal"
    ],

    focusTechniques: [
        "Deep Focus",
        "Shallow Focus",
        "Rack Focus",
        "Soft Focus",
        "Split Diopter"
    ]
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CAMERA_ANGLES_POSITIONS,
        cameraAngles,
        getAllCameraAngles,
        getCameraAnglesByCategory,
        searchCameraAngles
    };
}

// Example usage
console.log('Total camera techniques:', getAllCameraAngles().length);
console.log('Height levels:', Object.keys(CAMERA_ANGLES_POSITIONS.HEIGHT_LEVELS));
console.log('Search "close":', searchCameraAngles('close').map(a => a.name));