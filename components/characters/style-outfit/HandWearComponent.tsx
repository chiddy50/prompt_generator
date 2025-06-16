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
import GenericMultiSelect from '@/components/shared/GenericMultiSelect';
import { useCharacterContext } from '@/contexts/CharacterContext';
import GenericSelect from '@/components/shared/GenericSelect';
import { Separator } from '@radix-ui/react-separator';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HandWearComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {
    const {
        leftHandWear, setLeftHandWear, leftHandWearColor, setLeftHandWearColor, leftHandWearMaterial, setLeftHandWearMaterial,
        rightHandWear, setRightHandWear, rightHandWearColor, setRightHandWearColor, rightHandWearMaterial, setRightHandWearMaterial,

        // WRIST WEAR
        leftWristWear, setLeftWristWear, leftWristWearColor, setLeftWristWearColor, leftWristWearMaterial, setLeftWristWearMaterial,
        rightWristWear, setRightWristWear, rightWristWearColor, setRightWristWearColor, rightWristWearMaterial, setRightWristWearMaterial,

        // FINGER WEAR
        leftFingerWear, setLeftFingerWear, leftFingerWearColor, setLeftFingerWearColor, leftFingerWearMaterial, setLeftFingerWearMaterial,
        rightFingerWear, setRightFingerWear, rightFingerWearColor, setRightFingerWearColor, rightFingerWearMaterial, setRightFingerWearMaterial,

        characterData
    } = useCharacterContext();

    useEffect(() => {
        // setLeftHandWear(characterData?.leftHandWear ?? "")
        // setLeftHandWearColor(characterData?.leftHandWearColor ?? "")
        // setLeftHandWearMaterial(characterData?.leftHandWearMaterial ?? "")
        // setRightHandWear(characterData?.rightHandWear ?? "")
        // setRightHandWearColor(characterData?.rightHandWearColor ?? "")
        // setRightHandWearMaterial(characterData?.rightHandWearMaterial ?? "")

        // // WRIST WEAR
        // setLeftWristWear(characterData?.leftWristWear ?? "")
        // setLeftWristWearColor(characterData?.leftWristWearColor ?? "")
        // setLeftWristWearMaterial(characterData?.leftWristWearMaterial ?? "")
        // setRightWristWear(characterData?.rightWristWear ?? "")
        // setRightWristWearColor(characterData?.rightWristWearColor ?? "")
        // setRightWristWearMaterial(characterData?.rightWristWearMaterial ?? "")

        // // FINGER WEAR
        // setLeftFingerWear(characterData?.leftFingerWear ?? "")
        // setLeftFingerWearColor(characterData?.leftFingerWearColor ?? "")
        // setLeftFingerWearMaterial(characterData?.leftFingerWearMaterial ?? "")
        // setRightFingerWear(characterData?.rightFingerWear ?? "")
        // setRightFingerWearColor(characterData?.rightFingerWearColor ?? "")
        // setRightFingerWearMaterial(characterData?.rightFingerWearMaterial ?? "")

    }, [])

    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Hand Wear</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white">
                    <Accordion type="single" collapsible >

                        <AccordionItem value="item-1" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Right Hand Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>

                                {/* RIGHT HAND WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Right Hand Wear</h2>
                                        <GenericSelect
                                            options={outfitCustomization.handOptions}
                                            selected={rightHandWear}
                                            onSelect={setRightHandWear}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Hand Wear Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={rightHandWearColor}
                                            onColorChange={setRightHandWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Hand Wear Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={rightHandWearMaterial}
                                            onSelect={(category, option) => setRightHandWearMaterial({ category, value: option })}
                                            onRemove={() => setRightHandWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Left Hand Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>

                                {/* HAND WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Left Hand Wear</h2>
                                        <GenericSelect
                                            options={outfitCustomization.handOptions}
                                            selected={leftHandWear}
                                            onSelect={setLeftHandWear}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Hand Wear Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={leftHandWearColor}
                                            onColorChange={setLeftHandWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Hand Wear Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={leftHandWearMaterial}
                                            onSelect={(category, option) => setLeftHandWearMaterial({ category, value: option })}
                                            onRemove={() => setLeftHandWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <h1 className='text-2xl font-extrabold my-4'>Wrist Wear</h1>

                        <AccordionItem value="item-3" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Right Wrist Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>

                                {/* RIGHT WRIST WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Right Wrist Wear</h2>
                                        <GenericSelect
                                            options={outfitCustomization.wristOptions}
                                            selected={rightWristWear}
                                            onSelect={setRightWristWear}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={rightWristWearColor}
                                            onColorChange={setRightWristWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={rightWristWearMaterial}
                                            onSelect={(category, option) => setRightWristWearMaterial({ category, value: option })}
                                            onRemove={() => setRightWristWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Left Wrist Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>

                                {/* LEFT WRIST WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Left Wrist Wear</h2>
                                        <GenericSelect
                                            options={outfitCustomization.wristOptions}
                                            selected={leftWristWear}
                                            onSelect={setLeftWristWear}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={leftWristWearColor}
                                            onColorChange={setLeftWristWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={leftWristWearMaterial}
                                            onSelect={(category, option) => setLeftWristWearMaterial({ category, value: option })}
                                            onRemove={() => setLeftWristWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <h1 className='text-2xl font-extrabold my-4'>Finger Wear</h1>

                        <AccordionItem value="item-5" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Right Finger Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>

                                {/* RIGHT FINGER WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Right Finger Wear</h2>
                                        <GenericSelect
                                            options={outfitCustomization.fingerOptions}
                                            selected={rightFingerWear}
                                            onSelect={setRightFingerWear}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={rightFingerWearColor}
                                            onColorChange={setRightFingerWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={rightFingerWearMaterial}
                                            onSelect={(category, option) => setRightFingerWearMaterial({ category, value: option })}
                                            onRemove={() => setRightFingerWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
                                        />
                                    </div>

                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem] bg-gray-900 text-white">
                                <h1 className="text-md font-bold">Left Finger Wear</h1>
                            </AccordionTrigger>
                            <AccordionContent>

                                {/* LEFT WRIST WEAR */}
                                <div className='mb-7'>
                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Left Finger Wear</h2>
                                        <GenericSelect
                                            options={outfitCustomization.wristOptions}
                                            selected={leftFingerWear}
                                            onSelect={setLeftFingerWear}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="my-5">
                                        <label className="block text-sm font-medium  mb-1.5">Color</label>
                                        <ColorSelector
                                            colors={outfitCustomization.colors}
                                            selectedColor={leftFingerWearColor}
                                            onColorChange={setLeftFingerWearColor}
                                        />
                                    </div>

                                    <div className="my-5">
                                        <h2 className="text-sm font-medium mb-1.5">Material</h2>

                                        <SingleSelectCategorySelector
                                            options={outfitCustomization.materials}
                                            categoryLabels={{}}
                                            selectedOption={leftFingerWearMaterial}
                                            onSelect={(category, option) => setLeftFingerWearMaterial({ category, value: option })}
                                            onRemove={() => setLeftFingerWearMaterial(null)}
                                            placeholder="Select one material..."
                                            title="Material"
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

export default HandWearComponent
