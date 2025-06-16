"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { CheckCheck, Copy, CopyCheck, Eye, EyeOffIcon } from 'lucide-react'
import { buildAccessories, buildBasicInfo, buildCharacterPrompt, buildClothingDetails, buildFacialFeatures, buildGeneralPhysicalAppearance, buildHairDetails, formatArrayStringValues, formatObjectOfArrays, getObjectsKeyAndValue } from "@/prompt-builder/characterPromptBuilder";
import { useCharacterContext } from '@/contexts/CharacterContext';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import GenericSelect from '../shared/GenericSelect';
import { objectIsEmpty } from '@/lib/helper';
import { useMainContext } from '@/contexts/MainContext';


interface Props {
    // basicInfo: string;
    // setBasicInfo: React.Dispatch<React.SetStateAction<string>>;
    // generalPhysical: string;
    // setGeneralPhysical: React.Dispatch<React.SetStateAction<string>>;
    // facialFeatures: string;
    // setFacialFeatures: React.Dispatch<React.SetStateAction<string>>;
    // hairDetails: string;
    // setHairDetails: React.Dispatch<React.SetStateAction<string>>;
    // outfitDetails: string;
    // setOutfitDetails: React.Dispatch<React.SetStateAction<string>>;
    // accessoriesDetails: string;
    // setAccessoriesDetails: React.Dispatch<React.SetStateAction<string>>;
    characterData: any;
    prompt: string;
}

const aIModels = [
    "Midjourney", 
    "Google's W.I.S.K",
    "DALL-E 3",
    "Stable Diffusion",
    "Leonardo AI",
    // "Runway ML",
]

const DisplayCharacterPrompt: React.FC<Props> = ({
    characterData, prompt
}) => {
    const searchParams = useSearchParams();
    const characterId = searchParams.get('character-id');

    const [basicInfo, setBasicInfo] = useState<string>("");
    const [generalPhysical, setGeneralPhysical] = useState<string>("");
    const [facialFeatures, setFacialFeatures] = useState<string>("");
    const [hairDetails, setHairDetails] = useState<string>("");
    const [outfitDetails, setOutfitDetails] = useState<string>("");
    const [accessoriesDetails, setAccessoriesDetails] = useState<string>("");
    const [showSegments, setShowSegments] = useState<boolean>(false);    
    // const [aIModel, setAIModel] = useState<string | null>(null);

    const context = useCharacterContext();
    const {
        aIModel, setAIModel
    } = useMainContext();

    const selectedCharacter = useMemo(() => {
        const storedLibraryExists = localStorage.getItem("character-library");
		if (storedLibraryExists) {
			const storedLibrary = JSON.parse(storedLibraryExists);
			const character = storedLibrary.find(item => item.id === characterId);
			// if (character) {
			// 	context.setCharacterData(character);
			// }
            return character;
		}
    },
        [characterId]
    );
    console.log({
        selectedCharacter
    });
    // context.setCharacterData(selectedCharacter);
    

    const {
        setFirstName, setLastName,
        setAlias, setAge, setRace, setGender,

        setSelectedFacialFeature, setSelectedFacialHair, setSelectedMarks,

        // EYE STATE
        setEyeColor, setEyeShape, setNotableEyeFeature, setEyeAccessory,

        // EYEBROWS STATE
        setEyeBrowStyle, setEyeBrowPosition, setEyeBrowTexture, setEyeBrowFeature,

        setSelectedNoseFeatures, setSelectedEarFeatures,

        setSelectedLipFeatures, setTeethVariation, setDentalAccessory,

        setHairTexture, setSelectedAccessories, setHairLength, setHairColor, setHairQuirks, setSkinTone,

        setHeight, height, setBuild, setProportion, setPhysicalMovement,

        // FULL BODY WEAR
        setFullBodyWear,
        setFullBodyWearMaterial,
        setFullBodyWearColor,
        setFullBodyWearPattern,
        setFullBodyWearCondition,

        // UPPER BODY WEAR
        setUpperBodyWear,
        setUpperBodyWearMaterial,
        setUpperBodyWearColor,
        setUpperBodyWearPattern,
        setUpperBodyWearCondition,

        // LOWER BODY WEAR
        setLowerBodyWear,
        setLowerBodyWearMaterial,
        setLowerBodyWearColor,
        setLowerBodyWearPattern,
        setLowerBodyWearCondition,

        // OUTER BODY WEAR
        setOuterBodyWear,
        setOuterBodyWearMaterial,
        setOuterBodyWearColor,
        setOuterBodyWearPattern,
        setOuterBodyWearCondition,

        // EXTRA BODY WEAR
        setExtraBodyWear,
        setExtraBodyWearMaterial,
        setExtraBodyWearColor,
        setExtraBodyWearPattern,
        setExtraBodyWearCondition,

        setFootwear, setFootWearColor, setFootWearMaterial,
        setFootWearPattern,

        setheadWearColor, setHeadWearColor, setHeadWearMaterial,
        setHeadWearPattern,

        setEyeWear, setEyeWearColor,

        setNeckWear, setNeckWearColor, setNeckWearMaterial,

        setLeftHandWear, setLeftHandWearColor, setLeftHandWearMaterial,
        setRightHandWear, setRightHandWearColor, setRightHandWearMaterial,

        // WRIST WEAR
        setLeftWristWear, setLeftWristWearColor, setLeftWristWearMaterial,
        setRightWristWear, setRightWristWearColor, setRightWristWearMaterial,

        // FINGER WEAR
        setLeftFingerWear, setLeftFingerWearColor, setLeftFingerWearMaterial,
        setRightFingerWear, setRightFingerWearColor, setRightFingerWearMaterial,

        // characterData
    } = useCharacterContext();

    useEffect(() => {
        context?.setAlias(characterData?.alias ?? "")
        context?.setFirstName(characterData?.firstName ?? "")
        context?.setLastName(characterData?.lastName ?? "")
        context?.setAge(characterData?.age ?? "")
        context?.setRace(characterData?.race ?? "")
        context?.setGender(characterData?.gender ?? "");

        context?.setSelectedFacialFeature(characterData?.selectedFacialFeature ?? "")
        context?.setSelectedFacialHair(characterData?.selectedFacialHair ?? "")
        context?.setSelectedMarks(characterData?.selectedMarks ?? "")

        context?.setEyeColor(characterData?.eyeColor ?? "")
        context?.setEyeShape(characterData?.eyeShape ?? "")
        context?.setNotableEyeFeature(characterData?.notableEyeFeature ?? "")
        context?.setEyeAccessory(characterData?.eyeAccessory ?? "")

        context?.setEyeBrowStyle(characterData?.eyeBrowStyle ?? "")
        context?.setEyeBrowPosition(characterData?.eyeBrowPosition ?? "")
        context?.setEyeBrowTexture(characterData?.eyeBrowTexture ?? "")
        context?.setEyeBrowFeature(characterData?.eyeBrowFeature ?? "")

        context?.setSelectedNoseFeatures(characterData?.selectedNoseFeatures ?? "")
        context?.setSelectedEarFeatures(characterData?.selectedEarFeatures ?? "")

        context?.setSelectedLipFeatures(characterData?.selectedLipFeatures ?? "")
        context?.setTeethVariation(characterData?.teethVariation ?? "")
        context?.setDentalAccessory(characterData?.dentalAccessory ?? "")

        context?.setHairTexture(characterData?.hairTexture ?? "")
        context?.setSelectedAccessories(characterData?.selectedAccessories ?? "")
        context?.setHairLength(characterData?.hairLength ?? "")
        context?.setHairColor(characterData?.hairColor ?? "")
        context?.setHairQuirks(characterData?.hairQuirks ?? "")
        context?.setSkinTone(characterData?.skinTone ?? "")


        context?.setHeight(characterData?.height ?? "")
        context?.setBuild(characterData?.build ?? "")
        context?.setProportion(characterData?.proportion ?? "")
        context?.setPhysicalMovement(characterData?.physicalMovement ?? "")


        // FULL BODY WEAR
        context?.setFullBodyWear(characterData?.fullBodyWear ?? "")
        context?.setFullBodyWearMaterial(characterData?.fullBodyWearMaterial ?? "")
        context?.setFullBodyWearColor(characterData?.fullBodyWearColor ?? "")
        context?.setFullBodyWearCondition(characterData?.fullBodyWearCondition ?? "")

        // UPPER BODY WEAR
        context?.setUpperBodyWear(characterData?.upperBodyWear ?? "")
        context?.setUpperBodyWearMaterial(characterData?.upperBodyWearMaterial ?? "")
        context?.setUpperBodyWearColor(characterData?.upperBodyWearColor ?? "")
        context?.setUpperBodyWearPattern(characterData?.upperBodyWearPattern ?? "")
        context?.setUpperBodyWearCondition(characterData?.upperBodyWearCondition ?? "")

        // LOWER BODY WEAR
        context?.setLowerBodyWear(characterData?.lowerBodyWear ?? "")
        context?.setLowerBodyWearMaterial(characterData?.lowerBodyWearMaterial ?? "")
        context?.setLowerBodyWearColor(characterData?.lowerBodyWearColor ?? "")
        context?.setLowerBodyWearPattern(characterData?.lowerBodyWearPattern ?? "")
        context?.setLowerBodyWearCondition(characterData?.lowerBodyWearCondition ?? "")

        // OUTER BODY WEAR
        context?.setOuterBodyWear(characterData?.outerBodyWear ?? "")
        context?.setOuterBodyWearMaterial(characterData?.outerBodyWearMaterial ?? "")
        context?.setOuterBodyWearColor(characterData?.outerBodyWearColor ?? "")
        context?.setOuterBodyWearPattern(characterData?.outerBodyWearPattern ?? "")
        context?.setOuterBodyWearCondition(characterData?.outerBodyWearCondition ?? "")

        // EXTRA BODY WEAR        
        context?.setExtraBodyWear(characterData?.extraBodyWear ?? "")
        context?.setExtraBodyWearMaterial(characterData?.extraBodyWearMaterial ?? "")
        context?.setExtraBodyWearColor(characterData?.extraBodyWearColor ?? "")
        context?.setExtraBodyWearPattern(characterData?.extraBodyWearPattern ?? "")
        context?.setExtraBodyWearCondition(characterData?.extraBodyWearCondition ?? "")

        context?.setFootwear(characterData?.footwear ?? "")
        context?.setFootWearColor(characterData?.footWearColor ?? "")
        context?.setFootWearMaterial(characterData?.footWearMaterial ?? "")
        context?.setFootWearPattern(characterData?.footWearPattern ?? "")

        // HEAD WEAR
        context?.setHeadWear(characterData?.headWear ?? "")
        context?.setHeadWearColor(characterData?.headWearColor ?? "")
        context?.setHeadWearMaterial(characterData?.headWearMaterial ?? "")
        context?.setHeadWearPattern(characterData?.headWearPattern ?? "")
        // context?.setHeadWearCondition(characterData?.headWearCondition ?? null)
        context?.setHeadWearCondition(null)
        
        // EYE WEAR
        context?.setEyeWear(characterData?.eyeWear ?? "")
        context?.setEyeWearColor(characterData?.eyeWearColor ?? "")
        context?.setEyeWearCondition(characterData?.eyeWearCondition ?? "")
        

        // NECK WEAR
        context?.setNeckWear(characterData?.neckWear ?? "")
        context?.setNeckWearColor(characterData?.neckWearColor ?? "")
        context?.setNeckWearMaterial(characterData?.neckWearMaterial ?? "")

        // HAND WEAR
        context?.setLeftHandWear(characterData?.leftHandWear ?? "")
        context?.setLeftHandWearColor(characterData?.leftHandWearColor ?? "")
        context?.setLeftHandWearMaterial(characterData?.leftHandWearMaterial ?? "")
        context?.setRightHandWear(characterData?.rightHandWear ?? "")
        context?.setRightHandWearColor(characterData?.rightHandWearColor ?? "")
        context?.setRightHandWearMaterial(characterData?.rightHandWearMaterial ?? "")

        // WRIST WEAR
        context?.setLeftWristWear(characterData?.leftWristWear ?? "")
        context?.setLeftWristWearColor(characterData?.leftWristWearColor ?? "")
        context?.setLeftWristWearMaterial(characterData?.leftWristWearMaterial ?? "")
        context?.setRightWristWear(characterData?.rightWristWear ?? "")
        context?.setRightWristWearColor(characterData?.rightWristWearColor ?? "")
        context?.setRightWristWearMaterial(characterData?.rightWristWearMaterial ?? "")

        // FINGER WEAR
        context?.setLeftFingerWear(characterData?.leftFingerWear ?? "")
        context?.setLeftFingerWearColor(characterData?.leftFingerWearColor ?? "")
        context?.setLeftFingerWearMaterial(characterData?.leftFingerWearMaterial ?? "")
        context?.setRightFingerWear(characterData?.rightFingerWear ?? "")
        context?.setRightFingerWearColor(characterData?.rightFingerWearColor ?? "")
        context?.setRightFingerWearMaterial(characterData?.rightFingerWearMaterial ?? "")

        // TECH ACCESSORIES
        context?.setTechAccessories(characterData?.techAccessories ?? "")



        let basicInfoPrompt = buildBasicInfo(context)
        let generalPhysical = buildGeneralPhysicalAppearance(context)

        // console.log("CHANGES...", { basicInfoPrompt, generalPhysical });

        setBasicInfo(basicInfoPrompt);
        setGeneralPhysical(generalPhysical)
        setFacialFeatures(buildFacialFeatures(context));
        setHairDetails(buildHairDetails(context))
        setOutfitDetails(buildClothingDetails(context))
        setAccessoriesDetails(buildAccessories(context))

        console.log("DEMO...", {
            basicInfoPrompt
        });
        
    }, []);

    useEffect(() => {
        let basicInfoPrompt = buildBasicInfo(context)
        let generalPhysical = buildGeneralPhysicalAppearance(context)

        // console.log("CHANGES...", { basicInfoPrompt, generalPhysical });

        setBasicInfo(basicInfoPrompt);
        setGeneralPhysical(generalPhysical)
        setFacialFeatures(buildFacialFeatures(context));
        setHairDetails(buildHairDetails(context))
        setOutfitDetails(buildClothingDetails(context))
        setAccessoriesDetails(buildAccessories(context))

    }, [
        context
        // context.age,
        // context.gender,
        // context.race,
        // context.firstName,
        // context.lastName,
        // context.alias
    ]);


    return (
        // 
        <>
            <div className="grid grid-cols-1 gap-4 mb-3">
                <Button
                    onClick={() => setShowSegments(!showSegments)}
                    className="flex items-center gap-2 px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                >
                    
                    {showSegments && <EyeOffIcon className="w-4 h-4" /> }
                    {!showSegments && <Eye className="w-4 h-4" /> }
                    {showSegments ? 'Hide' : 'Show'} Segments
                </Button>
               
            </div>
            {
                showSegments &&
                <div className='max-h-[500px] overflow-auto'>
                    {basicInfo &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1 mt-3">Basic Info</p>
                            <PromptDisplay content={basicInfo} >
                                <div>{basicInfo}</div>
                            </PromptDisplay>                        
                        </div>
                    }
                    {
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">General Physical</p>
                            <PromptDisplay content={generalPhysical} >
                                <div>
                                    {context.height && <p>Height: {context.height}</p>}
                                    {context.build && <p>Build: {JSON.stringify(context.build)}</p>}
                                    {context.proportion && <p>Proportion: {context.proportion}</p>}
                                    {context.physicalMovement && <p>Physical Movement: {JSON.stringify(context.physicalMovement)}</p>}
                                </div>                            
                            </PromptDisplay>  
                        </div>
                    }
                    {
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Eyes & Eyebrows</p>
                            <PromptDisplay content={facialFeatures} >
                                <div>
                                    {context.eyeColor && <p>Eye Color: {context.eyeColor}</p>}
                                    {context.eyeShape && <p>Eye Shape: {context.eyeShape}</p>}
                                    {context.notableEyeFeature && <p>Notable Eye Features: {context.notableEyeFeature}</p>}
                                    {context.eyeAccessory && <p>Eye Accessory: {context.eyeAccessory}</p>}                                
                                    {context.eyeBrowStyle && <p>Eye Brow Style: {context.eyeBrowStyle}</p>}
                                    {context.eyeBrowPosition && <p>Eye Brow Position: {context.eyeBrowPosition}</p>}
                                    {context.eyeBrowTexture && <p>Eye Brow Texture: {context.eyeBrowTexture}</p>}
                                    {context.eyeBrowFeature && <p>Eye Brow Feature: {context.eyeBrowFeature}</p>}

                                </div>                            
                            </PromptDisplay>  
                        </div>
                    }

                    {   context.selectedFacialFeature &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Facial Features</p>
                            <PromptDisplay content={facialFeatures} >
                                <div>
                                    {context.selectedFacialFeature && <p>Facial Features: {getObjectsKeyAndValue(context.selectedFacialFeature)}</p>}
                                    {context.selectedMarks && <p>Facial Marks: {JSON.stringify(context.selectedMarks)}</p>}

                                </div>                            
                            </PromptDisplay>  
                        </div>
                    }

                    {   context.selectedFacialHair &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Facial Hair</p>
                            <PromptDisplay content={facialFeatures} >
                                <div>
                                    { context.selectedFacialHair?.beards && <p>Beard: {context.selectedFacialHair?.beards} </p> }
                                    { context.selectedFacialHair?.mustaches && <p>Mustache: {context.selectedFacialHair?.mustaches}</p> }
                                    { context.selectedFacialHair?.partialHair && <p>Partial Hair: {context.selectedFacialHair?.partialHair}</p> }
                                    { context.selectedFacialHair?.fantasyHair && <p>Fantasy Hair: {context.selectedFacialHair?.fantasyHair}</p> }
                                </div>                            
                            </PromptDisplay>  
                        </div>
                    }

                    {
                        hairDetails &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Hair Details</p>
                            <PromptDisplay>
                                <div>
                                    {context.hairColor && <p>Hair Color: {context.hairColor}</p>}
                                    {context.hairLength && <p>Hair Length: {context.hairLength}</p>}
                                    {context.hairTexture && <p>Hair Texture: {context.hairTexture}</p>}
                                    {context.hairQuirks && <p>Hair Quirks: {formatArrayStringValues(context.hairQuirks)}</p>}
                                    {context.selectedAccessories && <p>Hair Accessories: {JSON.stringify(context.selectedAccessories)}</p>}
                                </div>                            
                            </PromptDisplay> 
                        </div>
                    }

                    {
                        context.skinTone &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Skin Details</p>
                            <PromptDisplay>
                                <div>
                                    {context.skinTone && <p>Skin Tone: {context.skinTone}</p>}
                                </div>                            
                            </PromptDisplay> 
                        </div>
                    }

                    {
                        context.selectedNoseFeatures &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Nose Features</p>
                            <PromptDisplay>
                                <div>
                                    {context.selectedNoseFeatures?.shape && <p>Nose Shape: {context.selectedNoseFeatures?.shape}</p>}
                                    {context.selectedNoseFeatures?.size && <p>Nose Size: {context.selectedNoseFeatures?.size}</p>}
                                    {context.selectedNoseFeatures?.piercings && <p>Nose Piercings: {context.selectedNoseFeatures?.piercings}</p>}
                                    {context.selectedNoseFeatures?.fantasyTypes && <p>Nose Fantasy Types: {context.selectedNoseFeatures?.fantasyTypes}</p>}
                                    {context.selectedNoseFeatures?.augmentations && <p>Nose Augmentations: {context.selectedNoseFeatures?.augmentations}</p>}
                                    {context.selectedNoseFeatures?.modifications && <p>Nose Modifications: {context.selectedNoseFeatures?.modifications}</p>}
                                    {context.selectedNoseFeatures?.animalFeatures && <p>Nose Animal Features: {context.selectedNoseFeatures?.animalFeatures}</p>}
                                    
                                </div>                            
                            </PromptDisplay> 
                        </div>
                    }

                    {
                        context.selectedEarFeatures &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Ear Features</p>
                            <PromptDisplay>
                                <div>
                                    {context.selectedEarFeatures?.shape && <p>Ear Shape: {context.selectedEarFeatures?.shape}</p>}
                                    {context.selectedEarFeatures?.size && <p>Ear Size: {context.selectedEarFeatures?.size}</p>}
                                    {context.selectedEarFeatures?.piercings && <p>Ear Piercings: {context.selectedEarFeatures?.piercings}</p>}
                                    {context.selectedEarFeatures?.jewelryMaterials && <p>Ear Jewelry Materials: {context.selectedEarFeatures?.jewelryMaterials}</p>}
                                    {context.selectedEarFeatures?.augmentations && <p>Ear Augmentations: {context.selectedEarFeatures?.augmentations}</p>}                                    
                                </div>                            
                            </PromptDisplay> 
                        </div>
                    }

                    {
                        context.selectedLipFeatures &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Lip & Teeth Features</p>
                            <PromptDisplay>
                                <div className=''>
                                    <div>
                                        {context.selectedLipFeatures?.shape && <p>Lip Shape: {context.selectedLipFeatures?.shape}</p>}
                                        {context.selectedLipFeatures?.fullness && <p>Lip Fullness: {context.selectedLipFeatures?.fullness}</p>}
                                        {context.selectedLipFeatures?.adornments && <p>Lip Adornments: {context.selectedLipFeatures?.adornments}</p>}
                                        {context.selectedLipFeatures?.fantasyTypes && <p>Lip Fantasy Types: {context.selectedLipFeatures?.fantasyTypes}</p>}
                                        {context.selectedLipFeatures?.augmentations && <p>Lip Augmentations: {context.selectedLipFeatures?.augmentations}</p>}
                                        {context.selectedLipFeatures?.piercings && <p>Lip Piercings: {context.selectedLipFeatures?.piercings}</p>}
                                        {context.selectedLipFeatures?.modifications && <p>Lip Modifications: {context.selectedLipFeatures?.piercings}</p>}
                                    </div>

                                    <div>
                                        {context.teethVariation && <p className='capitalize'>Teeth Variation: {context.teethVariation}</p>}
                                        {context.dentalAccessory && <p className='capitalize'>Dental Accessory: {context.dentalAccessory}</p>}
                                    </div>
                                </div>                            
                            </PromptDisplay> 
                        </div>
                    }

                    {
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Clothing</p>
                            <PromptDisplay content={outfitDetails} >
                                <div className='max-h-[200px] overflow-auto'>
                                    <div className="mb-3">
                                        { context.fullBodyWear?.value && <p>Full Body Wear: {context.fullBodyWear.value}</p> }
                                        { context.fullBodyWearColor && <p>Full Body Wear Color: {context.fullBodyWearColor}</p> }
                                        { context.fullBodyWearPattern?.value && <p>Full Body Wear Pattern: {context.fullBodyWearPattern.value}</p> }
                                        { context.fullBodyWearMaterial?.value && <p>Full Body Wear Material: {`${context.fullBodyWearMaterial.category} ${context.fullBodyWearMaterial.value}`}</p> }
                                        { context.fullBodyWearCondition && !objectIsEmpty(context.fullBodyWearCondition) && <p>Full Body Wear Condition: {formatObjectOfArrays(context.fullBodyWearCondition)}</p> }
                                    </div>

                                    <div className="mb-3">
                                        { context.upperBodyWear?.value && <p>Upper Body Wear: {context.upperBodyWear.value}</p> }
                                        { context.upperBodyWearColor && <p>Upper Body Wear Color: {context.upperBodyWearColor}</p> }
                                        { context.upperBodyWearPattern?.value && <p>Upper Body Wear Pattern: {context.upperBodyWearPattern.value}</p> }
                                        { context.upperBodyWearMaterial?.value && <p>Upper Body Wear Material: {`${context.upperBodyWearMaterial.category} ${context.upperBodyWearMaterial.value}`}</p> }
                                        { context.upperBodyWearCondition && !objectIsEmpty(context.upperBodyWearCondition) && <p>Upper Body Wear Condition: {formatObjectOfArrays(context.upperBodyWearCondition)}</p> }
                                    </div>

                                    <div className="mb-3">
                                        { context.lowerBodyWear?.value && <p>Lower Body Wear: {context.lowerBodyWear.value}</p> }
                                        { context.lowerBodyWearColor && <p>Lower Body Wear Color: {context.lowerBodyWearColor}</p> }
                                        { context.lowerBodyWearPattern?.value && <p>Lower Body Wear Pattern: {context.lowerBodyWearPattern.value}</p> }
                                        { context.lowerBodyWearMaterial?.value && <p>Lower Body Wear Material: {`${context.lowerBodyWearMaterial.category} ${context.lowerBodyWearMaterial.value}`}</p> }
                                        { context.lowerBodyWearCondition && !objectIsEmpty(context.lowerBodyWearCondition) &&  <p>Lower Body Wear Condition: {formatObjectOfArrays(context.lowerBodyWearCondition)}</p> }
                                    </div>

                                    <div className="mb-3">
                                        { context.outerBodyWear?.value && <p>Outer Body Wear: {context.outerBodyWear.value}</p> }
                                        { context.outerBodyWearColor && <p>Outer Body Wear Color: {context.outerBodyWearColor}</p> }
                                        { context.outerBodyWearPattern?.value && <p>Outer Body Wear Pattern: {context.outerBodyWearPattern.value}</p> }
                                        { context.outerBodyWearMaterial?.value && <p>Outer Body Wear Material: {`${context.outerBodyWearMaterial.category} ${context.outerBodyWearMaterial.value}`}</p> }
                                        { context.outerBodyWearCondition && !objectIsEmpty(context.outerBodyWearCondition) &&  <p>Outer Body Wear Condition: {formatObjectOfArrays(context.outerBodyWearCondition)}</p> }
                                    </div>

                                    <div>
                                        { context.extraBodyWear?.value && <p>Extra Body Wear: {context.extraBodyWear.value}</p> }
                                        { context.extraBodyWearColor && <p>Extra Body Wear Color: {context.extraBodyWearColor}</p> }
                                        { context.extraBodyWearPattern?.value && <p>Extra Body Wear Pattern: {context.extraBodyWearPattern.value}</p> }
                                        { context.extraBodyWearMaterial?.value && <p>Extra Body Wear Material: {`${context.extraBodyWearMaterial.category} ${context.extraBodyWearMaterial.value}`}</p> }
                                        { context.extraBodyWearCondition && !objectIsEmpty(context.extraBodyWearCondition) &&  <p>Extra Body Wear Condition: {formatObjectOfArrays(context.outerBodyWearCondition)}</p> }
                                    </div>

                                </div>                            
                            </PromptDisplay> 
                        </div>
                    }

                    {
                        // accessoriesDetails &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Footwear Details</p>
                            <PromptDisplay content={accessoriesDetails} >
                                <div>
                                    { context.footwear?.value && <p>Footwear: {context.footwear?.value}</p> }
                                    { context.footWearColor && <p>Footwear Color: {context.footWearColor}</p> }
                                    { context.footWearMaterial?.value && <p>Footwear Material: {context.footWearMaterial?.value}</p> }
                                    { context.footWearPattern?.value && <p>Footwear Pattern: {context.footWearPattern?.value}</p> }
                                    { context.footWearCondition && <p>Footwear Condition: {formatObjectOfArrays(context.footWearCondition)}</p> }                                
                                </div>                            
                            </PromptDisplay>
                        </div>
                    }

                    {
                        // accessoriesDetails &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Clothing Accessories</p>
                            <PromptDisplay content={accessoriesDetails} >
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        { context.headWear?.value && <p>Head Wear: {context.headWear?.value}</p> }
                                        { context.headWearColor && <p>Head Wear Color: {context.headWearColor}</p> }
                                        { context.headWearMaterial && <p>Head Wear Material: {`${context.headWearMaterial.category} ${context.headWearMaterial.value}`}</p> }
                                        { context.headWearPattern && <p>Head Wear Pattern: {`${context.headWearPattern.category} ${context.headWearPattern.value}`}</p> }
                                        { context.headWearCondition &&  <p>Head Wear Condition: {context.headWearCondition}</p> }
                                    </div>

                                    <div>
                                        { context.eyeWear?.value && <p>Eye Wear: {context.eyeWear.value}</p> }
                                        { context.eyeWearColor && <p>Eye Wear Color: {context.eyeWearColor}</p> }
                                        { context.eyeWearCondition && <p>Eye Wear Condition: {context.eyeWearCondition}</p> }
                                    </div>

                                    <div>
                                        { context.neckWear?.value && <p>Neck Wear: {context.neckWear?.value}</p> }
                                        { context.neckWearColor && <p>Neck Wear Color: {context.neckWearColor}</p> }
                                        { context.neckWearMaterial && <p>Neck Wear Material: {`${context.neckWearMaterial.category} ${context.neckWearMaterial.value}`}</p> }
                                        { context.neckWearPattern && <p>Neck Wear Pattern: {`${context.neckWearPattern.category} ${context.neckWearPattern.value}`}</p> }
                                        {/* { context.neckWearCondition &&  <p>Neck Wear Condition: {context.neckWearCondition}</p> } */}
                                    </div>

                                    <div>
                                        { context.leftHandWear && <p>Left Hand Wear: {context.leftHandWear}</p> }
                                        { context.leftHandWearColor && <p>Left Hand Wear Color: {context.leftHandWearColor}</p> }
                                        { context.leftHandWearMaterial && <p>Left Hand Wear Material: {`${context.leftHandWearMaterial.category} ${context.leftHandWearMaterial.value}`}</p> }
                                    </div>

                                    <div>
                                        { context.rightHandWear && <p>Right Hand Wear: {context.rightHandWear}</p> }
                                        { context.rightHandWearColor && <p>Right Hand Wear Color: {context.rightHandWearColor}</p> }
                                        { context.rightHandWearMaterial && <p>Right Hand Wear Material: {`${context.rightHandWearMaterial.category} ${context.rightHandWearMaterial.value}`}</p> }
                                    </div>

                                    <div>
                                        { context.rightWristWear && <p>Right Wrist Wear: {context.rightWristWear}</p> }
                                        { context.rightWristWearColor && <p>Right Wrist Wear Color: {context.rightWristWearColor}</p> }
                                        { context.rightWristWearMaterial && <p>Right Wrist Wear Material: {`${context.rightWristWearMaterial.category} ${context.rightWristWearMaterial.value}`}</p> }
                                    </div>                                    
                                    
                                    <div>
                                        { context.leftWristWear && <p>Left Wrist Wear: {context.leftWristWear}</p> }
                                        { context.leftWristWearColor && <p>Left Wrist Wear Color: {context.leftWristWearColor}</p> }
                                        { context.leftWristWearMaterial && <p>Left Wrist Wear Material: {`${context.leftWristWearMaterial.category} ${context.leftWristWearMaterial.value}`}</p> }
                                    </div>

                                    <div>
                                        { context.rightFingerWear && <p>Right Finger Wear: {context.rightFingerWear}</p> }
                                        { context.rightFingerWearColor && <p>Right Finger Wear Color: {context.rightFingerWearColor}</p> }
                                        { context.rightFingerWearMaterial && <p>Right Finger Wear Material: {`${context.rightFingerWearMaterial.category} ${context.rightFingerWearMaterial.value}`}</p> }
                                    </div>

                                    <div>
                                        { context.leftFingerWear && <p>Left Finger Wear: {context.leftFingerWear}</p> }
                                        { context.leftFingerWearColor && <p>Left Finger Wear Color: {context.leftFingerWearColor}</p> }
                                        { context.leftFingerWearMaterial && <p>Left Finger Wear Material: {`${context.leftFingerWearMaterial.category} ${context.leftFingerWearMaterial.value}`}</p> }
                                    </div>
                                    
                                </div>                            
                            </PromptDisplay>
                        </div>
                    }

                    {
                        !objectIsEmpty(context.techAccessories) &&
                        <div className="mb-5">
                            <p className="text-md font-extrabold mb-1">Tech Accessories</p>
                            <PromptDisplay content={accessoriesDetails} >
                                <div>
                                    
                                    { context.techAccessories && <p>Tech Accessories: {formatObjectOfArrays(context.techAccessories)}</p> }

                                </div>                            
                            </PromptDisplay>
                        </div>
                    }
                </div>
            }
            {
                !showSegments &&                
                <div className="mb-5">
                    <p className="text-md font-extrabold mb-1 mt-3">Generated Prompt</p>
                    <PromptDisplay content={prompt} >
                        <div>{prompt}</div>                            
                    </PromptDisplay>
                </div>
            }
        </>
    )
}


const PromptDisplay = ({ 
    content, children 
}: {
    content?: string
    children: React.ReactNode
}) => {
    const [copied, setCopied] = useState<boolean>(false);    

    const copyToClipboard = () => {
        if(!content) return;
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);            
        }, 2000);
        toast.success("Prompt copied!");    
    };

    return (
         <div className="relative text-[11px] p-5 bg-gray-900 text-green-400 rounded-xl font-mono overflow-x-auto">
            { !copied && <Copy onClick={copyToClipboard} size={16} className="text-green-400 hover:text-green-600 cursor-pointer absolute top-2 right-2" />}
            { copied && <CheckCheck size={16} className="text-green-400 hover:text-green-600 cursor-pointer absolute top-2 right-2" />}
            {/* {content} */}
            {children}
        </div>
    )
}

export default DisplayCharacterPrompt
