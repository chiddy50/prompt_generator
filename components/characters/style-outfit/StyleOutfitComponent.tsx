"use client"

import React, { useState } from 'react'
import MainClothingComponent from './MainClothingComponent';
import FootwearComponent from './FootwearComponent';
import HeadWearComponent from './HeadWearComponent';
import EyeWearComponent from './EyeWearComponent';
import NeckWearComponent from './NeckWearComponent';
import HandWearComponent from './HandWearComponent';
import TechAccessoryComponent from './TechAccessoryComponent';

const StyleOutfitComponent = () => {
    const [openHeadWearModal, setOpenHeadWearModal] = useState<boolean>(false);
    const [openMainClothingModal, setOpenMainClothingModal] = useState<boolean>(false);
    const [openEyeWearModal, setOpenEyeWearModal] = useState<boolean>(false);
    const [openFootWearModal, setOpenFootWearModal] = useState<boolean>(false);
    const [openNeckWearModal, setOpenNeckWearModal] = useState<boolean>(false);
    const [openHandWearModal, setOpenHandWearModal] = useState<boolean>(false);
    const [openTechAccessoryModal, setOpenTechAccessoryModal] = useState<boolean>(false);

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 mt-2 gap-4">
                <button onClick={() => setOpenMainClothingModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Main Clothing
                </button>
                
                <button onClick={() => setOpenFootWearModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Footwear
                </button>

                <button onClick={() => setOpenHeadWearModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Head Wear
                </button>

                <button onClick={() => setOpenEyeWearModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Eye Wear
                </button>

                <button onClick={() => setOpenNeckWearModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Neck Wear
                </button>


                <button onClick={() => setOpenHandWearModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Hand Wear
                </button>

                {/* <button onClick={() => setOpenPropsModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Props
                </button> */}
                <button 
                 onClick={() => setOpenTechAccessoryModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                    `}>
                    Tech Accessories
                </button>
            </div>
            
            
            <MainClothingComponent 
                openModal={openMainClothingModal} 
                setOpenModal={setOpenMainClothingModal} 
            />

            <FootwearComponent
                openModal={openFootWearModal} 
                setOpenModal={setOpenFootWearModal} 
            />

            <HeadWearComponent
                openModal={openHeadWearModal} 
                setOpenModal={setOpenHeadWearModal} 
            />
            
            <EyeWearComponent
                openModal={openEyeWearModal} 
                setOpenModal={setOpenEyeWearModal} 
            />

            <NeckWearComponent
                openModal={openNeckWearModal} 
                setOpenModal={setOpenNeckWearModal} 
            />

            <HandWearComponent
                openModal={openHandWearModal} 
                setOpenModal={setOpenHandWearModal} 
            />

            <TechAccessoryComponent
                openModal={openTechAccessoryModal} 
                setOpenModal={setOpenTechAccessoryModal} 
            />

            

        </div>
    )
}

export default StyleOutfitComponent
