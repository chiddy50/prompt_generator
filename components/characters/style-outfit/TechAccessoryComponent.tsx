"use client"

import React from 'react'
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
import MultipleCategorySelector from '@/components/shared/MultipleCategorySelector';
import { techAccessoryOptions } from "@/data/character/outfit/accessories"
import { useCharacterContext } from '@/contexts/CharacterContext';

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TechAccessoryComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {

    const { 
        setTechAccessories, techAccessories 
    } = useCharacterContext(); 
    
    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-[98%] xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold'>Tech Accessories</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>


                <div className="px-7 pb-7 bg-white">
                    {/* <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="mb-5 border-none">
                            <AccordionTrigger className="border border-gray-200 p-[1rem]">
                                <h1 className="text-md font-bold">Tech Accessory</h1>
                            </AccordionTrigger>
                            <AccordionContent>

                            </AccordionContent>
                        </AccordionItem>
                    </Accordion> */}

                    <div className="my-5">
                        <h2 className="text-sm font-medium mb-1.5">Tech Accessories</h2>

                        <MultipleCategorySelector
                            data={techAccessoryOptions}
                            categoryLabels={{

                            }}
                            onSelectionChange={(selections) => setTechAccessories(selections)}
                            state={techAccessories}
                        />                                  
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default TechAccessoryComponent
