"use client"

import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator';
import CategorySelector from '@/components/shared/CategorySelector';
import { noseOptions } from '@/data/character/nose';
import { earOptions } from '@/data/character/ear';
import { useCharacterContext } from '@/contexts/CharacterContext';

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const noseLabels = {
    fantasyTypes: "Fantasy Type",
    animalFeatures: "Animal Features"
};

const earLabels = {
    fantasyTypes: "Fantasy Type",
    animalFeatures: "Animal Features"
};

const NoseComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {

    const { 
        characterData,
        selectedNoseFeatures, setSelectedNoseFeatures,
        selectedEarFeatures, setSelectedEarFeatures   
    } = useCharacterContext();   

    useEffect(() => {
        // setSelectedNoseFeatures(characterData?.selectedNoseFeatures ?? "")
        // setSelectedEarFeatures(characterData?.selectedEarFeatures ?? "")

    }, [])

    const handleNoseSelect = (category, option) => setSelectedNoseFeatures(prev => ({ ...prev, [category]: option }))
    const handleEarSelect = (category, option) => setSelectedEarFeatures(prev => ({ ...prev, [category]: option }))


    const handleNoseRemove = (category) => {
        setSelectedNoseFeatures(prev => {
            const newSelections = { ...prev };
            delete newSelections[category];
            return newSelections;
        });
    };

    const handleEarRemove = (category) => {
        setSelectedEarFeatures(prev => {
            const newSelections = { ...prev };
            delete newSelections[category];
            return newSelections;
        });
    };


    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Nose & Ear</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white">
                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Nose</h2>

                        <CategorySelector
                            options={noseOptions}
                            categoryLabels={noseLabels}
                            selectedOptions={selectedNoseFeatures}
                            onSelect={handleNoseSelect}
                            onRemove={handleNoseRemove}
                            placeholder="Select Nose features..."
                            title="Nose Categories"
                        />
                    </div>

                    <Separator className='border border-gray-100' />

                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Ear</h2>
                        <CategorySelector
                            options={earOptions}
                            categoryLabels={earLabels}
                            selectedOptions={selectedEarFeatures}
                            onSelect={handleEarSelect}
                            onRemove={handleEarRemove}
                            placeholder="Select Ear features..."
                            title="Ear Categories"
                        />
                    </div>
                </div>


            </SheetContent>
        </Sheet>
    )
}

export default NoseComponent
