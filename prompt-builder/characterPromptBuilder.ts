import { CharacterContextType } from "@/interfaces/CharacterContextInterface";


// const {
//     includeBackground = false,
//     artStyle = 'highly detailed digital art',
//     quality = '8K resolution, sharp focus',
//     lighting = 'cinematic lighting',
//     cameraAngle = 'medium shot'
// } = options;

export function buildBasicInfo(context: CharacterContextType): string {
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
    // if (context.firstName) nameParts.push(context.firstName);
    // if (context.lastName) nameParts.push(context.lastName);

    // const fullName = nameParts.join(' ').trim();
    // const alias = context.alias?.trim();

    // if (fullName || alias) {
    //     let nameDescription = '';

    //     if (fullName && alias) {
    //         nameDescription = `${fullName}, also known as ${alias}`;
    //     } else if (fullName) {
    //         nameDescription = fullName;
    //     } else {
    //         nameDescription = alias;
    //     }

    //     if (nameDescription) {
    //         parts.push(`named ${nameDescription}`);
    //     }
    // }

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

export function buildGeneralPhysicalAppearance(context: CharacterContextType): string {
    const parts: string[] = [];

    // Body characteristics
    if (context.height) parts.push(`${context.height} height`);
    if (context.build) parts.push(`${context.build} build`);
    if (context.proportion) parts.push(`${context.proportion} proportions`);
    if (context.skinTone) parts.push(`${context.skinTone} skin`);
    if (context.physicalMovement) parts.push(`${context.physicalMovement} posture`);

    return parts.join(', ');
}

export function buildFacialFeatures(context: CharacterContextType): string {
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
            if (feature) {
                parts.push(`${feature} ${category.toLowerCase()}`);
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
        let marks = ``;
        marks += formatCondition(context.selectedMarks);
        if(marks) parts.push(`Facial Mark: ${marks}`)
    }

    // Nose features
    if (context.selectedNoseFeatures && typeof context.selectedNoseFeatures === 'object') {
        Object.entries(context.selectedNoseFeatures).forEach(([category, feature]) => {
            if (feature) {

                if (category === "fantasyTypes") {
                    parts.push(`Nose Fantasy Type: ${feature}`)
                }else if(category === "animalFeatures"){
                    parts.push(`Lip Animal Features: ${feature}`)
                }else{
                    parts.push(`Nose ${category}: ${feature}`)
                }
                // parts.push(`Nose ${category}: ${feature}`)
            };
            
        });
    }

    // Ear features
    if (context.selectedEarFeatures && typeof context.selectedEarFeatures === 'object') {
        Object.entries(context.selectedEarFeatures).forEach(([category, feature]) => {
            if (feature) { 
                if (category === "fantasyTypes") {
                    parts.push(`Ear Fantasy Type: ${feature}`)
                }else if(category === "dynamicTraits"){
                    parts.push(`Lip Dynamic Traits: ${feature}`)
                }else if(category === "jewelryMaterials"){
                    parts.push(`Lip Jewelry Materials: ${feature}`)
                }else{
                    parts.push(`Ear ${category}: ${feature}`)
                }
            };
        });
    }

    // Lip features
    if (context.selectedLipFeatures && typeof context.selectedLipFeatures === 'object') {
        Object.entries(context.selectedLipFeatures).forEach(([category, feature]) => {
            if (feature) {
                if (category === "fantasyTypes") {
                    parts.push(`Lip Fantasy Type: ${feature}`)
                }else if(category === "animalFeatures"){
                    parts.push(`Lip Animal Features: ${feature}`)
                }else if(category === "jewelryMaterials"){
                    parts.push(`Lip Jewelry Materials: ${feature}`)
                }else{
                    parts.push(`Lip ${category}: ${feature}`)
                }
            };
        });
    }

    // Teeth variations
    if (context.teethVariation) parts.push(`${context.teethVariation} teeth`);
    if (context.dentalAccessory) parts.push(`Teeth Accessory is ${context.dentalAccessory}`);

    return parts.join(', ');
}

export function buildHairDetails(context: CharacterContextType): string {
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

export function buildClothingDetails(context: CharacterContextType): string {
    const parts: string[] = [];

    // Full body wear (takes priority)
    if (context.fullBodyWear?.value) {
        let descriptionParts = [];

         // Add color if exists
        if (context.fullBodyWearColor) {
            descriptionParts.push(context.fullBodyWearColor.toLowerCase());
        }

        // Add pattern if exists
        if (context.fullBodyWearPattern?.value) {
            descriptionParts.push(`${context.fullBodyWearPattern.value.toLowerCase()} patterned`);
        }

        // Add material if exists
        if (context.fullBodyWearMaterial?.value) {
            descriptionParts.push(context.fullBodyWearMaterial.value.toLowerCase());
        }

        // Add the clothing item itself
        descriptionParts.push(context.fullBodyWear.value);

        // Build the main description
        let clothingDescription = descriptionParts.join(' ');

        // Handle conditions
        if (context.fullBodyWearCondition) {    
            clothingDescription += formatCondition(context.fullBodyWearCondition)
            parts.push(`Full upper body wear: ${clothingDescription}`)
        }

    } else {
        // Individual pieces
        if (context.upperBodyWear?.value) {
            let upper = context.upperBodyWear.value;
            if (context.upperBodyWearColor) upper = `${context.upperBodyWearColor} ${upper}`;
            if (context.upperBodyWearMaterial?.value) {
                upper = `${context.upperBodyWearMaterial.value} ${upper}`;
            }
            if (context.upperBodyWearPattern?.value) { // add Pattern
                upper = `${context.upperBodyWearPattern.value} patterned ${upper}`;
            }
            parts.push(`Upper body wear: ${upper}`);
        }

        if (context.lowerBodyWear?.value) {
            let lower = context.lowerBodyWear.value;
            if (context.lowerBodyWearColor) lower = `${context.lowerBodyWearColor} ${lower}`;
            if (context.lowerBodyWearMaterial?.value) {
                lower = `${context.lowerBodyWearMaterial.value} ${lower}`;
            }          
            if (context.lowerBodyWearPattern?.value) { // add Pattern
                lower = `${context.lowerBodyWearPattern.value} patterned ${lower}`;
            }  
            parts.push(`Lower body wear: ${lower}`);
        }

        if (context.outerBodyWear?.value) {
            let outer = context.outerBodyWear.value;
            if (context.outerBodyWearColor) outer = `${context.outerBodyWearColor} ${outer}`;
            if (context.outerBodyWearMaterial?.value) {
                outer = `${context.outerBodyWearMaterial.value} ${outer}`;
            }
            if (context.outerBodyWearPattern?.value) { // add Pattern
                outer = `${context.outerBodyWearPattern.value} patterned ${outer}`;
            }  
            parts.push(`Outer body wear: ${outer}`);
        }

        if (context.extraBodyWear?.value) {
            let extra = context.extraBodyWear.value;
            if (context.extraBodyWearColor) extra = `${context.extraBodyWearColor} ${extra}`;
            if (context.extraBodyWearMaterial?.value) {
                extra = `${context.extraBodyWearMaterial.value} ${extra}`;
            }
            if (context.extraBodyWearPattern?.value) { // add Pattern
                extra = `${context.extraBodyWearPattern.value} patterned ${extra}`;
            }  
            parts.push(extra);
        }
    }

    // Footwear
    if (context.footwear?.value) {
        let shoes = context.footwear.value;
        if (context.footWearColor && context.footwear.value !== "Socks" && context.footwear.value !== "Barefoot") {
            shoes = `${context.footWearColor} color ${shoes}`
        };
        if (context.footWearMaterial?.value && context.footwear.value !== "Socks" && context.footwear.value !== "Barefoot") {
            shoes = `${context.footWearMaterial.value} ${shoes}`;
        }
        if (context.footWearPattern?.value && context.footwear.value !== "Socks" && context.footwear.value !== "Barefoot") { // add Pattern
            shoes = `${context.footWearPattern.value} patterned ${shoes}`;
        }  
        parts.push(`Footwear: ${shoes}`);
    }

    return parts.join(', ');
}

export function buildAccessories(context: CharacterContextType): string {
    const parts: string[] = [];

    // Head wear
    if (context.headWear?.value) {
        let headpiece = context.headWear.value;
        if (context.headWearColor) headpiece = `${context.headWearColor} ${headpiece}`;
        if (context.headWearMaterial?.value) {
            headpiece = `${context.headWearMaterial.value} ${headpiece}`;
        }
        if (context.headWearPattern?.value) { // add Pattern
            headpiece = `${context.headWearPattern.value} patterned ${headpiece}`;
        }  
        parts.push(`Head accessory: ${headpiece}`);
    }

    // Eye wear
    if (context.eyeWear?.value) {
        let eyepiece = context.eyeWear.value;
        if (context.eyeWearColor) eyepiece = `${context.eyeWearColor} ${eyepiece}`;
        parts.push(`Eye accessory: ${eyepiece}`);
    }

    // Neck wear
    if (context.neckWear?.value) {
        let neckpiece = context.neckWear.value;
        if (context.neckWearColor) neckpiece = `${context.neckWearColor} ${neckpiece}`;
        if (context.neckWearMaterial?.value) {
            neckpiece = `${context.neckWearMaterial.value} ${neckpiece}`;
        }
        parts.push(`Neck accessory: ${neckpiece}`);
    }

    // Left Hand wear
    if (context.leftHandWear){
        let leftHandPiece = context.leftHandWear;
        if (context.leftHandWearColor) leftHandPiece = `${context.leftHandWearColor} ${leftHandPiece}`;
        if (context.leftHandWearMaterial?.value) leftHandPiece = `${context.leftHandWearMaterial?.value} ${leftHandPiece}`;
        parts.push(`Left hand accessory: ${leftHandPiece}`);
    } 
    
    // Right Hand wear
    if (context.rightHandWear){
        let rightHandPiece = context.rightHandWear;
        if (context.rightHandWearColor) rightHandPiece = `${context.rightHandWearColor} ${rightHandPiece}`;
        if (context.rightHandWearMaterial?.value) rightHandPiece = `${context.rightHandWearMaterial?.value} ${rightHandPiece}`;
        parts.push(`Right hand accessory: ${rightHandPiece}`);
    } 

    // Right wrist wear
    if (context.rightWristWear){
        let rightWristPiece = context.rightWristWear;
        if (context.rightWristWearColor) rightWristPiece = `${context.rightWristWearColor} ${rightWristPiece}`;
        if (context.rightWristWearMaterial?.value) rightWristPiece = `${context.rightWristWearMaterial?.value} ${rightWristPiece}`;
        parts.push(`Right wrist accessory: ${rightWristPiece}`);
    } 

    // Left wrist wear
    if (context.leftWristWear){
        let leftWristPiece = context.leftWristWear;
        if (context.leftWristWearColor) leftWristPiece = `${context.leftWristWearColor} ${leftWristPiece}`;
        if (context.leftWristWearMaterial?.value) leftWristPiece = `${context.leftWristWearMaterial?.value} ${leftWristPiece}`;
        parts.push(`Right wrist accessory: ${leftWristPiece}`);
    } 

    // Right finger wear
    if (context.rightFingerWear){
        let rightFingerPiece = context.rightFingerWear;
        if (context.rightFingerWearColor) rightFingerPiece = `${context.rightFingerWearColor} ${rightFingerPiece}`;
        if (context.rightFingerWearMaterial?.value) rightFingerPiece = `${context.rightFingerWearMaterial?.value} ${rightFingerPiece}`;
        parts.push(`Right finger accessory: ${rightFingerPiece}`);
    } 

    // Left finger wear
    if (context.leftFingerWear){
        let leftFingerPiece = context.leftFingerWear;
        if (context.leftFingerWearColor) leftFingerPiece = `${context.leftFingerWearColor} ${leftFingerPiece}`;
        if (context.leftFingerWearMaterial?.value) leftFingerPiece = `${context.leftFingerWearMaterial?.value} ${leftFingerPiece}`;
        parts.push(`Left finger accessory: ${leftFingerPiece}`);
    } 


    return parts.join(', ');
}

export function buildCharacterPrompt(context: CharacterContextType): string {
    const basicInfo = buildBasicInfo(context);
    const physicalAppearance = buildGeneralPhysicalAppearance(context);
    const facialFeatures = buildFacialFeatures(context);
    const hairDetails = buildHairDetails(context);
    const clothingDetails = buildClothingDetails(context);
    const accessories = buildAccessories(context);

    let prompt = "";

    if (basicInfo) prompt += `${basicInfo} ,`;
    if (physicalAppearance) prompt += `with a ${physicalAppearance} ,`;
    if (facialFeatures) prompt += `having ${facialFeatures} ,`;
    if (hairDetails) prompt += `and ${hairDetails} ,`;

    if (clothingDetails) prompt += `${clothingDetails} ,`;

    if (accessories) prompt += `with ${accessories} `;

    return prompt.trim();
}

// export function buildTechnicalSpecs(context: CharacterContextType): string {
//     const parts: string[] = [];

//     // Camera and composition
//     parts.push(cameraAngle);

//     // Lighting
//     parts.push(lighting);

//     // Art style
//     parts.push(artStyle);

//     // Quality
//     parts.push(quality);

//     // Background
//     if (includeBackground) {
//         parts.push('detailed background');
//     } else {
//         parts.push('simple background');
//     }

//     return parts.join(', ');
// }


function formatCondition(condition: {}) {
    let clothingDescription = ``
    if (condition) {
        const conditionEntries = Object.entries(condition)
        .filter(([_, values]) => values && values.length > 0)
        .flatMap(([_, values]) => values);

        if (conditionEntries.length > 0) {
            // Format conditions with proper grammar
            let conditionPhrase = conditionEntries.join(', ');
            
            // Replace last comma with "and" if multiple conditions
            if (conditionEntries.length > 1) {
                const lastCommaIndex = conditionPhrase.lastIndexOf(', ');
                if (lastCommaIndex !== -1) {
                conditionPhrase = conditionPhrase.substring(0, lastCommaIndex) + 
                    ' and' + conditionPhrase.substring(lastCommaIndex + 1);
                }
            }

            clothingDescription += ` (${conditionPhrase})`;
        }

        return `${clothingDescription}`;
    }
}

export const getObjectsKeyAndValue = (object: {}) => {
    const parts: string[] = [];

    Object.entries(object).forEach(([category, feature]) => {
        if (feature) {
            parts.push(`${feature} ${category.toLowerCase()}`);
        }
    });

    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts.join(' and ');

    // More than 2 items: join all but last with comma, then add "and" before the last item
    const last = parts.pop();
    return `${parts.join(', ')} and ${last}`;
};

export const formatArrayStringValues = (array: string[]) => {
    const parts: string[] = [];

    array.forEach((value) => {
        if (value) {
            parts.push(`${value}`);
        }
    });

    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts.join(' and ');

    // More than 2 items: join all but last with comma, then add "and" before the last item
    const last = parts.pop();
    return `${parts.join(', ')} and ${last}`;
};


export const formatObjectOfArrays = (object: {}) => {
    let result: string[] | [] = []
    // {"generalWear":["pristine","mint condition"],"texture":["silky","fluffy"]};
    Object.entries(object).forEach(([category, values]) => {
        if (values && values?.length > 0) {
            result = [...result, ...values]
        }
    });

    return formatArrayStringValues(result)
}
