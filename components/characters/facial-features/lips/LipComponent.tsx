"use client"

import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import CategorySelector from '@/components/shared/CategorySelector';
import { lipOptions } from '@/data/character/lips';
import GenericSelect from '@/components/shared/GenericSelect';
import { Separator } from '@/components/ui/separator';
import { dentalAccessories, teethVariations } from '@/data/character/teeth';
import { useCharacterContext } from '@/contexts/CharacterContext';

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const lipLabels = {
    fantasyTypes: "Fantasy Type",
    fullness: "Lip Fullness"
};


const LipComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {

    const { 
        selectedLipFeatures, setSelectedLipFeatures,   
        teethVariation, setTeethVariation,
        dentalAccessory, setDentalAccessory,
        characterData
    } = useCharacterContext(); 

    useEffect(() => {
        // setSelectedLipFeatures(characterData?.selectedLipFeatures ?? "")
        // setTeethVariation(characterData?.teethVariation ?? "")
        // setDentalAccessory(characterData?.dentalAccessory ?? "")
    }, []);

    const handleLipSelect = (category, option) => setSelectedLipFeatures(prev => ({ ...prev, [category]: option }))

    const handleLipRemove = (category) => {
        setSelectedLipFeatures(prev => {
            const newSelections = { ...prev };
            delete newSelections[category];
            return newSelections;
        });
    };

    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 xs:min-w-[90%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Lip & Teeth</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white">
                    <div className="mt-5 mb-7">
                        <h2 className="text-sm font-medium mb-1.5">Lip</h2>

                        <CategorySelector
                            options={lipOptions}
                            categoryLabels={lipLabels}
                            selectedOptions={selectedLipFeatures}
                            onSelect={handleLipSelect}
                            onRemove={handleLipRemove}
                            placeholder="Select Lip features..."
                            title="Lip Categories"
                        />
                    </div>

                    <Separator className='border border-gray-200' />

                    <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Teeth Variation</h2>
                            <GenericSelect
                                options={teethVariations}
                                selected={teethVariation}
                                onSelect={setTeethVariation}
                                className="w-full"
                            />
                        </div>

                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Teeth Accessory</h2>
                            <GenericSelect
                                options={dentalAccessories}
                                selected={dentalAccessory}
                                onSelect={setDentalAccessory}
                                className="w-full"
                            />
                        </div>
                    </div>

                </div>

            </SheetContent>
        </Sheet>
    )
}

export default LipComponent
