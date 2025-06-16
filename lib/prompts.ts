import { buildBasicInfo, formatArrayStringValues, formatObjectOfArrays, getObjectsKeyAndValue } from "@/prompt-builder/characterPromptBuilder"
import { getPromptRequirements, wiskPromptRequirements } from "./prompt-helpers";

// export const buildGenerateCharacterPrompt = (context: any) => {
//     return `
    
//         **BASIC INFO:**
//         ${buildBasicInfo(context)}

//         **General Physical:**
//         Height: ${context?.height}
//         Build: ${JSON.stringify(context.build)}
//         Proportion: ${context?.proportion}
//         Physical Movement: ${JSON.stringify(context.physicalMovement)}

//         **Eyes & Eyebrows:**
//         Eye Color: ${context?.eyeColor}
//         Eye Shape: ${context?.eyeShape}
//         Notable Eye Features: ${context?.notableEyeFeature}
//         Eye Accessory: ${context?.eyeAccessory}
//         Eye Brow Style: ${context?.eyeBrowStyle}
//         Eye Brow Position: ${context?.eyeBrowPosition}
//         Eye Brow Texture: ${context?.eyeBrowTexture}
//         Eye Brow Feature: ${context?.eyeBrowFeature}

//         **Facial Features:**
//         Facial Features: ${getObjectsKeyAndValue(context.selectedFacialFeature)}
//         Facial Marks: ${JSON.stringify(context.selectedMarks)}

//         **Facial Hair:**
//         Beard: ${context?.selectedFacialHair?.beards}
//         Mustache: ${context?.selectedFacialHair?.mustaches}
//         Partial Hair: ${context?.selectedFacialHair?.partialHair}
//         Fantasy Hair: ${context?.selectedFacialHair?.fantasyHair}

//         **Hair Details:**
//         Hair Color: ${context?.hairColor}
//         Hair Length: ${context?.hairLength}
//         Hair Texture: ${context?.hairTexture}
//         Hair Quirks: ${formatArrayStringValues(context.hairQuirks)}
//         Hair Accessories: ${JSON.stringify(context.selectedAccessories)}

//         **Skin Details:**
//         Skin Tone: ${context?.skinTone}

//         **Nose Features:**
//         Nose Shape: ${context?.selectedNoseFeatures?.shape}
//         Nose Size: ${context?.selectedNoseFeatures?.size}
//         Nose Piercings: ${context?.selectedNoseFeatures?.piercings}
//         Nose Fantasy Types: ${context?.selectedNoseFeatures?.fantasyTypes}
//         Nose Augmentations: ${context?.selectedNoseFeatures?.augmentations}
//         Nose Modifications: ${context?.selectedNoseFeatures?.modifications}
//         Nose Animal Features: ${context?.selectedNoseFeatures?.animalFeatures}

//         **Ear Features:**
//         Ear Shape: ${context?.selectedEarFeatures?.shape}
//         Ear Size: ${context?.selectedEarFeatures?.size}
//         Ear Piercings: ${context?.selectedEarFeatures?.piercings}
//         Ear Jewelry Materials: ${context?.selectedEarFeatures?.jewelryMaterials}
//         Ear Augmentations: ${context?.selectedEarFeatures?.augmentations}

//         **Lip & Teeth Features:**
//         Lip Shape: ${context?.selectedLipFeatures?.shape}
//         Lip Fullness: ${context?.selectedLipFeatures?.fullness}
//         Lip Adornments: ${context?.selectedLipFeatures?.adornments}
//         Lip Fantasy Types: ${context?.selectedLipFeatures?.fantasyTypes}
//         Lip Augmentations: ${context?.selectedLipFeatures?.augmentations}
//         Lip Piercings: ${context?.selectedLipFeatures?.piercings}
//         Lip Modifications: ${context?.selectedLipFeatures?.piercings}
//         Teeth Variation: ${context?.teethVariation}
//         Dental Accessory: ${context?.dentalAccessory}

//         **Clothing:**
//         Full Body Wear: ${context?.fullBodyWear?.value}
//         Full Body Wear Color: ${context?.fullBodyWearColor}
//         Full Body Wear Pattern: ${context?.fullBodyWearPattern?.value}
//         Full Body Wear Material: ${context?.fullBodyWearMaterial?.category} ${context?.fullBodyWearMaterial?.value}
//         Full Body Wear Condition: ${formatObjectOfArrays(context.fullBodyWearCondition)}

//         Upper Body Wear: ${context?.upperBodyWear?.value}
//         Upper Body Wear Color: ${context?.upperBodyWearColor}
//         Upper Body Wear Pattern: ${context?.upperBodyWearPattern?.value}
//         Upper Body Wear Material: ${context?.upperBodyWearMaterial?.category} ${context?.upperBodyWearMaterial?.value}
//         Upper Body Wear Condition: ${formatObjectOfArrays(context.upperBodyWearCondition)}

//         Lower Body Wear: ${context?.lowerBodyWear?.value}
//         Lower Body Wear Color: ${context?.lowerBodyWearColor}
//         Lower Body Wear Pattern: ${context?.lowerBodyWearPattern?.value}
//         Lower Body Wear Material: ${context?.lowerBodyWearMaterial?.category} ${context?.lowerBodyWearMaterial?.value}
//         Lower Body Wear Condition: ${formatObjectOfArrays(context.lowerBodyWearCondition)}

//         Outer Body Wear: ${context?.outerBodyWear?.value}
//         Outer Body Wear Color: ${context?.outerBodyWearColor}
//         Outer Body Wear Pattern: ${context?.outerBodyWearPattern?.value}
//         Outer Body Wear Material: ${context?.outerBodyWearMaterial?.category} ${context?.outerBodyWearMaterial?.value}
//         Outer Body Wear Condition: ${formatObjectOfArrays(context.outerBodyWearCondition)}

//         Extra Body Wear: ${context?.extraBodyWear?.value}
//         Extra Body Wear Color: ${context?.extraBodyWearColor}
//         Extra Body Wear Pattern: ${context?.extraBodyWearPattern?.value}
//         Extra Body Wear Material: ${context?.extraBodyWearMaterial?.category} ${context?.extraBodyWearMaterial?.value}
//         Extra Body Wear Condition: ${formatObjectOfArrays(context.extraBodyWearCondition)}

//         **Footwear Details:**
//         Footwear: ${context?.footwear?.value}
//         Footwear Color: ${context?.footWearColor}
//         Footwear Material: ${context?.footWearMaterial?.value}
//         Footwear Pattern: ${context?.footWearPattern?.value}
//         Footwear Condition: ${formatObjectOfArrays(context.footWearCondition)}

//         **Clothing Accessories:**
//         Head Wear: ${context?.headWear?.value}
//         Head Wear Color: ${context?.headWearColor}
//         Head Wear Material: ${context?.headWearMaterial?.category} ${context?.headWearMaterial?.value}
//         Head Wear Pattern: ${context?.headWearPattern?.category} ${context?.headWearPattern?.value}
//         Head Wear Condition: ${context?.headWearCondition}

//         Eye Wear: ${context?.eyeWear?.value}
//         Eye Wear Color: ${context?.eyeWearColor}
//         Eye Wear Condition: ${context?.eyeWearCondition}

//         Neck Wear: ${context?.neckWear?.value}
//         Neck Wear Color: ${context?.neckWearColor}
//         Neck Wear Material: ${context?.neckWearMaterial?.category} ${context?.neckWearMaterial?.value}
//         Neck Wear Pattern: ${context?.neckWearPattern?.category} ${context?.neckWearPattern?.value}

//         Left Hand Wear: ${context?.leftHandWear}
//         Left Hand Wear Color: ${context?.leftHandWearColor}
//         Left Hand Wear Material: ${context?.leftHandWearMaterial?.category} ${context?.leftHandWearMaterial?.value}
        
//         Right Hand Wear: ${context?.rightHandWear}
//         Right Hand Wear Color: ${context?.rightHandWearColor}
//         Right Hand Wear Material: ${context?.rightHandWearMaterial?.category} ${context?.rightHandWearMaterial?.value}
        
//         Right Wrist Wear: ${context?.rightWristWear}
//         Right Wrist Wear Color: ${context?.rightWristWearColor}
//         Right Wrist Wear Material: ${context?.rightWristWearMaterial?.category} ${context?.rightWristWearMaterial?.value}
        
//         Left Wrist Wear: ${context?.leftWristWear}
//         Left Wrist Wear Color: ${context?.leftWristWearColor}
//         Left Wrist Wear Material: ${context?.leftWristWearMaterial?.category} ${context?.leftWristWearMaterial?.value}
        
//         Right Finger Wear: ${context?.rightFingerWear}
//         Right Finger Wear Color: ${context?.rightFingerWearColor}
//         Right Finger Wear Material: ${context?.rightFingerWearMaterial?.category} ${context?.rightFingerWearMaterial?.value}
        
//         Left Finger Wear: ${context?.leftFingerWear}
//         Left Finger Wear Color: ${context?.leftFingerWearColor}
//         Left Finger Wear Material: ${context?.leftFingerWearMaterial?.category} ${context?.leftFingerWearMaterial?.value}
        

//         **Tech Accessories:**
//         ${formatObjectOfArrays(context.techAccessories)}


//     `
    
// }






// Helper function to check if a value is valid (not null, undefined, or empty)
const isValid = (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') {
        if (value.hasOwnProperty('value')) return isValid(value.value);
        return Object.keys(value).length > 0;
    }
    return true;
};

// Helper function to safely format values
const formatValue = (value: any): string => {
    if (typeof value === 'object' && !Array.isArray(value)) {
        return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
        return JSON.stringify(value);
    }
    return String(value);
};

// Helper function to add field to prompt if valid
const addField = (label: string, value: any): string => {
    if (isValid(value)) {
        return `        ${label}: ${formatValue(value)}\n`;
    }
    return '';
};

// Helper function to add section header only if it has content
const addSection = (title: string, content: string): string => {
    if (content.trim()) {
        return `\n        **${title}:**\n${content}`;
    }
    return '';
};

// Helper function to handle nested object properties
const addNestedField = (label: string, obj: any, property: string): string => {
    if (obj && isValid(obj[property])) {
        return addField(label, obj[property]);
    }
    return '';
};

// Helper function to handle object with category and value
const addCategoryValueField = (label: string, obj: any): string => {
    if (obj && (isValid(obj.category) || isValid(obj.value))) {
        const category = isValid(obj.category) ? obj.category : '';
        const value = isValid(obj.value) ? obj.value : '';
        const combined = `${category} ${value}`.trim();
        if (combined) {
            return addField(label, combined);
        }
    }
    return '';
};

export const buildGenerateCharacterPrompt = (context: any, aIModel: string) => {
    console.log({aIModel});

    let requirement = getPromptRequirements(aIModel)
    
    let prompt = `Act as a professional Prompt Engineer and create a prompt for the following character that can be used to create an image of the character using ${aIModel}'s image generator prompt structure.
        **Prompt Requirements & Structure:**
        ${requirement}
    `;

    // Basic Info Section
    let basicInfoContent = '';
    if (isValid(buildBasicInfo(context))) {
        basicInfoContent = `        ${buildBasicInfo(context)}\n`;
    }
    prompt += addSection('BASIC INFO', basicInfoContent);

    // General Physical Section
    let generalPhysicalContent = '';
    generalPhysicalContent += addField('Height', context?.height);
    generalPhysicalContent += addField('Build', context?.build?.value);    
    generalPhysicalContent += addField('Proportion', context?.proportion);
    generalPhysicalContent += addField('Physical Movement', context?.physicalMovement?.value);
    prompt += addSection('General Physical', generalPhysicalContent);

    // Eyes & Eyebrows Section
    let eyesContent = '';
    eyesContent += addField('Eye Color', context?.eyeColor);
    eyesContent += addField('Eye Shape', context?.eyeShape);
    eyesContent += addField('Notable Eye Features', context?.notableEyeFeature);
    eyesContent += addField('Eye Accessory', context?.eyeAccessory);
    eyesContent += addField('Eye Brow Style', context?.eyeBrowStyle);
    eyesContent += addField('Eye Brow Position', context?.eyeBrowPosition);
    eyesContent += addField('Eye Brow Texture', context?.eyeBrowTexture);
    eyesContent += addField('Eye Brow Feature', context?.eyeBrowFeature);
    prompt += addSection('Eyes & Eyebrows', eyesContent);

    // Facial Features Section
    let facialFeaturesContent = '';
    if (isValid(context?.selectedFacialFeature)) {
        facialFeaturesContent += addField('Facial Features', getObjectsKeyAndValue(context.selectedFacialFeature));
    }
    facialFeaturesContent += addField('Facial Marks', formatObjectOfArrays(context?.selectedMarks));
    prompt += addSection('Facial Features', facialFeaturesContent);

    // Facial Hair Section
    let facialHairContent = '';
    facialHairContent += addNestedField('Beard', context?.selectedFacialHair, 'beards');
    facialHairContent += addNestedField('Mustache', context?.selectedFacialHair, 'mustaches');
    facialHairContent += addNestedField('Partial Hair', context?.selectedFacialHair, 'partialHair');
    facialHairContent += addNestedField('Fantasy Hair', context?.selectedFacialHair, 'fantasyHair');
    prompt += addSection('Facial Hair', facialHairContent);

    // Hair Details Section
    let hairContent = '';
    hairContent += addField('Hair Color', context?.hairColor);
    hairContent += addField('Hair Length', context?.hairLength);
    hairContent += addField('Hair Texture', context?.hairTexture);
    if (isValid(context?.hairQuirks)) {
        hairContent += addField('Hair Quirks', formatArrayStringValues(context.hairQuirks));
    }
    hairContent += addField('Hair Accessories', formatObjectOfArrays(context?.selectedAccessories));
    prompt += addSection('Hair Details', hairContent);

    // Skin Details Section
    let skinContent = '';
    skinContent += addField('Skin Tone', context?.skinTone);
    prompt += addSection('Skin Details', skinContent);

    // Nose Features Section
    let noseContent = '';
    noseContent += addNestedField('Nose Shape', context?.selectedNoseFeatures, 'shape');
    noseContent += addNestedField('Nose Size', context?.selectedNoseFeatures, 'size');
    noseContent += addNestedField('Nose Piercings', context?.selectedNoseFeatures, 'piercings');
    noseContent += addNestedField('Nose Fantasy Types', context?.selectedNoseFeatures, 'fantasyTypes');
    noseContent += addNestedField('Nose Augmentations', context?.selectedNoseFeatures, 'augmentations');
    noseContent += addNestedField('Nose Modifications', context?.selectedNoseFeatures, 'modifications');
    noseContent += addNestedField('Nose Animal Features', context?.selectedNoseFeatures, 'animalFeatures');
    prompt += addSection('Nose Features', noseContent);

    // Ear Features Section
    let earContent = '';
    earContent += addNestedField('Ear Shape', context?.selectedEarFeatures, 'shape');
    earContent += addNestedField('Ear Size', context?.selectedEarFeatures, 'size');
    earContent += addNestedField('Ear Piercings', context?.selectedEarFeatures, 'piercings');
    earContent += addNestedField('Ear Jewelry Materials', context?.selectedEarFeatures, 'jewelryMaterials');
    earContent += addNestedField('Ear Augmentations', context?.selectedEarFeatures, 'augmentations');
    prompt += addSection('Ear Features', earContent);

    // Lip & Teeth Features Section
    let lipContent = '';
    lipContent += addNestedField('Lip Shape', context?.selectedLipFeatures, 'shape');
    lipContent += addNestedField('Lip Fullness', context?.selectedLipFeatures, 'fullness');
    lipContent += addNestedField('Lip Adornments', context?.selectedLipFeatures, 'adornments');
    lipContent += addNestedField('Lip Fantasy Types', context?.selectedLipFeatures, 'fantasyTypes');
    lipContent += addNestedField('Lip Augmentations', context?.selectedLipFeatures, 'augmentations');
    lipContent += addNestedField('Lip Piercings', context?.selectedLipFeatures, 'piercings');
    lipContent += addNestedField('Lip Modifications', context?.selectedLipFeatures, 'modifications');
    lipContent += addField('Teeth Variation', context?.teethVariation);
    lipContent += addField('Dental Accessory', context?.dentalAccessory);
    prompt += addSection('Lip & Teeth Features', lipContent);

    // Clothing Section
    let clothingContent = '';
    
    // Full Body Wear
    clothingContent += addNestedField('Full Body Wear', context?.fullBodyWear, 'value');
    clothingContent += addField('Full Body Wear Color', context?.fullBodyWearColor);
    clothingContent += addNestedField('Full Body Wear Pattern', context?.fullBodyWearPattern, 'value');
    clothingContent += addCategoryValueField('Full Body Wear Material', context?.fullBodyWearMaterial);
    if (isValid(context?.fullBodyWearCondition)) {
        clothingContent += addField('Full Body Wear Condition', formatObjectOfArrays(context.fullBodyWearCondition));
    }

    // Upper Body Wear
    clothingContent += addNestedField('Upper Body Wear', context?.upperBodyWear, 'value');
    clothingContent += addField('Upper Body Wear Color', context?.upperBodyWearColor);
    clothingContent += addNestedField('Upper Body Wear Pattern', context?.upperBodyWearPattern, 'value');
    clothingContent += addCategoryValueField('Upper Body Wear Material', context?.upperBodyWearMaterial);
    if (isValid(context?.upperBodyWearCondition)) {
        clothingContent += addField('Upper Body Wear Condition', formatObjectOfArrays(context.upperBodyWearCondition));
    }

    // Lower Body Wear
    clothingContent += addNestedField('Lower Body Wear', context?.lowerBodyWear, 'value');
    clothingContent += addField('Lower Body Wear Color', context?.lowerBodyWearColor);
    clothingContent += addNestedField('Lower Body Wear Pattern', context?.lowerBodyWearPattern, 'value');
    clothingContent += addCategoryValueField('Lower Body Wear Material', context?.lowerBodyWearMaterial);
    if (isValid(context?.lowerBodyWearCondition)) {
        clothingContent += addField('Lower Body Wear Condition', formatObjectOfArrays(context.lowerBodyWearCondition));
    }

    // Outer Body Wear
    clothingContent += addNestedField('Outer Body Wear', context?.outerBodyWear, 'value');
    clothingContent += addField('Outer Body Wear Color', context?.outerBodyWearColor);
    clothingContent += addNestedField('Outer Body Wear Pattern', context?.outerBodyWearPattern, 'value');
    clothingContent += addCategoryValueField('Outer Body Wear Material', context?.outerBodyWearMaterial);
    if (isValid(context?.outerBodyWearCondition)) {
        clothingContent += addField('Outer Body Wear Condition', formatObjectOfArrays(context.outerBodyWearCondition));
    }

    // Extra Body Wear
    clothingContent += addNestedField('Extra Body Wear', context?.extraBodyWear, 'value');
    clothingContent += addField('Extra Body Wear Color', context?.extraBodyWearColor);
    clothingContent += addNestedField('Extra Body Wear Pattern', context?.extraBodyWearPattern, 'value');
    clothingContent += addCategoryValueField('Extra Body Wear Material', context?.extraBodyWearMaterial);
    if (isValid(context?.extraBodyWearCondition)) {
        clothingContent += addField('Extra Body Wear Condition', formatObjectOfArrays(context.extraBodyWearCondition));
    }

    prompt += addSection('Clothing', clothingContent);

    // Footwear Details Section
    let footwearContent = '';
    footwearContent += addNestedField('Footwear', context?.footwear, 'value');
    footwearContent += addField('Footwear Color', context?.footWearColor);
    footwearContent += addNestedField('Footwear Material', context?.footWearMaterial, 'value');
    footwearContent += addNestedField('Footwear Pattern', context?.footWearPattern, 'value');
    if (isValid(context?.footWearCondition)) {
        footwearContent += addField('Footwear Condition', formatObjectOfArrays(context.footWearCondition));
    }
    prompt += addSection('Footwear Details', footwearContent);

    // Clothing Accessories Section
    let accessoriesContent = '';
    accessoriesContent += addNestedField('Head Wear', context?.headWear, 'value');
    accessoriesContent += addField('Head Wear Color', context?.headWearColor);
    accessoriesContent += addCategoryValueField('Head Wear Material', context?.headWearMaterial);
    accessoriesContent += addCategoryValueField('Head Wear Pattern', context?.headWearPattern);
    accessoriesContent += addField('Head Wear Condition', context?.headWearCondition);

    accessoriesContent += addNestedField('Eye Wear', context?.eyeWear, 'value');
    accessoriesContent += addField('Eye Wear Color', context?.eyeWearColor);
    accessoriesContent += addField('Eye Wear Condition', context?.eyeWearCondition);

    accessoriesContent += addNestedField('Neck Wear', context?.neckWear, 'value');
    accessoriesContent += addField('Neck Wear Color', context?.neckWearColor);
    accessoriesContent += addCategoryValueField('Neck Wear Material', context?.neckWearMaterial);
    accessoriesContent += addCategoryValueField('Neck Wear Pattern', context?.neckWearPattern);

    // Hand and Wrist Accessories
    accessoriesContent += addField('Left Hand Wear', context?.leftHandWear);
    accessoriesContent += addField('Left Hand Wear Color', context?.leftHandWearColor);
    accessoriesContent += addCategoryValueField('Left Hand Wear Material', context?.leftHandWearMaterial);

    accessoriesContent += addField('Right Hand Wear', context?.rightHandWear);
    accessoriesContent += addField('Right Hand Wear Color', context?.rightHandWearColor);
    accessoriesContent += addCategoryValueField('Right Hand Wear Material', context?.rightHandWearMaterial);

    accessoriesContent += addField('Right Wrist Wear', context?.rightWristWear);
    accessoriesContent += addField('Right Wrist Wear Color', context?.rightWristWearColor);
    accessoriesContent += addCategoryValueField('Right Wrist Wear Material', context?.rightWristWearMaterial);

    accessoriesContent += addField('Left Wrist Wear', context?.leftWristWear);
    accessoriesContent += addField('Left Wrist Wear Color', context?.leftWristWearColor);
    accessoriesContent += addCategoryValueField('Left Wrist Wear Material', context?.leftWristWearMaterial);

    accessoriesContent += addField('Right Finger Wear', context?.rightFingerWear);
    accessoriesContent += addField('Right Finger Wear Color', context?.rightFingerWearColor);
    accessoriesContent += addCategoryValueField('Right Finger Wear Material', context?.rightFingerWearMaterial);

    accessoriesContent += addField('Left Finger Wear', context?.leftFingerWear);
    accessoriesContent += addField('Left Finger Wear Color', context?.leftFingerWearColor);
    accessoriesContent += addCategoryValueField('Left Finger Wear Material', context?.leftFingerWearMaterial);

    prompt += addSection('Clothing Accessories', accessoriesContent);

    // Tech Accessories Section
    let techContent = '';
    if (isValid(context?.techAccessories)) {
        techContent += `        ${formatObjectOfArrays(context.techAccessories)}\n`;
    }
    prompt += addSection('Tech Accessories', techContent);

    prompt +=`Ensure you response is straight to the point and no extra details, just return the prompt and exit`

    return prompt.trim();
};