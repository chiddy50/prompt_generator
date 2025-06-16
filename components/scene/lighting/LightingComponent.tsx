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
import GenericSelect from '../../shared/GenericSelect';
import { lightingSystems } from '@/data/lighting/lightingDesign';
import { ArrowRight } from 'lucide-react';
import LightingSystemSelector from './LightingSystemSelector';
import LightMoodSelector from './LightMoodSelector';
import LightDesignSelector from './LightDesignSelector';
import LightMoodSelector2 from './LightMoodSelector2';
import MobileLightMoodSelector from './MobileLightMoodSelector';
import AdvancedLightMoodSelector from './AdvancedLightMoodSelector';

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LightingComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {
    const [lightingSystem, setLightingSystem] = useState<string | null>(null);

    // const [selections, setSelections] = useState<Partial<Record<MoodCategory, string>>>({});
    const [selections, setSelections] = useState<Partial<Record<any, string>>>({});


    const handleMoodChange = (selections: Record<any, string | null>) => {
        console.log('Current mood selections:', selections);
        // Update your scene state here
    };

    

    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[80%] lg:min-w-[65%] xl:min-w-[65%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '></SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white flex flex-col gap-5">
                    {/* <div>
                        <h2 className="text-md font-bold mb-1.5"></h2>
                        <LightingSystemSelector onSelect={(system) => setCurrentSystem(system)} />
                    </div> */}

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem]">
                                <div className="flex item-center gap-2">
                                    <h1 className="text-md font-bold">Lighting System</h1>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <LightingSystemSelector onSelect={(system) => setLightingSystem(system)} />

                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem]">
                                <div className="flex item-center gap-2">
                                    <h1 className="text-md font-bold">Lighting Mood</h1>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>

                                {/* <div className="bg-gray-950 my-5">
                                    <LightMoodSelector onSelectionChange={handleMoodChange} />
                                </div> */}
                                {/* <LightMoodSelector2 /> */}
                                {/* <MobileLightMoodSelector onSelectionChange={handleMoodChange} /> */}
                                <AdvancedLightMoodSelector 
                                selections={selections}
                                setSelections={setSelections}
                                />

                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem]">
                                <div className="flex item-center gap-2">
                                    <h1 className="text-md font-bold">Lighting Design</h1>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>

                                <div className="my-5">
                                    <LightDesignSelector                                         
                                        // lightDesignSelections={lightDesignSelections}
                                        // setLightDesignSelections={setLightDesignSelections}
                                        // lightDesignActiveCategory={lightDesignActiveCategory}
                                        // setLightDesignActiveCategory={setLightDesignActiveCategory}
                                    />
                 
                                    
                                </div>
                            </AccordionContent>
                        </AccordionItem>


                        
                    </Accordion>


                </div>

            </SheetContent>
        </Sheet>
    )
}






export default LightingComponent


// const qualitySettings = {
//     resolution: [
//       "4K", "8K", "16K",
//       "high definition", "ultra high definition",
//       "standard definition"
//     ],
//     focus: [
//       "sharp focus", "soft focus", "dreamy focus",
//       "selective focus", "partial focus"
//     ],
//     colorGrading: [
//       "naturalistic", "cinematic", "stylized",
//       "vibrant", "muted", "monochromatic"
//     ]
//   }