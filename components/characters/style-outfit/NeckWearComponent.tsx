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


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NeckWearComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {
    const { 
        neckWear, setNeckWear, neckWearColor, setNeckWearColor, neckWearMaterial, setNeckWearMaterial,  
        neckWearPattern, setNeckWearPattern,
        characterData      
    } = useCharacterContext();


    useEffect(() => {
        // setNeckWear(characterData?.neckWear ?? "")
        // setNeckWearColor(characterData?.neckWearColor ?? "")
        // setNeckWearMaterial(characterData?.neckWearMaterial ?? "")
    }, []);

    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Neck Wear Customization</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white">
                    <Accordion type="single" collapsible defaultValue='item-1'>
                        <AccordionItem value="item-1" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Neck Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Neck Wear</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.neckWearOptions}
                                            categoryLabels={{}}
                                            selectedOption={neckWear}
                                            onSelect={(category, option) => setNeckWear({ category, value: option })}
                                            onRemove={() => setNeckWear(null)}
                                            placeholder="Select one neck wear..."
                                            title="Neck Wear"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Neck Wear Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={neckWearColor}
                                            onColorChange={setNeckWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Neck Wear Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={neckWearMaterial}
                                            onSelect={(category, option) => setNeckWearMaterial({ category, value: option })}
                                            onRemove={() => setNeckWearMaterial(null)}
                                            placeholder="Select one neck wear material..."
                                            title="Material"
                                        />
                                    </div>


                                    
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Pattern</h2>
                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.patterns}
                                            categoryLabels={{}}
                                            selectedOption={neckWearPattern}
                                            onSelect={(category, option) => setNeckWearPattern({ category, value: option })}
                                            onRemove={() => setNeckWearPattern(null)}
                                            placeholder="Select one pattern..."
                                            title="Pattern"
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

export default NeckWearComponent
