"use client"

import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import outfitCustomization from "@/data/character/outfit"
import SingleSelectCategorySelector from '@/components/shared/SingleSelectCategorySelector';
import ColorSelector from '@/components/shared/ColorSelector';
import { useCharacterContext } from '@/contexts/CharacterContext';
import MultipleCategorySelector from '@/components/shared/MultipleCategorySelector';
import { itemConditions } from '@/data/character/outfit/itemConditions';

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const MainClothingComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {

    const {         
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
        setUpperBodyWearCondition, upperBodyWearCondition,

        // LOWER BODY WEAR
        lowerBodyWear, setLowerBodyWear,
        lowerBodyWearMaterial, setLowerBodyWearMaterial,
        lowerBodyWearColor, setLowerBodyWearColor,
        lowerBodyWearPattern, setLowerBodyWearPattern,
        setLowerBodyWearCondition, lowerBodyWearCondition,

        // OUTER BODY WEAR
        outerBodyWear, setOuterBodyWear,
        outerBodyWearMaterial, setOuterBodyWearMaterial,
        outerBodyWearColor, setOuterBodyWearColor,
        outerBodyWearPattern, setOuterBodyWearPattern,
        setOuterBodyWearCondition, outerBodyWearCondition,

        // EXTRA BODY WEAR
        extraBodyWear, setExtraBodyWear,
        extraBodyWearMaterial, setExtraBodyWearMaterial,
        extraBodyWearColor, setExtraBodyWearColor,
        extraBodyWearPattern, setExtraBodyWearPattern,
        setExtraBodyWearCondition,
        extraBodyWearCondition,

        characterData,
    } = useCharacterContext(); 


    useEffect(() => {
        // // FULL BODY WEAR
        // setFullBodyWear(characterData?.fullBodyWear ?? "")
        // setFullBodyWearMaterial(characterData?.fullBodyWearMaterial ?? "")
        // setFullBodyWearColor(characterData?.fullBodyWearColor ?? "")
        // setFullBodyWearCondition(characterData?.fullBodyWearCondition ?? "")

        // // UPPER BODY WEAR
        // setUpperBodyWear(characterData?.upperBodyWear ?? "")
        // setUpperBodyWearMaterial(characterData?.upperBodyWearMaterial ?? "")
        // setUpperBodyWearColor(characterData?.upperBodyWearColor ?? "")
        // setUpperBodyWearPattern(characterData?.upperBodyWearPattern ?? "")
        // setUpperBodyWearCondition(characterData?.upperBodyWearCondition ?? "")

        // // LOWER BODY WEAR
        // setLowerBodyWear(characterData?.lowerBodyWear ?? "")
        // setLowerBodyWearMaterial(characterData?.lowerBodyWearMaterial ?? "")
        // setLowerBodyWearColor(characterData?.lowerBodyWearColor ?? "")
        // setLowerBodyWearPattern(characterData?.lowerBodyWearPattern ?? "")
        // setLowerBodyWearCondition(characterData?.lowerBodyWearCondition ?? "")

        // // OUTER BODY WEAR
        // setOuterBodyWear(characterData?.outerBodyWear ?? "")
        // setOuterBodyWearMaterial(characterData?.outerBodyWearMaterial ?? "")
        // setOuterBodyWearColor(characterData?.outerBodyWearColor ?? "")
        // setOuterBodyWearPattern(characterData?.outerBodyWearPattern ?? "")
        // setOuterBodyWearCondition(characterData?.outerBodyWearCondition ?? "")
        
        // // EXTRA BODY WEAR        
        // setExtraBodyWear(characterData?.extraBodyWear ?? "")
        // setExtraBodyWearMaterial(characterData?.extraBodyWearMaterial ?? "")
        // setExtraBodyWearColor(characterData?.extraBodyWearColor ?? "")
        // setExtraBodyWearPattern(characterData?.extraBodyWearPattern ?? "")
        // setExtraBodyWearCondition(characterData?.extraBodyWearCondition ?? "")
        
    }, []);


    const lowerBodyWearLabels = {
        eastAsian: "East Asian",
        southAsian: "South Asian",
        southEastAsian: "South East Asian",
        middleEastern: "Middle Eastern"
    }

    const outerBodyWearLabels = {
        fantasyHistorical: "Fantasy & Historical",
    };

    const extraBodyWearLabels = {
        legwear: "Leg Wear",
    };
    




    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Main Clothing</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white mb-20">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Full Body Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                {/* FULL BODY WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Full Body Wear</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.fullBodyWear}
                                            categoryLabels={{
                                                mensSuits: "Men's Suits",
                                                womensSuits: "Women's Suits"
                                            }}
                                            selectedOption={fullBodyWear}
                                            onSelect={(category, option) => setFullBodyWear({ category, value: option })}
                                            onRemove={() => setFullBodyWear(null)}
                                            placeholder="Select one full body wear..."
                                            title="Full Body Wear"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={fullBodyWearColor}
                                            onColorChange={setFullBodyWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={fullBodyWearMaterial}
                                            onSelect={(category, option) => setFullBodyWearMaterial({ category, value: option })}
                                            onRemove={() => setFullBodyWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Pattern</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.patterns}
                                            categoryLabels={{}}
                                            selectedOption={fullBodyWearPattern}
                                            onSelect={(category, option) => setFullBodyWearPattern({ category, value: option })}
                                            onRemove={() => setFullBodyWearPattern(null)}
                                            placeholder="Select one pattern..."
                                            title="Pattern"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Condition</h2>

                                        <MultipleCategorySelector
                                            data={itemConditions.clothing}
                                            categoryLabels={{
                                                generalWear: 'General Wear'
                                            }}
                                            onSelectionChange={(selections) => setFullBodyWearCondition(selections)}
                                            state={fullBodyWearCondition}
                                        />                                  
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Upper Body Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                {/* UPPER BODY WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Upper Body Wear</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.upperBodyWear}
                                            categoryLabels={{}}
                                            selectedOption={upperBodyWear}
                                            onSelect={(category, option) => setUpperBodyWear({ category, value: option })}
                                            onRemove={() => setUpperBodyWear(null)}
                                            placeholder="Select one full body wear..."
                                            title="Full Body Wear"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={upperBodyWearColor}
                                            onColorChange={setUpperBodyWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={upperBodyWearMaterial}
                                            onSelect={(category, option) => setUpperBodyWearMaterial({ category, value: option })}
                                            onRemove={() => setUpperBodyWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Pattern</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.patterns}
                                            categoryLabels={{}}
                                            selectedOption={upperBodyWearPattern}
                                            onSelect={(category, option) => setUpperBodyWearPattern({ category, value: option })}
                                            onRemove={() => setUpperBodyWearPattern(null)}
                                            placeholder="Select one pattern..."
                                            title="Pattern"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Condition</h2>

                                        <MultipleCategorySelector
                                            data={itemConditions.clothing}
                                            categoryLabels={{
                                                generalWear: 'General Wear'
                                            }}
                                            onSelectionChange={(selections) => setUpperBodyWearCondition(selections)}
                                            state={upperBodyWearCondition}
                                        />                                  
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Lower Body Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                {/* LOWER BODY WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Lower Body Wear</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.lowerBodyWear}
                                            categoryLabels={lowerBodyWearLabels}
                                            selectedOption={lowerBodyWear}
                                            onSelect={(category, option) => setLowerBodyWear({ category, value: option })}
                                            onRemove={() => setLowerBodyWear(null)}
                                            placeholder="Select one lower body wear..."
                                            title="Lower Body Wear"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={lowerBodyWearColor}
                                            onColorChange={setLowerBodyWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={lowerBodyWearMaterial}
                                            onSelect={(category, option) => setLowerBodyWearMaterial({ category, value: option })}
                                            onRemove={() => setLowerBodyWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Pattern</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.patterns}
                                            categoryLabels={{}}
                                            selectedOption={lowerBodyWearPattern}
                                            onSelect={(category, option) => setLowerBodyWearPattern({ category, value: option })}
                                            onRemove={() => setLowerBodyWearPattern(null)}
                                            placeholder="Select one pattern..."
                                            title="Pattern"
                                        />
                                    </div>


                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Condition</h2>

                                        <MultipleCategorySelector
                                            data={itemConditions.clothing}
                                            categoryLabels={{
                                                generalWear: 'General Wear'
                                            }}
                                            onSelectionChange={(selections) => setLowerBodyWearCondition(selections)}
                                            state={lowerBodyWearCondition}
                                        />                                  
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Outer Body Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                {/* LOWER BODY WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Outer Body Wear</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.outerWear}
                                            categoryLabels={outerBodyWearLabels}
                                            selectedOption={outerBodyWear}
                                            onSelect={(category, option) => setOuterBodyWear({ category, value: option })}
                                            onRemove={() => setOuterBodyWear(null)}
                                            placeholder="Select one outer body wear..."
                                            title="Outer Body Wear"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={outerBodyWearColor}
                                            onColorChange={setOuterBodyWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={outerBodyWearMaterial}
                                            onSelect={(category, option) => setOuterBodyWearMaterial({ category, value: option })}
                                            onRemove={() => setOuterBodyWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Pattern</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.patterns}
                                            categoryLabels={{}}
                                            selectedOption={outerBodyWearPattern}
                                            onSelect={(category, option) => setOuterBodyWearPattern({ category, value: option })}
                                            onRemove={() => setOuterBodyWearPattern(null)}
                                            placeholder="Select one pattern..."
                                            title="Pattern"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Condition</h2>

                                        <MultipleCategorySelector
                                            data={itemConditions.clothing}
                                            categoryLabels={{
                                                generalWear: 'General Wear'
                                            }}
                                            onSelectionChange={(selections) => setOuterBodyWearCondition(selections)}
                                            state={outerBodyWearCondition}
                                        />                                  
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Extra Body Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                {/* EXTRA BODY WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Extra Body Wear</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.extraBodyWearOptions}
                                            categoryLabels={extraBodyWearLabels}
                                            selectedOption={extraBodyWear}
                                            onSelect={(category, option) => setExtraBodyWear({ category, value: option })}
                                            onRemove={() => setExtraBodyWear(null)}
                                            placeholder="Select one extra body wear..."
                                            title="Extra Body Wear"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={extraBodyWearColor}
                                            onColorChange={setExtraBodyWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={extraBodyWearMaterial}
                                            onSelect={(category, option) => setExtraBodyWearMaterial({ category, value: option })}
                                            onRemove={() => setExtraBodyWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Pattern</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.patterns}
                                            categoryLabels={{}}
                                            selectedOption={extraBodyWearPattern}
                                            onSelect={(category, option) => setExtraBodyWearPattern({ category, value: option })}
                                            onRemove={() => setExtraBodyWearPattern(null)}
                                            placeholder="Select one pattern..."
                                            title="Pattern"
                                        />
                                    </div>


                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Condition</h2>

                                        <MultipleCategorySelector
                                            data={itemConditions.clothing}
                                            categoryLabels={{
                                                generalWear: 'General Wear'
                                            }}
                                            onSelectionChange={(selections) => setExtraBodyWearCondition(selections)}
                                            state={extraBodyWearCondition}
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

export default MainClothingComponent
