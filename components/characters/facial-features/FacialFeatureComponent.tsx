"use client"

import { useState } from 'react';
import FacialStructureComponent from './FacialStructureComponent';
import EyeComponent from './EyeComponent';
import NoseComponent from '@/components/characters/facial-features/nose/NoseComponent';
import LipComponent from './lips/LipComponent';


const FacialFeatureComponent = () => {
    
    const [openFacialStructureModal, setOpenFacialStructureModal] = useState<boolean>(false);
    const [openEyeModal, setOpenEyeModal] = useState<boolean>(false);
    const [openNoseModal, setOpenNoseModal] = useState<boolean>(false);
    const [openLipsModal, setOpenLipsModal] = useState<boolean>(false);


    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 mt-2 gap-4">
                <button
                    onClick={() => setOpenEyeModal(true)}
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Eyes
                </button>

                <button
                    onClick={() => setOpenNoseModal(true)}
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Nose & Ear
                </button>

                <button
                    onClick={() => setOpenLipsModal(true)}
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                `}>
                    Lips & Teeth
                </button>

                <button
                    onClick={() => setOpenFacialStructureModal(true)}
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Facial Structure
                </button>


            </div>


            <FacialStructureComponent
                setOpenFacialStructureModal={setOpenFacialStructureModal}
                openFacialStructureModal={openFacialStructureModal}
            />

            <EyeComponent
                setOpenModal={setOpenEyeModal}
                openModal={openEyeModal}
            />

            <NoseComponent
                setOpenModal={setOpenNoseModal}
                openModal={openNoseModal}
            />

            <LipComponent
                setOpenModal={setOpenLipsModal}
                openModal={openLipsModal}
            />


        </>
    )
}

export default FacialFeatureComponent
