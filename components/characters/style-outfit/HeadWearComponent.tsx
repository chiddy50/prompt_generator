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
import MultipleCategorySelector from '@/components/shared/MultipleCategorySelector';
import { itemConditions } from '@/data/character/outfit/itemConditions';
import GenericSelect from '@/components/shared/GenericSelect';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadWearComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {
    const { 
        headWear, setHeadWear, headWearColor, setHeadWearColor, headWearMaterial, setHeadWearMaterial,      
        setHeadWearPattern, headWearPattern, setHeadWearCondition, headWearCondition,
        characterData  
    } = useCharacterContext(); 

    useEffect(() => {
        // setHeadWear(characterData?.headWear ?? "")
        // setHeadWearColor(characterData?.headWearColor ?? "")
        // setHeadWearMaterial(characterData?.headWearMaterial ?? "")
        // setHeadWearPattern(characterData?.headWearPattern ?? "")
    }, [])

    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Head Wear Customization</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white">
                    <Accordion type="single" collapsible defaultValue='item-1'>
                        <AccordionItem value="item-1" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Head Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                
                                {/* HEAD WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Head Wear</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.headWear}
                                            categoryLabels={{}}
                                            selectedOption={headWear}
                                            onSelect={(category, option) => setHeadWear({ category, value: option })}
                                            onRemove={() => setHeadWear(null)}
                                            placeholder="Select one head wear..."
                                            title="Head Wear"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={headWearColor}
                                            onColorChange={setHeadWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={headWearMaterial}
                                            onSelect={(category, option) => setHeadWearMaterial({ category, value: option })}
                                            onRemove={() => setHeadWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Pattern</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.patterns}
                                            categoryLabels={{}}
                                            selectedOption={headWearPattern}
                                            onSelect={(category, option) => setHeadWearPattern({ category, value: option })}
                                            onRemove={() => setHeadWearPattern(null)}
                                            placeholder="Select one pattern..."
                                            title="Pattern"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Condition</h2>        
                                        <GenericSelect
                                            options={itemConditions.accessories.headwear}
                                            selected={headWearCondition}
                                            onSelect={setHeadWearCondition}
                                            className="w-full"
                                        />                              
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>



                    </Accordion>
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default HeadWearComponent
