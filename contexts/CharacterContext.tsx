// app/contexts/character-context.tsx
"use client"

import { CharacterContextType } from "@/interfaces/CharacterContextInterface";
import { EyeWearCategory } from "@/types/character/EyeWearCategoryType";
import { HeadWearCategory } from "@/types/character/HeadWearCategoryType";
import { NeckWearCategory } from "@/types/character/NeckWearCategoryType";
import { PhysicalBuildCategory, PhysicalMovementCategory } from "@/types/character/PhysicalAppearanceType";
import { RaceType } from "@/types/character/RaceType";
import { EyeColor } from "@/types/EyeColourType";
import { FacialFeatureCategory, FacialFeatureOption } from "@/types/FacialFeatureType";
import { FootwearCategory } from "@/types/FootwearType";
import { MaterialCategoryType } from "@/types/MaterialCategoryType";
import { ExtraBodyWearCategory, FullBodyWearCategory, LowerBodyWearCategory, OuterBodyWearCategory, UpperBodyWearCategory } from "@/types/OutfitType";
import { PatternCategoryType } from "@/types/PatternCategoryType";
import { createContext, useContext, useState, ReactNode } from "react";



const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
	const [characterData, setCharacterData] = useState(null);

    // BASIC INFO
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [alias, setAlias] = useState<string>("");
    const [gender, setGender] = useState<string|null>(null);
    const [age, setAge] = useState<string | number>("");
    const [race, setRace] = useState<{ category: RaceType, value: string } | null>(null);

    // FACIAL STRUCTURE
    const [selectedFacialFeature, setSelectedFacialFeature] = useState<Record<FacialFeatureCategory, FacialFeatureOption> | {}>({});
    const [selectedFacialHair, setSelectedFacialHair] = useState({});
    const [selectedMarks, setSelectedMarks] = useState({});

    // EYE STATE
    const [eyeColor, setEyeColor] = useState<EyeColor | null>(null);
    const [eyeShape, setEyeShape] = useState<string | null>(null);
    const [notableEyeFeature, setNotableEyeFeature] = useState<string | null>(null);
    const [eyeAccessory, setEyeAccessory] = useState<string | null>(null);

    // EYEBROWS STATE
    const [eyeBrowStyle, setEyeBrowStyle] = useState<string | null>(null);
    const [eyeBrowPosition, setEyeBrowPosition] = useState<string | null>(null);
    const [eyeBrowTexture, setEyeBrowTexture] = useState<string | null>(null);
    const [eyeBrowFeature, setEyeBrowFeature] = useState<string | null>(null);

    // NOSE & EAR
    const [selectedNoseFeatures, setSelectedNoseFeatures] = useState({});    
    const [selectedEarFeatures, setSelectedEarFeatures] = useState({});

    // LIPS & TEETH
    const [selectedLipFeatures, setSelectedLipFeatures] = useState({});
    const [teethVariation, setTeethVariation] = useState<string | null>(null);
    const [dentalAccessory, setDentalAccessory] = useState<string | null>(null);

    // HAIR FEATURES
    const [hairTexture, setHairTexture] = useState<string | null>(null);
    const [selectedAccessories, setSelectedAccessories] = useState({});
    const [hairLength, setHairLength] = useState<string | null>(null);
    const [hairColor, setHairColor] = useState<string | null>(null);
    const [hairQuirks, setHairQuirks] = useState<string[]>(['No Quirks']);
    const [skinTone, setSkinTone] = useState<string | null>(null);

    // GENERAL PHYSICAL
    const [height, setHeight] = useState<string | null>(null);
    const [build, setBuild] = useState<{ category: PhysicalBuildCategory, value: string }|null>(null); 
    const [proportion, setProportion] = useState<string | null>(null);
    const [physicalMovement, setPhysicalMovement] = useState<{ category: PhysicalMovementCategory, value: string }|null>(null); 

    // FULL BODY WEAR
    const [fullBodyWear, setFullBodyWear] = useState<{ category: FullBodyWearCategory, value: string }|null>(null); 
    const [fullBodyWearMaterial, setFullBodyWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    const [fullBodyWearColor, setFullBodyWearColor] = useState<string>('');
    const [fullBodyWearPattern, setFullBodyWearPattern] = useState<{category: PatternCategoryType, value: string}|null>(null);
    const [fullBodyWearCondition, setFullBodyWearCondition] = useState<Partial<Record<any, string[]>>>({});


    // UPPER BODY WEAR
    const [upperBodyWear, setUpperBodyWear] = useState<{ category: UpperBodyWearCategory, value: string }|null>(null);
    const [upperBodyWearMaterial, setUpperBodyWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    const [upperBodyWearColor, setUpperBodyWearColor] = useState<string>('');
    const [upperBodyWearPattern, setUpperBodyWearPattern] = useState<{category: PatternCategoryType, value: string}|null>(null);
    const [upperBodyWearCondition, setUpperBodyWearCondition] = useState<Partial<Record<any, string[]>>>({});

    // LOWER BODY WEAR
    const [lowerBodyWear, setLowerBodyWear] = useState<{ category: LowerBodyWearCategory, value: string }|null>(null);
    const [lowerBodyWearMaterial, setLowerBodyWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    const [lowerBodyWearColor, setLowerBodyWearColor] = useState<string>('');
    const [lowerBodyWearPattern, setLowerBodyWearPattern] = useState<{category: PatternCategoryType, value: string}|null>(null);
    const [lowerBodyWearCondition, setLowerBodyWearCondition] = useState<Partial<Record<any, string[]>>>({});

    // OUTER BODY WEAR
    const [outerBodyWear, setOuterBodyWear] = useState<{ category: OuterBodyWearCategory, value: string }|null>(null);
    const [outerBodyWearMaterial, setOuterBodyWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    const [outerBodyWearColor, setOuterBodyWearColor] = useState<string>('');
    const [outerBodyWearPattern, setOuterBodyWearPattern] = useState<{category: PatternCategoryType, value: string}|null>(null);
    const [outerBodyWearCondition, setOuterBodyWearCondition] = useState<Partial<Record<any, string[]>>>({});

    // EXTRA BODY WEAR
    const [extraBodyWear, setExtraBodyWear] = useState<{ category: ExtraBodyWearCategory, value: string }|null>(null);
    const [extraBodyWearMaterial, setExtraBodyWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    const [extraBodyWearColor, setExtraBodyWearColor] = useState<string>('');
    const [extraBodyWearPattern, setExtraBodyWearPattern] = useState<{category: PatternCategoryType, value: string}|null>(null);
    const [extraBodyWearCondition, setExtraBodyWearCondition] = useState<Partial<Record<any, string[]>>>({});

    // FOOTWEAR
    const [footwear, setFootwear] = useState<{ category: FootwearCategory, value: string }|null>(null);
    const [footWearColor, setFootWearColor] = useState<string>('');
    const [footWearMaterial, setFootWearMaterial] = useState<{ category: MaterialCategoryType, value: string }|null>(null);
    const [footWearPattern, setFootWearPattern] = useState<{ category: PatternCategoryType, value: string }|null>(null);
    const [footWearCondition, setFootWearCondition] = useState<Partial<Record<any, string[]>>>({});
    
    
    // HEAD WEAR
    const [headWear, setHeadWear] = useState<{ category: HeadWearCategory, value: string }|null>(null);
    const [headWearColor, setHeadWearColor] = useState<string>('');
    const [headWearMaterial, setHeadWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    const [headWearPattern, setHeadWearPattern] = useState<{ category: PatternCategoryType, value: string }|null>(null);
    const [headWearCondition, setHeadWearCondition] = useState<string | null>(null);

    // EYE WEAR
    const [eyeWear, setEyeWear] = useState<{ category: EyeWearCategory, value: string }|null>(null);
    const [eyeWearColor, setEyeWearColor] = useState<string>('');    
    const [eyeWearCondition, setEyeWearCondition] = useState<string | null>(null);


    // NECK WEAR
    const [neckWear, setNeckWear] = useState<{ category: NeckWearCategory, value: string }|null>(null);
    const [neckWearColor, setNeckWearColor] = useState<string>('');
    const [neckWearMaterial, setNeckWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    const [neckWearPattern, setNeckWearPattern] = useState<{ category: PatternCategoryType, value: string }|null>(null);
    const [neckWearCondition, setNeckWearCondition] = useState<Partial<Record<any, string[]>>>({});
    
    // HAND WEAR 
    const [leftHandWear, setLeftHandWear] = useState<string | null>(null);
    const [leftHandWearColor, setLeftHandWearColor] = useState<string>('');
    const [leftHandWearMaterial, setLeftHandWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    
    const [rightHandWear, setRightHandWear] = useState<string | null>(null);
    const [rightHandWearColor, setRightHandWearColor] = useState<string>('');
    const [rightHandWearMaterial, setRightHandWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    
    const [leftFingerWear, setLeftFingerWear] = useState<string | null>(null);
    const [leftFingerWearColor, setLeftFingerWearColor] = useState<string>('');
    const [leftFingerWearMaterial, setLeftFingerWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    
    const [rightFingerWear, setRightFingerWear] = useState<string | null>(null);
    const [rightFingerWearColor, setRightFingerWearColor] = useState<string>('');
    const [rightFingerWearMaterial, setRightFingerWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    
    const [leftWristWear, setLeftWristWear] = useState<string | null>(null);
    const [leftWristWearColor, setLeftWristWearColor] = useState<string>('');
    const [leftWristWearMaterial, setLeftWristWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    
    const [rightWristWear, setRightWristWear] = useState<string | null>(null);
    const [rightWristWearColor, setRightWristWearColor] = useState<string>('');
    const [rightWristWearMaterial, setRightWristWearMaterial] = useState<{category: MaterialCategoryType, value: string}|null>(null);
    
    const [techAccessories, setTechAccessories] = useState<Partial<Record<any, string[]>>>({});
    
    return (
        <CharacterContext.Provider value={{
            characterData, setCharacterData,
            
            // BASIC INFO
            firstName, setFirstName,
            lastName, setLastName, gender, setGender,
            alias, setAlias, age, setAge, race, setRace,

            // FACIAL STRUCTURE            
            selectedFacialFeature, setSelectedFacialFeature,
            selectedFacialHair, setSelectedFacialHair,
            selectedMarks, setSelectedMarks,

            // EYE STATE
            eyeColor, setEyeColor,
            eyeShape, setEyeShape,
            notableEyeFeature, setNotableEyeFeature,
            eyeAccessory, setEyeAccessory,

            // EYEBROWS STATE
            eyeBrowStyle, setEyeBrowStyle,
            eyeBrowPosition, setEyeBrowPosition,
            eyeBrowTexture, setEyeBrowTexture,
            eyeBrowFeature, setEyeBrowFeature,

            // NOSE & EAR
            selectedNoseFeatures, setSelectedNoseFeatures,
            selectedEarFeatures, setSelectedEarFeatures,

            // LIPS & TEETH
            selectedLipFeatures, setSelectedLipFeatures,
            teethVariation, setTeethVariation,
            dentalAccessory, setDentalAccessory,

            // HAIR FEATURES
            hairTexture, setHairTexture,
            selectedAccessories, setSelectedAccessories,
            hairLength, setHairLength, hairColor, setHairColor,
            hairQuirks, setHairQuirks, skinTone, setSkinTone,

            // GENERAL PHYSICAL
            height, setHeight, build, setBuild, 
            proportion, setProportion, physicalMovement, setPhysicalMovement,

            // FULL BODY WEAR
            fullBodyWear, setFullBodyWear,
            fullBodyWearMaterial, setFullBodyWearMaterial,
            fullBodyWearColor, setFullBodyWearColor,
            fullBodyWearPattern, setFullBodyWearPattern,
            fullBodyWearCondition, setFullBodyWearCondition,

            // UPPER BODY WEAR
            upperBodyWear, setUpperBodyWear,
            upperBodyWearMaterial, setUpperBodyWearMaterial,
            upperBodyWearColor, setUpperBodyWearColor,
            upperBodyWearPattern, setUpperBodyWearPattern,
            upperBodyWearCondition, setUpperBodyWearCondition,

            // LOWER BODY WEAR
            lowerBodyWear, setLowerBodyWear,
            lowerBodyWearMaterial, setLowerBodyWearMaterial,
            lowerBodyWearColor, setLowerBodyWearColor,
            lowerBodyWearPattern, setLowerBodyWearPattern,
            lowerBodyWearCondition, setLowerBodyWearCondition,

            // OUTER BODY WEAR
            outerBodyWear, setOuterBodyWear,
            outerBodyWearMaterial, setOuterBodyWearMaterial,
            outerBodyWearColor, setOuterBodyWearColor,
            outerBodyWearPattern, setOuterBodyWearPattern,
            outerBodyWearCondition, setOuterBodyWearCondition,

            // EXTRA BODY WEAR
            extraBodyWear, setExtraBodyWear,
            extraBodyWearMaterial, setExtraBodyWearMaterial,
            extraBodyWearColor, setExtraBodyWearColor,
            extraBodyWearPattern, setExtraBodyWearPattern,
            extraBodyWearCondition, setExtraBodyWearCondition,

            // FOOTWEAR
            footwear, setFootwear, footWearColor, setFootWearColor, 
            footWearMaterial, setFootWearMaterial, footWearPattern, setFootWearPattern,
            footWearCondition, setFootWearCondition,

            // HEAD WEAR
            headWear, setHeadWear, headWearColor, setHeadWearColor, 
            headWearMaterial, setHeadWearMaterial, headWearPattern, setHeadWearPattern,
            headWearCondition, setHeadWearCondition,
            

            // EYE WEAR            
            eyeWear, setEyeWear, eyeWearColor, setEyeWearColor, eyeWearCondition, setEyeWearCondition,

            // NECK WEAR
            neckWear, setNeckWear, neckWearColor, setNeckWearColor, neckWearMaterial, setNeckWearMaterial, 
            neckWearPattern, setNeckWearPattern, neckWearCondition, setNeckWearCondition,

            // HAND WEAR 
            leftHandWear, setLeftHandWear, leftHandWearColor, setLeftHandWearColor, leftHandWearMaterial, setLeftHandWearMaterial,
            rightHandWear, setRightHandWear, rightHandWearColor, setRightHandWearColor, rightHandWearMaterial, setRightHandWearMaterial,

            // WRIST WEAR
            leftWristWear, setLeftWristWear, leftWristWearColor, setLeftWristWearColor, leftWristWearMaterial, setLeftWristWearMaterial,
            rightWristWear, setRightWristWear, rightWristWearColor, setRightWristWearColor, rightWristWearMaterial, setRightWristWearMaterial,

            // FINGER WEAR
            leftFingerWear, setLeftFingerWear, leftFingerWearColor, setLeftFingerWearColor, leftFingerWearMaterial, setLeftFingerWearMaterial,
            rightFingerWear, setRightFingerWear, rightFingerWearColor, setRightFingerWearColor, rightFingerWearMaterial, setRightFingerWearMaterial,

            // TECH ACCESSORIES
            techAccessories, setTechAccessories,
        }}>
            {children}
        </CharacterContext.Provider>
    );
}

export function useCharacterContext() {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error("useCharacterContext must be used within a CharacterProvider");
    }
    return context;
}