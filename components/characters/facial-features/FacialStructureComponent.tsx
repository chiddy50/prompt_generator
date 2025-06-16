"use client"

import { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import FacialFeatureSelector from './FacialFeatureSelector';
import FacialHairSelector from './FacialHairSelector';
import FacialMarksSelector from './FacialMarksSelector';
import { useCharacterContext } from '@/contexts/CharacterContext';



interface Props {
    openFacialStructureModal: boolean;
    setOpenFacialStructureModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const FacialStructureComponent: React.FC<Props> = ({ setOpenFacialStructureModal, openFacialStructureModal }) => {

    const { 
        selectedFacialFeature, setSelectedFacialFeature,
        selectedFacialHair, setSelectedFacialHair, 
        selectedMarks, setSelectedMarks,
        characterData
    } = useCharacterContext();       


    useEffect(() => {
        // setSelectedFacialFeature(characterData?.selectedFacialFeature ?? "")
        // setSelectedFacialHair(characterData?.selectedFacialHair ?? "")
        // setSelectedMarks(characterData?.selectedMarks ?? "")
    }, [])

    const handleFacialStructureSelect = (category: any, option: string) => {
        setSelectedFacialFeature(prev => ({
            ...prev,
            [category]: option
        }));
    };

    const handleFacialMarkSelect = (category: any, option: string) => {
        setSelectedMarks(prev => {
            const currentOptions = prev[category] || [];
            const newOptions = currentOptions.includes(option)
                ? currentOptions.filter(item => item !== option)
                : [...currentOptions, option];

            return {
                ...prev,
                [category]: newOptions
            };
        });
    };

    const handleHairSelect = (category: any, option: string) => {
        setSelectedFacialHair(prev => ({
            ...prev,
            [category]: option
        }));
    };

    const handleRemoveFacialHair = (category) => {        
        setSelectedFacialHair(prev => {
            const newSelections = { ...prev };
            delete newSelections[category];
            return newSelections;
        });
    };

    const handleRemoveFacialFeature = (category) => {
        setSelectedFacialFeature(prev => {
            const newSelections = { ...prev };
            delete newSelections[category];
            return newSelections;
        });
    };

    return (
        <Sheet open={openFacialStructureModal} onOpenChange={setOpenFacialStructureModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[99%] xs:min-w-[99%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Facial Structure</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>

                <div className="px-7 pb-7 bg-white">
                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Facial Features</h2>
                        <FacialFeatureSelector
                            onSelect={handleFacialStructureSelect}
                            selectedOptions={selectedFacialFeature}
                            onRemove={handleRemoveFacialFeature}  // Optional
                        />
                    </div>

                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Facial Hair Styles</h2>
                        <FacialHairSelector
                            onSelect={handleHairSelect}
                            selectedOptions={selectedFacialHair}
                            className="mb-6"
                            onRemove={handleRemoveFacialHair}  // Optional
                        />
                    </div>

                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Facial Marks</h2>
                        <FacialMarksSelector
                            onSelect={handleFacialMarkSelect}
                            selectedOptions={selectedMarks}
                        />
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default FacialStructureComponent
