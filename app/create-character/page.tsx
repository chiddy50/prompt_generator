"use client"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Cog, Eye, Palette, Save, User, Users2 } from 'lucide-react'

import { useEffect, useState, Suspense } from 'react';
import BasicInfoComponent from "@/components/characters/basic-info/BasicInfoComponent";
import FacialFeatureComponent from "@/components/characters/facial-features/FacialFeatureComponent";
import PhysicalAppearanceComponent from "@/components/characters/physical-appearance/PhysicalAppearanceComponent";
import StyleOutfitComponent from "@/components/characters/style-outfit/StyleOutfitComponent";
import { useCharacterContext } from "@/contexts/CharacterContext";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from "next/navigation";
import DisplayCharacterPrompt from "@/components/prompt/DisplayCharacterPrompt";
import Link from "next/link";
import { buildGenerateCharacterPrompt } from "@/lib/prompts";
import { useMainContext } from "@/contexts/MainContext";
import GenericSelect from "@/components/shared/GenericSelect";
import { toast } from "sonner";
import FlutterwaveInlinePayment from "@/components/payment/FlutterwaveInlinePayment";


const aIModels = [
	"Midjourney",
	"Google's W.I.S.K",
	"DALL-E 3",
	"Stable Diffusion",
	"Leonardo AI",
	// "Runway ML",
]


function Boundary() {
	const searchParams = useSearchParams();
	const characterId = searchParams.get('character-id');

	const context = useCharacterContext();
	const [characterData, setCharacterData] = useState(null);
	const [prompt, setPrompt] = useState<string>("");
	const [generating, setGenerating] = useState<boolean>(false);

	const {
		aIModel, setAIModel
	} = useMainContext();

	// Reset character data on mount and when characterId changes
	useEffect(() => {
		setCharacterData(null);

		const storedLibraryExists = localStorage.getItem("character-library");
		if (storedLibraryExists) {
			const storedLibrary = JSON.parse(storedLibraryExists);
			const character = storedLibrary.find(item => item.id === characterId);
			if (character) {
				setCharacterData(character);
			}
		}
	}, []); // Add characterId as dependency

	// const characterData = useMemo(() => {
	// 	if (!characterId) return null;

	// 	const storedLibrary = JSON.parse(localStorage.getItem("character-library") || "[]");
	// 	return storedLibrary.find((item: any) => item.id === characterId) || null;
	// }, [characterId]);

	// useEffect(() => {
	// 	context.setCharacterData(characterData);
	// }, [characterData, context.setCharacterData]);

	const saveCharacter = () => {
		let characterData = {
			id: characterId ?? uuidv4(),
			...(context.firstName && { firstName: context.firstName }),
			...(context.lastName && { lastName: context.lastName }),
			...(context.alias && { alias: context.alias }),
			...(context.gender && { gender: context.gender }),
			...(context.age && { age: context.age }),
			...(context.race && { race: context.race }),
			...(context.selectedFacialFeature && { selectedFacialFeature: context.selectedFacialFeature }),
			...(context.selectedFacialHair && { selectedFacialHair: context.selectedFacialHair }),
			...(context.selectedMarks && { selectedMarks: context.selectedMarks }),
			...(context.eyeColor && { eyeColor: context.eyeColor }),
			...(context.eyeShape && { eyeShape: context.eyeShape }),
			...(context.eyeBrowPosition && { eyeBrowPosition: context.eyeBrowPosition }),
			...(context.eyeBrowTexture && { eyeBrowTexture: context.eyeBrowTexture }),
			...(context.eyeBrowFeature && { eyeBrowFeature: context.eyeBrowFeature }),
			...(context.selectedNoseFeatures && { selectedNoseFeatures: context.selectedNoseFeatures }),
			...(context.selectedEarFeatures && { selectedEarFeatures: context.selectedEarFeatures }),
			...(context.selectedLipFeatures && { selectedLipFeatures: context.selectedLipFeatures }),
			...(context.teethVariation && { teethVariation: context.teethVariation }),
			...(context.dentalAccessory && { dentalAccessory: context.dentalAccessory }),
			...(context.hairTexture && { hairTexture: context.hairTexture }),
			...(context.selectedAccessories && { selectedAccessories: context.selectedAccessories }),
			...(context.hairLength && { hairLength: context.hairLength }),
			...(context.hairColor && { hairColor: context.hairColor }),
			...(context.skinTone && { skinTone: context.skinTone }),
			...(context.hairQuirks && { hairQuirks: context.hairQuirks }),
			...(context.height && { height: context.height }),
			...(context.build && { build: context.build }),
			...(context.proportion && { proportion: context.proportion }),
			...(context.physicalMovement && { physicalMovement: context.physicalMovement }),
			...(context.fullBodyWear && { fullBodyWear: context.fullBodyWear }),
			...(context.fullBodyWearMaterial && { fullBodyWearMaterial: context.fullBodyWearMaterial }),
			...(context.fullBodyWearColor && { fullBodyWearColor: context.fullBodyWearColor }),
			...(context.fullBodyWearPattern && { fullBodyWearPattern: context.fullBodyWearPattern }),
			...(context.fullBodyWearCondition && { fullBodyWearCondition: context.fullBodyWearCondition }),
			...(context.upperBodyWear && { upperBodyWear: context.upperBodyWear }),
			...(context.upperBodyWearMaterial && { upperBodyWearMaterial: context.upperBodyWearMaterial }),
			...(context.upperBodyWearColor && { upperBodyWearColor: context.upperBodyWearColor }),
			...(context.upperBodyWearPattern && { upperBodyWearPattern: context.upperBodyWearPattern }),
			...(context.upperBodyWearCondition && { upperBodyWearCondition: context.upperBodyWearCondition }),
			...(context.lowerBodyWear && { lowerBodyWear: context.lowerBodyWear }),
			...(context.lowerBodyWearMaterial && { lowerBodyWearMaterial: context.lowerBodyWearMaterial }),
			...(context.lowerBodyWearColor && { lowerBodyWearColor: context.lowerBodyWearColor }),
			...(context.lowerBodyWearPattern && { lowerBodyWearPattern: context.lowerBodyWearPattern }),
			...(context.lowerBodyWearCondition && { lowerBodyWearCondition: context.lowerBodyWearCondition }),
			...(context.outerBodyWear && { outerBodyWear: context.outerBodyWear }),
			...(context.outerBodyWearMaterial && { outerBodyWearMaterial: context.outerBodyWearMaterial }),
			...(context.outerBodyWearColor && { outerBodyWearColor: context.outerBodyWearColor }),
			...(context.outerBodyWearPattern && { outerBodyWearPattern: context.outerBodyWearPattern }),
			...(context.outerBodyWearCondition && { outerBodyWearCondition: context.outerBodyWearCondition }),
			...(context.extraBodyWear && { extraBodyWear: context.extraBodyWear }),
			...(context.extraBodyWearMaterial && { extraBodyWearMaterial: context.extraBodyWearMaterial }),
			...(context.extraBodyWearColor && { extraBodyWearColor: context.extraBodyWearColor }),
			...(context.extraBodyWearPattern && { extraBodyWearPattern: context.extraBodyWearPattern }),
			...(context.extraBodyWearCondition && { extraBodyWearCondition: context.extraBodyWearCondition }),
			...(context.footwear && { footwear: context.footwear }),
			...(context.footWearColor && { footWearColor: context.footWearColor }),
			...(context.footWearMaterial && { footWearMaterial: context.footWearMaterial }),
			...(context.footWearPattern && { footWearPattern: context.footWearPattern }),
			...(context.footWearCondition && { footWearCondition: context.footWearCondition }),
			...(context.headWear && { headWear: context.headWear }),
			...(context.headWearColor && { headWearColor: context.headWearColor }),
			...(context.headWearMaterial && { headWearMaterial: context.headWearMaterial }),
			...(context.headWearPattern && { headWearPattern: context.headWearPattern }),
			...(context.headWearCondition && { headWearCondition: context.headWearCondition }),

			...(context.eyeWear && { eyeWear: context.eyeWear }),
			...(context.eyeWearCondition && { eyeWearCondition: context.eyeWearCondition }),
			...(context.eyeWearColor && { eyeWearColor: context.eyeWearColor }),

			...(context.neckWear && { neckWear: context.neckWear }),
			...(context.neckWearColor && { neckWearColor: context.neckWearColor }),
			...(context.neckWearMaterial && { neckWearMaterial: context.neckWearMaterial }),
			...(context.neckWearPattern && { neckWearPattern: context.neckWearPattern }),
			...(context.neckWearCondition && { neckWearCondition: context.neckWearCondition }),

			...(context.leftHandWear && { leftHandWear: context.leftHandWear }),
			...(context.leftHandWearMaterial && { leftHandWearMaterial: context.leftHandWearMaterial }),
			...(context.leftHandWearColor && { leftHandWearColor: context.leftHandWearColor }),
			...(context.rightHandWear && { rightHandWear: context.rightHandWear }),
			...(context.rightHandWearMaterial && { rightHandWearMaterial: context.rightHandWearMaterial }),
			...(context.rightHandWearColor && { rightHandWearColor: context.rightHandWearColor }),
			...(context.leftFingerWear && { leftFingerWear: context.leftFingerWear }),
			...(context.leftFingerWearMaterial && { leftFingerWearMaterial: context.leftFingerWearMaterial }),
			...(context.leftFingerWearColor && { leftFingerWearColor: context.leftFingerWearColor }),
			...(context.rightFingerWear && { rightFingerWear: context.rightFingerWear }),
			...(context.rightFingerWearMaterial && { rightFingerWearMaterial: context.rightFingerWearMaterial }),
			...(context.rightFingerWearColor && { rightFingerWearColor: context.rightFingerWearColor }),
			...(context.leftWristWear && { leftWristWear: context.leftWristWear }),
			...(context.leftWristWearMaterial && { leftWristWearMaterial: context.leftWristWearMaterial }),
			...(context.leftWristWearColor && { leftWristWearColor: context.leftWristWearColor }),
			...(context.rightWristWear && { rightWristWear: context.rightWristWear }),
			...(context.rightWristWearMaterial && { rightWristWearMaterial: context.rightWristWearMaterial }),
			...(context.rightWristWearColor && { rightWristWearColor: context.rightWristWearColor }),
			...(context.techAccessories && { techAccessories: context.techAccessories }),
		}
		console.log(characterData);

		// Optimized localStorage handling
		const storedLibrary = JSON.parse(localStorage.getItem("character-library") || "[]");

		let updatedCharacterLibrary = storedLibrary.map(item => {
			if (item.id === characterId) {
				return characterData;
			}
			return item;
		});

		// const updatedLibrary = [...storedLibrary, characterData];
		localStorage.setItem("character-library", JSON.stringify(updatedCharacterLibrary));
	}

	const generatePrompt = async () => {
		try {
			const prompt = buildGenerateCharacterPrompt(context, aIModel);
			console.log(prompt);

			// return
			setGenerating(true);

			const response = await fetch('/api/stream-llm-response', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					prompt: prompt,
					payload: {

					},
				}),
			});

			if (!response?.body) {
				setGenerating(false);
				toast.error("Try again please");
				return;
			}

			let text = ``;

			const reader = response.body.getReader();
			const decoder = new TextDecoder("utf-8");
			let done = false;

			setPrompt("");

			while (!done) {
				const { value, done: doneReading } = await reader.read();
				done = doneReading;
				const chunk = decoder.decode(value);
				text += chunk;
				setPrompt(text);
			}

		} catch (error) {
			console.error(error);
		} finally {
			setGenerating(false);
		}
	}


	return (
		<div className="w-full">
			<div className="mb-6 text-center mt-5">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Character Development</h1>
				<p className="text-gray-600 text-sm mx-10">Create and customize your character with detailed attributes and features.</p>
			</div>

			<div className="flex justify-center">
				<FlutterwaveInlinePayment />
			</div>

			{/* <div className="p-4 max-w-xl mx-auto mb-20"> */}
			<div className="my-7 mx-auto w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%]  gap-14 mb-5">

				<div className="col-span-1 mb-10">
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1" className="mb-5 border-none">
							<AccordionTrigger className="border border-gray-200 p-[1rem]">
								<div className="flex item-center gap-2">
									<User className="w-5 h-5" />
									<h1 className="text-md font-bold">Basic Information</h1>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<BasicInfoComponent />
							</AccordionContent>
						</AccordionItem>

						{/* FACIAL FEATURES */}
						<AccordionItem value="item-2" className="mb-5 border-none">
							<AccordionTrigger className="border border-gray-200 p-[1rem]">
								<div className="flex item-center gap-2">
									<Eye className="w-5 h-5" />
									<h1 className="text-md font-bold">Facial Features</h1>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<FacialFeatureComponent />
							</AccordionContent>
						</AccordionItem>

						{/* PHYSICAL APPEARANCE */}
						<AccordionItem value="item-3" className="mb-5 border-none">
							<AccordionTrigger className="border border-gray-200 p-[1rem]">
								<div className="flex item-center gap-2">
									<Users2 className="w-5 h-5" />
									<h1 className="text-md font-bold">Physical Appearance</h1>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<PhysicalAppearanceComponent />
							</AccordionContent>
						</AccordionItem>

						{/* STYLE & OUTFIT  */}
						<AccordionItem value="item-4" className="mb-5 border-none">
							<AccordionTrigger className="border border-gray-200 p-[1rem]">
								<div className="flex item-center gap-2">
									<Palette className="w-5 h-5" />
									<h1 className="text-md font-bold">Style & Outfit</h1>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<StyleOutfitComponent />
							</AccordionContent>
						</AccordionItem>

					</Accordion>

					<div className="mt-10">

						<p className="font-medium mb-1">Choose AI Model</p>
						<GenericSelect
							options={aIModels}
							selected={aIModel}
							onSelect={setAIModel}
							className="w-full"
						/>
						<Button onClick={generatePrompt}
							disabled={generating}
							size="lg"
							className={`bg-purple-900 mt-5 text-white w-full transition-all hover:bg-purple-800
							${generating ? "opacity-30" : ""}
						`}>
							{!generating && <Cog />}
							{generating && <i className='bx bx-loader-alt bx-spin  text-xl' ></i>}

							{generating ? "Generating..." : "Generate Prompt"}
						</Button>
					</div>
					<div className="my-5 grid grid-cols-2 gap-5">
						<Button onClick={saveCharacter} disabled={generating} size="lg" className="bg-gray-200 w-full text-black">
							Save
							<Save />
						</Button>
						<Link href="/scene-builder" className="block w-full">
							<Button className="bg-gray-800 text-white w-full" size="lg">Move to Scene</Button>
						</Link>
					</div>
				</div>

				<div className="col-span-1 mb-20">

					{prompt && <DisplayCharacterPrompt characterData={characterData} prompt={prompt} />}

				</div>

			</div>

		</div>
	);
}

const CreateCharacterPage = () => {
	return (
		<Suspense fallback={<div className="px-5 py-10">Loading prompt generator...</div>}>
			<Boundary />
		</Suspense>
	)
}

export default CreateCharacterPage;