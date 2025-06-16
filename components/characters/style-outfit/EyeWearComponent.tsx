"use client"

import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SingleSelectCategorySelector from '@/components/shared/SingleSelectCategorySelector';
import outfitCustomization from '@/data/character/outfit';
import ColorSelector from '@/components/shared/ColorSelector';
import { useCharacterContext } from '@/contexts/CharacterContext';
import GenericSelect from '@/components/shared/GenericSelect';
import { itemConditions } from '@/data/character/outfit/itemConditions';

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EyeWearComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {

    const { 
        eyeWear, setEyeWear, eyeWearColor, setEyeWearColor, setEyeWearCondition, eyeWearCondition,    
        characterData
    } = useCharacterContext(); 

    useEffect(() => {
        // setEyeWear(characterData?.eyeWear ?? "")
        // setEyeWearColor(characterData?.eyeWearColor ?? "")
    }, [])
    

    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Eye Wear Customization</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white">                    
                    <div className="mb-5">
                        <div className="my-5">
                            <h2 className="text-sm font-medium mb-1.5">Eye Wear</h2>

                            <SingleSelectCategorySelector
                                options={outfitCustomization.eyeWearOptions}
                                categoryLabels={{}}
                                selectedOption={eyeWear}
                                onSelect={(category, option) => setEyeWear({ category, value: option })}
                                onRemove={() => setEyeWear(null)}
                                placeholder="Select one head wear..."
                                title="Head Wear"
                            />
                        </div>

                        <div className="my-5">
                            <label className="block text-sm font-medium  mb-1.5">Eye Wear Color</label>
                            <ColorSelector
                                colors={outfitCustomization.colors}
                                selectedColor={eyeWearColor}
                                onColorChange={setEyeWearColor}
                            />
                        </div>

                        <div className="my-5">
                            <h2 className="text-sm font-medium mb-1.5">Condition</h2>        
                            <GenericSelect
                                options={itemConditions.accessories.eyewear}
                                selected={eyeWearCondition}
                                onSelect={setEyeWearCondition}
                                className="w-full"
                            />                              
                        </div>
                        
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default EyeWearComponent
