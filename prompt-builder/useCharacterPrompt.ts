// "use client"

// hooks/useCharacterPrompt.ts
import { useCharacterContext } from '@/contexts/CharacterContext';
import { useMemo, useEffect, useState } from 'react';

interface PromptOptions {
    includeBackground?: boolean;
    artStyle?: string;
    quality?: string;
    lighting?: string;
    cameraAngle?: string;
}

export function useCharacterPrompt(options: PromptOptions = {}) {
    const context = useCharacterContext();
    const [prompt, setPrompt] = useState<string>('');
    const [promptSegments, setPromptSegments] = useState<Record<string, string>>({});

    const {
        includeBackground = false,
        artStyle = 'highly detailed digital art',
        quality = '8K resolution, sharp focus',
        lighting = 'cinematic lighting',
        cameraAngle = 'medium shot'
    } = options;

    // Generate prompt segments based on character data
    const generatedPrompt = useMemo(() => {
        const segments: Record<string, string> = {};

        // BASIC CHARACTER INFO
        segments.basicInfo = buildBasicInfo();

        // PHYSICAL APPEARANCE
        segments.physicalAppearance = buildGeneralPhysicalAppearance();

        // FACIAL FEATURES
        segments.facialFeatures = buildFacialFeatures();

        // HAIR DETAILS
        segments.hairDetails = buildHairDetails();

        // CLOTHING & ACCESSORIES
        segments.clothing = buildClothingDetails();

        // ACCESSORIES
        segments.accessories = buildAccessories();

        // STYLE & QUALITY
        segments.technical = buildTechnicalSpecs();

        // Combine all segments into final prompt
        const finalPrompt = Object.values(segments)
            .filter(segment => segment.trim() !== '')
            .join(', ');

        return { prompt: finalPrompt, segments };
    }, [
        // Basic Info Dependencies
        context.firstName, context.lastName, context.alias, context.gender,
        context.age, context.race,

        // Physical Dependencies
        context.height, context.build, context.proportion, context.physicalMovement,
        context.skinTone,

        // Facial Dependencies
        context.selectedFacialFeature, context.selectedFacialHair, context.selectedMarks,
        context.eyeColor, context.eyeShape, context.notableEyeFeature, context.eyeAccessory,
        context.eyeBrowStyle, context.eyeBrowPosition, context.eyeBrowTexture, context.eyeBrowFeature,
        context.selectedNoseFeatures, context.selectedEarFeatures,
        context.selectedLipFeatures, context.teethVariation, context.dentalAccessory,

        // Hair Dependencies
        context.hairTexture, context.selectedAccessories, context.hairLength,
        context.hairColor, context.hairQuirks,

        // Clothing Dependencies
        context.fullBodyWear, context.fullBodyWearMaterial, context.fullBodyWearColor,
        context.upperBodyWear, context.upperBodyWearMaterial, context.upperBodyWearColor,
        context.lowerBodyWear, context.lowerBodyWearMaterial, context.lowerBodyWearColor,
        context.outerBodyWear, context.outerBodyWearMaterial, context.outerBodyWearColor,
        context.extraBodyWear, context.extraBodyWearMaterial, context.extraBodyWearColor,
        context.footwear, context.footWearColor, context.footWearMaterial,

        // Accessories Dependencies
        context.headWear, context.headWearColor, context.headWearMaterial,
        context.eyeWear, context.eyeWearColor,
        context.neckWear, context.neckWearColor, context.neckWearMaterial,
        context.handWear, context.handWearColor, context.handWearMaterial,

        // Options Dependencies
        artStyle, quality, lighting, cameraAngle, includeBackground
    ]);

    // Update state when prompt changes
    useEffect(() => {
        setPrompt(generatedPrompt.prompt);
        setPromptSegments(generatedPrompt.segments);
    }, [generatedPrompt]);

    // BUILDER FUNCTIONS
	function buildBasicInfo(): string {
		const parts: string[] = [];

		// Age
		if (context.age) {
			parts.push(`${context.age} year old`);
		}

		// Gender
		if (context.gender) {
			parts.push(context.gender.toLowerCase());
		}

		// Race/Ethnicity
		if (context.race?.value) {
			parts.push(context.race.value.toLowerCase());
		}

		// Handle names and aliases
		const nameParts = [];
		if (context.firstName) nameParts.push(context.firstName);
		if (context.lastName) nameParts.push(context.lastName);

		const fullName = nameParts.join(' ').trim();
		const alias = context.alias?.trim();

		if (fullName || alias) {
			let nameDescription = '';

			if (fullName && alias) {
				nameDescription = `${fullName}, also known as ${alias}`;
			} else if (fullName) {
				nameDescription = fullName;
			} else {
				nameDescription = alias;
			}

			if (nameDescription) {
				parts.push(`named ${nameDescription}`);
			}
		}

		// Build the final string with proper punctuation
		let result = '';

		if (parts.length > 0) {
			// Capitalize first letter of the first part
			if (parts[0]) {
				parts[0] = parts[0][0].toUpperCase() + parts[0].slice(1);
			}

			// Join all parts with commas (except last two which get "and")
			if (parts.length > 2) {
				const allButLast = parts.slice(0, -1).join(', ');
				result = `${allButLast} and ${parts[parts.length - 1]}`;
			} else if (parts.length === 2) {
				result = parts.join(' and ');
			} else {
				result = parts[0];
			}

			// Add period at the end
			result += '.';
		}

		return result;
	}

	function buildGeneralPhysicalAppearance(): string {
		const parts: string[] = [];

		// Body characteristics
		if (context.height) parts.push(`${context.height} height`);
		if (context.build) parts.push(`${context.build} build`);
		if (context.proportion) parts.push(`${context.proportion} proportions`);
		if (context.skinTone) parts.push(`${context.skinTone} skin`);
		if (context.physicalMovement) parts.push(`${context.physicalMovement} posture`);

		return parts.join(', ');
	}

	function buildFacialFeatures(): string {
		const parts: string[] = [];

		// Eyes
		if (context.eyeColor) parts.push(`${context.eyeColor} eyes`);
		if (context.eyeShape) parts.push(`${context.eyeShape} eye shape`);
		if (context.notableEyeFeature) parts.push(`${context.notableEyeFeature}`);
		if (context.eyeAccessory) parts.push(`Eye accessory is ${context.eyeAccessory}`);

		// Eyebrows
		if (context.eyeBrowStyle) parts.push(`${context.eyeBrowStyle} eyebrows`);
		if (context.eyeBrowPosition) parts.push(`${context.eyeBrowPosition} eyebrow position`);
		if (context.eyeBrowTexture) parts.push(`${context.eyeBrowTexture} brow texture`);
		if (context.notableEyeFeature) parts.push(`Notable eyebrow feature is ${context.notableEyeFeature} `);

		// Facial structure
		if (context.selectedFacialFeature && typeof context.selectedFacialFeature === 'object') {
			Object.entries(context.selectedFacialFeature).forEach(([category, feature]) => {
				if (feature && typeof feature === 'object' && 'value' in feature) {
					parts.push(`${feature.value} ${category.toLowerCase()}`);
				}
			});
		}

		// Facial hair
		if (context.selectedFacialHair && typeof context.selectedFacialHair === 'object') {
			Object.entries(context.selectedFacialHair).forEach(([type, style]) => {
				if (style) parts.push(`${style} ${type.toLowerCase()}`);
			});
		}

		// Marks and features
		if (context.selectedMarks && typeof context.selectedMarks === 'object') {
			Object.values(context.selectedMarks).forEach(mark => {
				if (mark) parts.push(`${mark}`);
			});
		}

		// Nose features
		if (context.selectedNoseFeatures && typeof context.selectedNoseFeatures === 'object') {
			Object.entries(context.selectedNoseFeatures).forEach(([category, feature]) => {
				if (feature) parts.push(`Nose ${category}: ${feature}`);
			});
		}

		// Ear features
		if (context.selectedEarFeatures && typeof context.selectedEarFeatures === 'object') {
			Object.entries(context.selectedEarFeatures).forEach(([category, feature]) => {
				if (feature) parts.push(`Ear ${category}: ${feature}`);
			});
		}

		// Lip features
		if (context.selectedLipFeatures && typeof context.selectedLipFeatures === 'object') {
			Object.entries(context.selectedLipFeatures).forEach(([category, feature]) => {
				if (feature) parts.push(`Lip ${category}: ${feature}`);
			});
		}

		// Teeth variations
		if (context.teethVariation) parts.push(`${context.teethVariation} teeth`);
		if (context.dentalAccessory) parts.push(`Teeth Accessory is ${context.dentalAccessory}`);

		return parts.join(', ');
	}

    function buildHairDetails(): string {
        const parts: string[] = [];

        if (context.hairColor) parts.push(`${context.hairColor} hair`);
        if (context.hairLength) parts.push(`${context.hairLength} length`);
        if (context.hairTexture) parts.push(`${context.hairTexture} texture`);

        // Hair quirks
        if (context.hairQuirks && context.hairQuirks.length > 0) {
            const quirks = context.hairQuirks.filter(q => q !== 'No Quirks');
            if (quirks.length > 0) {
                parts.push(`with ${quirks.join(' and ')}`);
            }
        }

        // Hair accessories
        if (context.selectedAccessories && typeof context.selectedAccessories === 'object') {
            Object.values(context.selectedAccessories).forEach(accessory => {
                if (accessory) parts.push(`${accessory} in hair`);
            });
        }

        return parts.join(', ');
    }

    function buildClothingDetails(): string {
        const parts: string[] = [];

        // Full body wear (takes priority)
        if (context.fullBodyWear?.value) {
            let clothing = context.fullBodyWear.value;
            if (context.fullBodyWearColor) clothing = `${context.fullBodyWearColor} ${clothing}`;
            if (context.fullBodyWearMaterial?.value) {
                clothing = `${context.fullBodyWearMaterial.value} ${clothing}`;
            }
            parts.push(`wearing ${clothing}`);
        } else {
            // Individual pieces
            if (context.upperBodyWear?.value) {
                let upper = context.upperBodyWear.value;
                if (context.upperBodyWearColor) upper = `${context.upperBodyWearColor} ${upper}`;
                if (context.upperBodyWearMaterial?.value) {
                    upper = `${context.upperBodyWearMaterial.value} ${upper}`;
                }
                parts.push(upper);
            }

            if (context.lowerBodyWear?.value) {
                let lower = context.lowerBodyWear.value;
                if (context.lowerBodyWearColor) lower = `${context.lowerBodyWearColor} ${lower}`;
                if (context.lowerBodyWearMaterial?.value) {
                    lower = `${context.lowerBodyWearMaterial.value} ${lower}`;
                }
                parts.push(lower);
            }

            if (context.outerBodyWear?.value) {
                let outer = context.outerBodyWear.value;
                if (context.outerBodyWearColor) outer = `${context.outerBodyWearColor} ${outer}`;
                if (context.outerBodyWearMaterial?.value) {
                    outer = `${context.outerBodyWearMaterial.value} ${outer}`;
                }
                parts.push(outer);
            }

            if (context.extraBodyWear?.value) {
                let extra = context.extraBodyWear.value;
                if (context.extraBodyWearColor) extra = `${context.extraBodyWearColor} ${extra}`;
                if (context.extraBodyWearMaterial?.value) {
                    extra = `${context.extraBodyWearMaterial.value} ${extra}`;
                }
                parts.push(extra);
            }
        }

        // Footwear
        if (context.footwear?.value) {
            let shoes = context.footwear.value;
            if (context.footWearColor) shoes = `${context.footWearColor} ${shoes}`;
            if (context.footWearMaterial?.value) {
                shoes = `${context.footWearMaterial.value} ${shoes}`;
            }
            parts.push(shoes);
        }

        return parts.join(', ');
    }

    function buildAccessories(): string {
        const parts: string[] = [];

        // Head wear
        if (context.headWear?.value) {
            let headpiece = context.headWear.value;
            if (context.headWearColor) headpiece = `${context.headWearColor} ${headpiece}`;
            if (context.headWearMaterial?.value) {
                headpiece = `${context.headWearMaterial.value} ${headpiece}`;
            }
            parts.push(headpiece);
        }

        // Eye wear
        if (context.eyeWear?.value) {
            let eyepiece = context.eyeWear.value;
            if (context.eyeWearColor) eyepiece = `${context.eyeWearColor} ${eyepiece}`;
            parts.push(eyepiece);
        }

        // Neck wear
        if (context.neckWear?.value) {
            let neckpiece = context.neckWear.value;
            if (context.neckWearColor) neckpiece = `${context.neckWearColor} ${neckpiece}`;
            if (context.neckWearMaterial?.value) {
                neckpiece = `${context.neckWearMaterial.value} ${neckpiece}`;
            }
            parts.push(neckpiece);
        }

        // Hand wear
        if (context.handWear && typeof context.handWear === 'object') {
            Object.values(context.handWear).forEach(item => {
                if (item) {
                    let handpiece = item as string;
                    if (context.handWearColor) handpiece = `${context.handWearColor} ${handpiece}`;
                    if (context.handWearMaterial?.value) {
                        handpiece = `${context.handWearMaterial.value} ${handpiece}`;
                    }
                    parts.push(handpiece);
                }
            });
        }

        return parts.join(', ');
    }

    function buildTechnicalSpecs(): string {
        const parts: string[] = [];

        // Camera and composition
        parts.push(cameraAngle);

        // Lighting
        parts.push(lighting);

        // Art style
        parts.push(artStyle);

        // Quality
        parts.push(quality);

        // Background
        if (includeBackground) {
            parts.push('detailed background');
        } else {
            parts.push('simple background');
        }

        return parts.join(', ');
    }

    return {
        prompt,
        promptSegments,
        updateOptions: (newOptions: Partial<PromptOptions>) => {
            // This would trigger a re-render with new options
            Object.assign(options, newOptions);
        },
        getSegment: (segmentName: keyof typeof promptSegments) => promptSegments[segmentName],
        isEmpty: prompt.trim() === '',
        wordCount: prompt.split(' ').length,
        characterCount: prompt.length
    };
}

// Enhanced hook with additional features
export function useEnhancedCharacterPrompt(options: PromptOptions = {}) {
    const basePrompt = useCharacterPrompt(options);
    const [promptHistory, setPromptHistory] = useState<string[]>([]);
    const [favoritePrompts, setFavoritePrompts] = useState<string[]>([]);

    // Track prompt history
    useEffect(() => {
        if (basePrompt.prompt && !basePrompt.isEmpty) {
            setPromptHistory(prev => {
                const newHistory = [basePrompt.prompt, ...prev.slice(0, 9)]; // Keep last 10
                return Array.from(new Set(newHistory)); // Remove duplicates
            });
        }
    }, [basePrompt.prompt, basePrompt.isEmpty]);

    const addToFavorites = (prompt: string = basePrompt.prompt) => {
        setFavoritePrompts(prev => {
            if (!prev.includes(prompt)) {
                return [...prev, prompt];
            }
            return prev;
        });
    };

    const removeFromFavorites = (prompt: string) => {
        setFavoritePrompts(prev => prev.filter(p => p !== prompt));
    };

    const generateVariations = (count: number = 3) => {
        const variations: string[] = [];
        const baseSegments = basePrompt.promptSegments;

        // Create variations by modifying technical specs
        const lightingOptions = ['dramatic lighting', 'soft lighting', 'golden hour lighting', 'studio lighting'];
        const angleOptions = ['close-up', 'medium shot', 'full body shot', 'wide shot'];
        const styleOptions = ['photorealistic', 'digital art', 'oil painting style', 'anime style'];

        for (let i = 0; i < count; i++) {
            const segments = { ...baseSegments };
            segments.technical = [
                angleOptions[i % angleOptions.length],
                lightingOptions[i % lightingOptions.length],
                styleOptions[i % styleOptions.length],
                'high quality, detailed'
            ].join(', ');

            variations.push(Object.values(segments).filter(s => s.trim() !== '').join(', '));
        }

        return variations;
    };

    return {
        ...basePrompt,
        promptHistory,
        favoritePrompts,
        addToFavorites,
        removeFromFavorites,
        generateVariations,
        exportPrompt: (format: 'text' | 'json' | 'markdown' = 'text') => {
            switch (format) {
                case 'json':
                    return JSON.stringify({
                        prompt: basePrompt.prompt,
                        segments: basePrompt.promptSegments,
                        metadata: {
                            wordCount: basePrompt.wordCount,
                            characterCount: basePrompt.characterCount,
                            generatedAt: new Date().toISOString()
                        }
                    }, null, 2);
                case 'markdown':
                    return `# Character Prompt\n\n**Full Prompt:**\n${basePrompt.prompt}\n\n**Segments:**\n${Object.entries(basePrompt.promptSegments)
                            .map(([key, value]) => `- **${key}:** ${value}`)
                            .join('\n')
                        }\n\n**Stats:**\n- Words: ${basePrompt.wordCount}\n- Characters: ${basePrompt.characterCount}`;
                default:
                    return basePrompt.prompt;
            }
        }
    };
}