"use client"

import React, { useEffect } from 'react'
import { useState } from 'react';
import HairQuirksSelector from './HairQuirksSelector';
import HairColorSelector from './HairColorSelector';
import HairAccessorySelector from './HairAccessorySelector';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import GenericSelect from '@/components/shared/GenericSelect';
import SkinToneSelector from '../skin/SkinToneSelector';
import { Separator } from "@/components/ui/separator"
import { useCharacterContext } from '@/contexts/CharacterContext';

const hairTextures = [
  "No hair",
  "Straight",
  "Wavy",
  "Curly",
  "Kinky",
  "Coily",
  "Afro-textured",
  "Straight with a hint of wave",
  "Wavy with a hint of curl",
  "Braided",
  "Mohawk"
];

const hairLengths = [
  "Short (chin-length or shorter)",
  "Medium (chin-length to shoulder-length)",
  "Long (shoulder-length to mid-back length)",
  "Very Long (mid-back length to hip length or longer)",
  "Pixie-cut",
  "Bob",
  "Shaggy",
  "Ponytail-length",
  "No Hair"
];


interface Props {
	openHairFeatureModal: boolean;
	setOpenHairFeatureModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HairFeatureComponent: React.FC<Props> = ({ openHairFeatureModal, setOpenHairFeatureModal }) => {
	const { 
		hairTexture, setHairTexture,
		selectedAccessories, setSelectedAccessories,
		hairLength, setHairLength, hairColor, setHairColor,
		hairQuirks, setHairQuirks, skinTone, setSkinTone,
		characterData,
	} = useCharacterContext(); 

	useEffect(() => {
		// setHairTexture(characterData?.hairTexture ?? "")
		// setSelectedAccessories(characterData?.selectedAccessories ?? "")
		// setHairLength(characterData?.hairLength ?? "")
		// setHairColor(characterData?.hairColor ?? "")
		// setHairQuirks(characterData?.hairQuirks ?? "")
		// setSkinTone(characterData?.skinTone ?? "")
	}, []);
	

	const handleSelectHairAccessory = (category: any, option: string) => {
		setSelectedAccessories(prev => {
			const currentOptions = prev[category] || [];
			const isSelected = currentOptions.includes(option);

			return {
				...prev,
				[category]: isSelected
					? currentOptions.filter(item => item !== option)
					: [...currentOptions, option]
			};
		});
	};

	return (

		<Sheet open={openHairFeatureModal} onOpenChange={setOpenHairFeatureModal}>

            <SheetContent className="overflow-y-scroll bg-white border-0 min-w-98 xs:min-w-[98%] sm:min-w-[96%] md:min-w-[65%] lg:min-w-[65%] xl:min-w-[40%]">

				<SheetHeader className='px-7 pt-7 pb-0'>
					<SheetTitle className='text-2xl font-extrabold '></SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>

                <div className="px-7 pb-7 bg-white">

					<div className="mb-5">
                    	<h1 className='text-2xl font-extrabold mb-4'>Skin</h1>
                        <h2 className="text-sm font-medium mb-1.5">Skin Tone</h2>
                        <SkinToneSelector 
                            selectedTone={skinTone}
                            onSelect={setSkinTone}
                            showColorPreview={true}
                            className=""
                        />
                    </div>

                    <h1 className='text-2xl font-extrabold mt-7 mb-3'>Hair Features</h1>

					<div className="my-5">
						<h2 className="text-sm font-medium mb-1.5">Hair Length</h2>
						<GenericSelect
							options={hairLengths}
							selected={hairLength}
							onSelect={setHairLength}
							className="w-full"
						/>
					</div>

					<div className="my-5 grid grid-cols-2 gap-4">
						<div className="">

							<h2 className="text-sm font-medium mb-1.5">Hair Texture</h2>
							
							<GenericSelect
								options={hairTextures}
								selected={hairTexture}
								onSelect={setHairTexture}
								className="w-full"
							/>
						</div>


						<div className="">
							<h2 className="text-sm font-medium mb-1.5">Hair Color</h2>
							<HairColorSelector
								selectedColor={hairColor}
								onSelect={setHairColor}
								showColorPreview={true}
								className=""
							/>
						</div>
					</div>

					<div className="my-5">
						<h2 className="text-sm font-medium mb-1.5">Hair Accessories</h2>
						<HairAccessorySelector
							selectedOptions={selectedAccessories}
							onSelect={handleSelectHairAccessory}
							maxSelections={5}
							className=""
						/>
					</div>



					<div className="my-5">
						<h2 className="text-sm font-medium mb-1.5">Hair Quirks</h2>
						<HairQuirksSelector
							selectedQuirks={hairQuirks}
							onSelect={setHairQuirks}
							maxSelections={3}
							className=""
						/>
					</div>

					
				</div>

			</SheetContent>
		</Sheet>
	)
}

export default HairFeatureComponent
