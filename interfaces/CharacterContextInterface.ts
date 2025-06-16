
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

export interface CharacterContextType {
    characterData: any | null;
    setCharacterData: (data: any) => void;

    // BASIC INFO
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    alias: string;
    setAlias: (value: string) => void;
    gender: string|null;
    setGender: (value: string|null) => void;
    age: string | number;
    setAge: (value: string | number) => void;
    race: { category: RaceType, value: string } | null;
    setRace: (value: { category: RaceType, value: string } | null) => void;

    // FACIAL STRUCTURE
    selectedFacialFeature: Record<FacialFeatureCategory, FacialFeatureOption> | {};
    setSelectedFacialFeature: (value: Record<FacialFeatureCategory, FacialFeatureOption> | {}) => void;
    selectedFacialHair: {};
    setSelectedFacialHair: (value: any) => void;
    selectedMarks: {};
    setSelectedMarks: (value: any) => void;

    // EYE STATE
    eyeColor: EyeColor | null;
    setEyeColor: (value: EyeColor | null) => void;
    eyeShape: string | null;
    setEyeShape: (value: string | null) => void;
    notableEyeFeature: string | null;
    setNotableEyeFeature: (value: string | null) => void;
    eyeAccessory: string | null;
    setEyeAccessory: (value: string | null) => void;

    // EYEBROWS STATE
    eyeBrowStyle: string | null;
    setEyeBrowStyle: (value: string | null) => void;
    eyeBrowPosition: string | null;
    setEyeBrowPosition: (value: string | null) => void;
    eyeBrowTexture: string | null;
    setEyeBrowTexture: (value: string | null) => void;
    eyeBrowFeature: string | null;
    setEyeBrowFeature: (value: string | null) => void;

    // NOSE & EAR
    selectedNoseFeatures: {};
    setSelectedNoseFeatures: (value: any) => void;
    selectedEarFeatures: {};
    setSelectedEarFeatures: (value: any) => void;

    // LIPS & TEETH
    selectedLipFeatures: {};
    setSelectedLipFeatures: (value: any) => void;
    teethVariation: string | null;
    setTeethVariation: (value: string | null) => void;
    dentalAccessory: string | null;
    setDentalAccessory: (value: string | null) => void;

    // HAIR FEATURES
    hairTexture: string | null;
    setHairTexture: (value: string | null) => void;
    selectedAccessories: {};
    setSelectedAccessories: (value: any) => void;
    hairLength: string | null;
    setHairLength: (value: string | null) => void;
    hairColor: string | null;
    setHairColor: (value: string | null) => void;
    skinTone: string | null;
    setSkinTone: (value: string | null) => void;
    hairQuirks: string[];
    setHairQuirks: (value: string[]) => void;

    // GENERAL PHYSICAL
    height: string | null;
    setHeight: (value: string | null) => void;
    build: { category: PhysicalBuildCategory, value: string } | null;
    setBuild: (value: { category: PhysicalBuildCategory, value: string } | null) => void;
    proportion: string | null;
    setProportion: (value: string | null) => void;
    physicalMovement: { category: PhysicalMovementCategory, value: string } | null;
    setPhysicalMovement: (value: { category: PhysicalMovementCategory, value: string } | null) => void;


    // FULL BODY WEAR
    fullBodyWear: { category: FullBodyWearCategory, value: string } | null;
    setFullBodyWear: (value: { category: FullBodyWearCategory, value: string } | null) => void;
    fullBodyWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setFullBodyWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    fullBodyWearColor: string;
    setFullBodyWearColor: (value: string) => void;
    fullBodyWearPattern: { category: PatternCategoryType, value: string } | null;
    setFullBodyWearPattern: (value: { category: PatternCategoryType, value: string } | null) => void;
    fullBodyWearCondition:  Partial<Record<any, string[]>>;
    setFullBodyWearCondition: (value: Partial<Record<any, string[]>>) => void;

    // UPPER BODY WEAR
    upperBodyWear: { category: UpperBodyWearCategory, value: string } | null;
    setUpperBodyWear: (value: { category: UpperBodyWearCategory, value: string } | null) => void;
    upperBodyWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setUpperBodyWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    upperBodyWearColor: string;
    setUpperBodyWearColor: (value: string) => void;
    upperBodyWearPattern: { category: PatternCategoryType, value: string } | null;
    setUpperBodyWearPattern: (value: { category: PatternCategoryType, value: string } | null) => void;
    upperBodyWearCondition:  Partial<Record<any, string[]>>;
    setUpperBodyWearCondition: (value: Partial<Record<any, string[]>>) => void;


    // LOWER BODY WEAR
    lowerBodyWear: { category: LowerBodyWearCategory, value: string } | null;
    setLowerBodyWear: (value: { category: LowerBodyWearCategory, value: string } | null) => void;
    lowerBodyWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setLowerBodyWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    lowerBodyWearColor: string;
    setLowerBodyWearColor: (value: string) => void;
    lowerBodyWearPattern: { category: PatternCategoryType, value: string } | null;
    setLowerBodyWearPattern: (value: { category: PatternCategoryType, value: string } | null) => void;
    lowerBodyWearCondition:  Partial<Record<any, string[]>>;
    setLowerBodyWearCondition: (value: Partial<Record<any, string[]>>) => void;


    // OUTER BODY WEAR
    outerBodyWear: { category: OuterBodyWearCategory, value: string } | null;
    setOuterBodyWear: (value: { category: OuterBodyWearCategory, value: string } | null) => void;
    outerBodyWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setOuterBodyWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    outerBodyWearColor: string;
    setOuterBodyWearColor: (value: string) => void;
    outerBodyWearPattern: { category: PatternCategoryType, value: string } | null;
    setOuterBodyWearPattern: (value: { category: PatternCategoryType, value: string } | null) => void;
    outerBodyWearCondition:  Partial<Record<any, string[]>>;
    setOuterBodyWearCondition: (value: Partial<Record<any, string[]>>) => void;


    // EXTRA BODY WEAR
    extraBodyWear: { category: ExtraBodyWearCategory, value: string } | null;
    setExtraBodyWear: (value: { category: ExtraBodyWearCategory, value: string } | null) => void;
    extraBodyWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setExtraBodyWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    extraBodyWearColor: string;
    setExtraBodyWearColor: (value: string) => void;
    extraBodyWearPattern: { category: PatternCategoryType, value: string } | null;
    setExtraBodyWearPattern: (value: { category: PatternCategoryType, value: string } | null) => void;
    extraBodyWearCondition:  Partial<Record<any, string[]>>;
    setExtraBodyWearCondition: (value: Partial<Record<any, string[]>>) => void;


    // FOOTWEAR
    footwear: { category: FootwearCategory, value: string } | null;
    setFootwear: (value: { category: FootwearCategory, value: string } | null) => void;
    footWearColor: string;
    setFootWearColor: (value: string) => void;
    footWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setFootWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    footWearPattern: { category: PatternCategoryType, value: string } | null;
    setFootWearPattern: (value: { category: PatternCategoryType, value: string } | null) => void;
    footWearCondition:  Partial<Record<any, string[]>>;
    setFootWearCondition: (value: Partial<Record<any, string[]>>) => void;    

    // HEAD WEAR
    headWear: { category: HeadWearCategory, value: string } | null;
    setHeadWear: (value: { category: HeadWearCategory, value: string } | null) => void;
    headWearColor: string;
    setHeadWearColor: (value: string) => void;
    headWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setHeadWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    headWearPattern: { category: PatternCategoryType, value: string } | null;
    setHeadWearPattern: (value: { category: PatternCategoryType, value: string } | null) => void;
    headWearCondition:  string | null;
    setHeadWearCondition: (value: string | null) => void;


    // EYE WEAR
    eyeWear: { category: EyeWearCategory, value: string } | null;
    setEyeWear: (value: { category: EyeWearCategory, value: string } | null) => void;
    eyeWearColor: string;
    setEyeWearColor: (value: string) => void;
    eyeWearCondition:  string | null;
    setEyeWearCondition: (value: string | null) => void;


    // NECK WEAR
    neckWear: { category: NeckWearCategory, value: string } | null;
    setNeckWear: (value: { category: NeckWearCategory, value: string } | null) => void;
    neckWearColor: string;
    setNeckWearColor: (value: string) => void;
    neckWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setNeckWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    neckWearPattern: { category: PatternCategoryType, value: string } | null;
    setNeckWearPattern: (value: { category: PatternCategoryType, value: string } | null) => void;
    neckWearCondition:  Partial<Record<any, string[]>>;
    setNeckWearCondition: (value: Partial<Record<any, string[]>>) => void;


    // HAND WEAR
    leftHandWear: string | null;
    setLeftHandWear: (value: string | null) => void;
    leftHandWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setLeftHandWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    leftHandWearColor: string;
    setLeftHandWearColor: (value: string) => void;

    rightHandWear: string | null;
    setRightHandWear : (value: string | null) => void;
    rightHandWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setRightHandWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    rightHandWearColor: string;
    setRightHandWearColor: (value: string) => void;

    leftFingerWear: string | null;
    setLeftFingerWear: (value: string | null) => void;
    leftFingerWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setLeftFingerWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    leftFingerWearColor: string;
    setLeftFingerWearColor: (value: string) => void;

    rightFingerWear: string | null;
    setRightFingerWear: (value: string | null) => void;
    rightFingerWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setRightFingerWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    rightFingerWearColor: string;
    setRightFingerWearColor: (value: string) => void;

    leftWristWear: string | null;
    setLeftWristWear: (value: string | null) => void;
    leftWristWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setLeftWristWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    leftWristWearColor: string;
    setLeftWristWearColor: (value: string) => void;

    rightWristWear: string | null;
    setRightWristWear: (value: string | null) => void;
    rightWristWearMaterial: { category: MaterialCategoryType, value: string } | null;
    setRightWristWearMaterial: (value: { category: MaterialCategoryType, value: string } | null) => void;
    rightWristWearColor: string;
    setRightWristWearColor: (value: string) => void;

    // TECH ACCESSORIES
    techAccessories:  Partial<Record<any, string[]>>;
    setTechAccessories: (value: Partial<Record<any, string[]>>) => void;

    
}