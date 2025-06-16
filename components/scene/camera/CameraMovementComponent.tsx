"use client"

import React, { useState } from 'react'
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
import MultiSelect from '@/components/shared/MultiSelect';
import { cameraAngles } from "@/data/camera/camera"

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CameraMovementComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {
    const [cameraHeightLevel, setCameraHeightLevel] = useState<string[]>([])
    const [distanceFromSubject, setDistanceFromSubject] = useState<string[]>([])
    const [specialAngles, setSpecialAngles] = useState<string[]>([])
    const [shotTypes, setShotTypes] = useState<string[]>([])
    const [movementTypes, setMovementTypes] = useState<string[]>([])
    const [focusTechniques, setFocusTechniques] = useState<string[]>([])
    
    
    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 xs:min-w-[90%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Camera Movement</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white flex flex-col gap-5">
                    {/* <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem]">
                                <h1 className="text-md font-bold">Basic Information</h1>
                            </AccordionTrigger>
                            <AccordionContent>

                            </AccordionContent>
                        </AccordionItem>
                    </Accordion> */}
                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Height Level</h2>
                        <MultiSelect 
                            options={cameraAngles.heightLevels}
                            selectedItems={cameraHeightLevel}
                            onSelectionChange={setCameraHeightLevel}
                            maxSelections={3}
                            searchable={true}
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Distance From Subject</h2>
                        <MultiSelect 
                            options={cameraAngles.distanceFromSubject}
                            selectedItems={distanceFromSubject}
                            onSelectionChange={setDistanceFromSubject}
                            maxSelections={3}
                            searchable={true}
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Special Angles</h2>
                        <MultiSelect 
                            options={cameraAngles.specialAngles}
                            selectedItems={specialAngles}
                            onSelectionChange={setSpecialAngles}
                            maxSelections={3}
                            searchable={true}
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Shot Types</h2>
                        <MultiSelect 
                            options={cameraAngles.shotTypes}
                            selectedItems={shotTypes}
                            onSelectionChange={setShotTypes}
                            maxSelections={3}
                            searchable={true}
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Camera Movement Types</h2>
                        <MultiSelect 
                            options={cameraAngles.movementTypes}
                            selectedItems={movementTypes}
                            onSelectionChange={setMovementTypes}
                            maxSelections={3}
                            searchable={true}
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-medium mb-1.5">Focus Technique</h2>
                        <MultiSelect 
                            options={cameraAngles.focusTechniques}
                            selectedItems={focusTechniques}
                            onSelectionChange={setFocusTechniques}
                            maxSelections={3}
                            searchable={true}
                        />
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default CameraMovementComponent
