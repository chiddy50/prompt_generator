import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import GenericSelect from '@/components/shared/GenericSelect';
import EyeColorSelector from '../physical-appearance/eye/EyeColorSelector';
import { eyeAccessories, eyebrowPositions, eyebrowStyles, eyebrowTextures, eyeShapes, notableEyebrowFeatures, notableEyeFeatures } from '@/data/character/eye';
import { Separator } from '@/components/ui/separator';
import { useCharacterContext } from '@/contexts/CharacterContext';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EyeComponent: React.FC<Props> = ({ setOpenModal, openModal }) => {

    const { 
        characterData,

        // EYE STATE
        eyeColor, setEyeColor,
        eyeShape, setEyeShape,
        notableEyeFeature, setNotableEyeFeature,
        eyeAccessory, setEyeAccessory,

        // EYEBROWS STATE
        eyeBrowStyle, setEyeBrowStyle,
        eyeBrowPosition, setEyeBrowPosition,
        eyeBrowTexture, setEyeBrowTexture,
        eyeBrowFeature, setEyeBrowFeature,      
    } = useCharacterContext();  
    
    useEffect(() => {
        // setEyeColor(characterData?.eyeColor ?? "")
        // setEyeShape(characterData?.eyeShape ?? "")
        // setNotableEyeFeature(characterData?.notableEyeFeature ?? "")
        // setEyeAccessory(characterData?.eyeAccessory ?? "")

        // setEyeBrowStyle(characterData?.eyeBrowStyle ?? "")
        // setEyeBrowPosition(characterData?.eyeBrowPosition ?? "")
        // setEyeBrowTexture(characterData?.eyeBrowTexture ?? "")
        // setEyeBrowFeature(characterData?.eyeBrowFeature ?? "")

    }, [])

    
    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>
        
            <SheetContent className="overflow-y-scroll bg-white border-0  xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

                <SheetHeader className='px-7 pt-7 pb-0'>
                    <SheetTitle className='text-2xl font-extrabold '>Eye Features</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>

                <div className="px-7 pb-7 bg-white">

                    <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Eye Color</h2>                            
                            <EyeColorSelector
                                selectedColor={eyeColor} 
                                onSelect={setEyeColor} 
                            />
                        </div>


                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Eye Shape</h2>
                            <GenericSelect
                                options={eyeShapes}
                                selected={eyeShape}
                                onSelect={setEyeShape}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="mb-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Notable Eye Features</h2>                            
                            <GenericSelect
                                options={notableEyeFeatures}
                                selected={notableEyeFeature}
                                onSelect={setNotableEyeFeature}
                                className="w-full"
                            />
                        </div>

                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Eye Accessory</h2>
                            <GenericSelect
                                options={eyeAccessories}
                                selected={eyeAccessory}
                                onSelect={setEyeAccessory}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <Separator className='border border-gray-200' />

                    <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className=""> 
                            <h2 className="text-sm font-medium mb-1.5">Eyebrow Style</h2>                            
                            <GenericSelect
                                options={eyebrowStyles}
                                selected={eyeBrowStyle}
                                onSelect={setEyeBrowStyle}
                                className="w-full"
                            />
                        </div>

                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Eyebrow Positions</h2>
                            <GenericSelect
                                options={eyebrowPositions}
                                selected={eyeBrowPosition}
                                onSelect={setEyeBrowPosition}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Eyebrow Texture</h2>                            
                            <GenericSelect
                                options={eyebrowTextures}
                                selected={eyeBrowTexture}
                                onSelect={setEyeBrowTexture}
                                className="w-full"
                            />
                        </div>

                        <div className="">
                            <h2 className="text-sm font-medium mb-1.5">Notable Eyebrow Features</h2>
                            <GenericSelect
                                options={notableEyebrowFeatures}
                                selected={eyeBrowFeature}
                                onSelect={setEyeBrowFeature}
                                className="w-full"
                            />
                        </div>
                    </div>

                </div>

            </SheetContent>
        </Sheet>
    )
}

export default EyeComponent
