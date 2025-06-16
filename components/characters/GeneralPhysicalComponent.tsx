"use client"

import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import GenericSelect from '../shared/GenericSelect';
import { useCharacterContext } from '@/contexts/CharacterContext';
import SingleSelectCategorySelector from '../shared/SingleSelectCategorySelector';

interface Props {
    openGeneralPhysicalModal: boolean;
    setOpenGeneralPhysicalModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const heightOptions = [
    // Petite Range
    "Very short (under 5')",
    "Petite (5'0\"-5'3\")",
    "Compact (5'4\")",
    
    // Average Range
    "Slightly below average (5'5\"-5'7\")",
    "Average (5'8\"-5'10\")", 
    "Slightly above average (5'11\"-6')",
    
    // Tall Range
    "Tall (6'1\"-6'3\")",
    "Very tall (6'4\"-6'6\")",
    "Exceptionally tall (6'7\"+)",
    
    // Non-standard
    "Lanky",
    "Disproportionate limbs",
    "Stooped posture",
    "Willowy"
];

const buildOptions = {
    slender: [
        // Slim/Slender Types
        "Delicate",
        "Willowy",
        "Lanky",
        "Underweight",
        "Twig-like",
        "Rangy",
    ],
    muscular: [
        // Muscular Types
        "Bodybuilder",
        "Powerlifter frame",
        "Stocky",
        "Broad-shouldered",
        "Barrel-chested",
    ],
    athletic: [
        // Athletic Types
        "Toned",
        "Swimmer's build",
        "Runner's physique",
        "Gymnast's body",
        "Wiry strength",
    ],

    curvy: [
        // Curvy/Voluptuous
        "Hourglass",
        "Pear-shaped",
        "Voluptuous",
        "Plump",
        "Rubenesque",        
    ],

    heavy: [        
        // Heavy-set/Large
        "Stout",
        "Husky",
        "Big-boned",
        "Bear-like",
        "Portly",
        "Round",
    ],

    unique: [
        // Unique/Other
        "Gangly",
        "Stretched",
        "Dwarfish",
        "Hunchbacked",
        "Top-heavy",
        "Bottom-heavy",
        "Androgynous frame"
    ]
}

const proportions = [
    "Long legs/short torso",
    "Short legs/long torso",
    "Evenly proportioned",
    "Large hands/feet",
    "Small hands/feet",
    "Elongated neck",
    "Broad hips/narrow shoulders",
    "Narrow hips/broad shoulders"
];

const physicalMovements = {
    "humanoid-gaits": [
        // Humanoid Gaits
        "Bipedal gait",
        "Hunched posture",
        "Limp",
        "Stiff joints",
    ],
    "animalistic": [
        // Animalistic
        "Quadrupedal movement",
        "Crawls",
        "Slithers",
        "Hops",
    ],
    "unnatural": [
        // Unnatural/Supernatural
        "Glides",
        "Insectoid movements",
        "Monstrous stride",
        "Unnatural gait",
    ],
    "physical-condition": [
        // Physical Conditions
        "Drunken stumble",
        "Rusty movements",
        "Twitches",
        "Flinches"
    ]

}


const GeneralPhysicalComponent: React.FC<Props> = ({ setOpenGeneralPhysicalModal, openGeneralPhysicalModal }) => {
    const { 
        height, setHeight, build, setBuild, 
        proportion, setProportion, physicalMovement, setPhysicalMovement,
        characterData
    } = useCharacterContext(); 

    useEffect(() => {
        // setHeight(characterData?.height ?? "")
        // setBuild(characterData?.build ?? "")
        // setProportion(characterData?.proportion ?? "")
        // setPhysicalMovement(characterData?.physicalMovement ?? "")
    }, []);

    
    return (
        <Sheet open={openGeneralPhysicalModal} onOpenChange={setOpenGeneralPhysicalModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[50%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>General Physical</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>

                <div className="px-7 pb-7 bg-white">
                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Height</h2>
                        <GenericSelect
                            options={heightOptions}
                            selected={height}
                            onSelect={setHeight}
                            className="w-full"
                        />
                    </div>

                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Build</h2>
        
                        <SingleSelectCategorySelector
                            options={buildOptions}
                            categoryLabels={{}}
                            selectedOption={build}
                            onSelect={(category, option) => setBuild({ category, value: option })}
                            onRemove={() => setBuild(null)}
                            placeholder="Select one"
                            title="Build"
                        />
                    </div>

                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Proportion</h2>
                        <GenericSelect
                            options={proportions}
                            selected={proportion}
                            onSelect={setProportion}
                            className="w-full"
                        />
                    </div>

                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Physical Movement</h2>
                        {/* <GenericCategorySelect
                            options={physicalMovements}
                            selectedValue={physicalMovement}
                            onSelect={setPhysicalMovement}
                            placeholder="Select a physical movement..."
                        /> */}

                        <SingleSelectCategorySelector
                            options={physicalMovements}
                            categoryLabels={{}}
                            selectedOption={physicalMovement}
                            onSelect={(category, option) => setPhysicalMovement({ category, value: option })}
                            onRemove={() => setPhysicalMovement(null)}
                            placeholder="Select one..."
                            title="Physical Movement"
                        />
                    </div>

                    


                </div>

            </SheetContent>
        </Sheet>
    )
}

export default GeneralPhysicalComponent


