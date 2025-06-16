"use client"

import React, { useState } from 'react'
import GenericSelect from '@/components/shared/GenericSelect'
import { environmentParameters } from '@/data/scene/setting';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import MultipleCategorySelector from '../shared/MultipleCategorySelector';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BackgroundComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {
    const [wallTreatment, setWallTreatment] = useState<string | null>(null);
    const [spaceDensity, setSpaceDensity] = useState<string | null>(null);
    const [backgroundElements, setBackgroundElements] = useState<Partial<Record<any, string[]>>>({});

    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0  xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Background</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className='px-7 pb-7 flex flex-col gap-7'>
                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Wall Treatment</h2>
                        <GenericSelect
                            options={environmentParameters.backgroundControl.wallTreatments}
                            selected={wallTreatment}
                            onSelect={setWallTreatment}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Space Density</h2>
                        <GenericSelect
                            options={environmentParameters.backgroundControl.spaceDensity}
                            selected={spaceDensity}
                            onSelect={setSpaceDensity}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Background Elements</h2>
                        <MultipleCategorySelector
                            data={environmentParameters.backgroundControl.specificBackgroundElements}
                            categoryLabels={{
                                atmosphericElements: 'Atmospheric Elements',
                                naturalElements: "Natural Elements"
                            }}
                            onSelectionChange={(selections) => setBackgroundElements(selections)}
                            state={backgroundElements}
                        />    
                    </div>



                    {/* <div className="depth-control">
                        <label>Depth Layer:</label>
                        <select className="depth-preset">
                            <option value="20">Background</option>
                            <option value="50" selected>Midground</option>
                            <option value="80">Foreground</option>
                            <option value="custom">Custom...</option>
                        </select>

                        <div className="custom-depth">
                            <input type="range" min="0" max="100" value="50" className="depth-slider" />
                            <span className="depth-value">50%</span>
                        </div>
                    </div> */}


                </div>

            </SheetContent>
        </Sheet>
    )
}

export default BackgroundComponent



// Implicit Depth Assignment:
    // Background elements default to 0-20%
    // Characters default to 40-60% (midground)
    // Close-up props default to 80-100%

// Keyword Triggers:
    // Words like "distant", "closeup", "behind" adjust depth automatically
    // "The distant mountains" → auto-sets to background layer
