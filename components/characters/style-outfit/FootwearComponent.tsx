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
import { MaterialCategoryType } from '@/types/MaterialCategoryType';
import { useCharacterContext } from '@/contexts/CharacterContext';
import MultipleCategorySelector from '@/components/shared/MultipleCategorySelector';
import { itemConditions } from '@/data/character/outfit/itemConditions';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}


type FootwearCategory = "casual" | "formal" | "athletic" | "boots" | "cultural"

const FootwearComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {
    const { 
        footwear, setFootwear, footWearColor, setFootWearColor, footWearMaterial, setFootWearMaterial,
        footWearPattern, setFootWearPattern, footWearCondition, setFootWearCondition,
        characterData
    } = useCharacterContext(); 

    useEffect(() => {
        // setFootwear(characterData?.footwear ?? "")
        // setFootWearColor(characterData?.footWearColor ?? "")
        // setFootWearMaterial(characterData?.footWearMaterial ?? "")
        // setFootWearPattern(characterData?.footWearPattern ?? "")
    }, [])

    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Footwear Customization</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white">
                    {/* FOOTWEAR */}
                    <div className='mb-7'>
                        <div className="my-5">
                            <h2 className="text-sm font-medium mb-1.5">Footwear</h2>

                            <SingleSelectCategorySelector
                                options={outfitCustomization.footwear}
                                categoryLabels={{}}
                                selectedOption={footwear}
                                onSelect={(category, option) => setFootwear({ category, value: option })}
                                onRemove={() => setFootwear(null)}
                                placeholder="Select one footwear..."
                                title="FootWear"
                            />
                        </div>

                        <div className="my-5">
                            <label className="block text-sm font-medium  mb-1.5">Footwear Color</label>
                            <ColorSelector
                                colors={outfitCustomization.colors}
                                selectedColor={footWearColor}
                                onColorChange={setFootWearColor}
                            />
                        </div>

                        <div className="my-5">
                            <h2 className="text-sm font-medium mb-1.5">Footwear Material</h2>

                            <SingleSelectCategorySelector
                                options={outfitCustomization.materials}
                                categoryLabels={{}}
                                selectedOption={footWearMaterial}
                                onSelect={(category, option) => setFootWearMaterial({ category, value: option })}
                                onRemove={() => setFootWearMaterial(null)}
                                placeholder="Select material..."
                                title="Material"
                            />
                        </div>

                        <div className="my-5">
                            <h2 className="text-sm font-medium mb-1.5">Footwear Pattern</h2>

                            <SingleSelectCategorySelector
                                options={outfitCustomization.patterns}
                                categoryLabels={{}}
                                selectedOption={footWearPattern}
                                onSelect={(category, option) => setFootWearPattern({ category, value: option })}
                                onRemove={() => setFootWearPattern(null)}
                                placeholder="Select one pattern..."
                                title="Pattern"
                            />
                        </div>

                        <div className="my-5">
                            <h2 className="text-sm font-medium mb-1.5">Footwear Condition</h2>

                            <MultipleCategorySelector
                                data={itemConditions.footwear}
                                categoryLabels={{
                                    generalWear: 'General Wear'
                                }}
                                onSelectionChange={(selections) => setFootWearCondition(selections)}
                                state={footWearCondition}
                            />                                  
                        </div>
                    </div>
                    
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default FootwearComponent
