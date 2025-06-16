"use client"

import React, { useState } from 'react'
import HairFeatureComponent from './hair/HairFeatureComponent'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import SkinToneSelector from './skin/SkinToneSelector'
import GeneralPhysicalComponent from '../GeneralPhysicalComponent'

const PhysicalAppearanceComponent = () => {
    const [openHairFeatureModal, setOpenHairFeatureModal] = useState<boolean>(false);
    const [openGeneralPhysicalModal, setOpenGeneralPhysicalModal] = useState<boolean>(false);

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 mt-2 gap-4">
                <button onClick={() => setOpenGeneralPhysicalModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                `}>
                    General Physical
                </button>
                
                <button onClick={() => setOpenHairFeatureModal(true)} 
                className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                `}>
                    Hair & Skin
                </button>
            </div>

            <HairFeatureComponent 
                openHairFeatureModal={openHairFeatureModal} 
                setOpenHairFeatureModal={setOpenHairFeatureModal} 
            />

            <GeneralPhysicalComponent 
            openGeneralPhysicalModal={openGeneralPhysicalModal} 
            setOpenGeneralPhysicalModal={setOpenGeneralPhysicalModal}
            />

        </div>
    )
}

export default PhysicalAppearanceComponent
