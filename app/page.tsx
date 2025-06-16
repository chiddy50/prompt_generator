"use client"

import { useEffect, useState, useMemo } from 'react';
import { useCharacterContext } from "@/contexts/CharacterContext";
import Link from 'next/link';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Book } from 'lucide-react';

const menuItems = [

	{
		title: 'Character Builder',
		description: 'Physical appearance, personality traits',
		path: '/character-builder',
		icon: '👤',
		color: 'bg-blue-100 hover:bg-blue-200 text-blue-800'
	},
	{
		title: 'Scene Composer',
		description: 'Environment, lighting, camera work',
		path: '/scene-composer',
		icon: '🎬',
		color: 'bg-purple-100 hover:bg-purple-200 text-purple-800'
	},
	{
		title: 'Action Director',
		description: 'Poses, interactions, movements',
		path: '/action-director',
		icon: '💃',
		color: 'bg-green-100 hover:bg-green-200 text-green-800'
	},
	{
		title: 'Style Curator',
		description: 'Visual references, artistic styles',
		path: '/style-curator',
		icon: '🎨',
		color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
	},
	{
		title: 'Prompt Compiler',
		description: 'Final output generator',
		path: '/prompt-compiler',
		icon: '✨',
		color: 'bg-pink-100 hover:bg-pink-200 text-pink-800'
	},
		{
		title: 'Character Library',
		description: 'View existing character prompts',
		path: '/character-builder',
		icon: <Book />,
		color: 'bg-orange-100 hover:bg-orange-200 text-orange-800'
	},
];


export default function LandingMenu() {
	const [openModal, setOpenModal] = useState<boolean>(false);
    const [alias, setAlias] = useState<string>("");

	const router = useRouter();

	const createCharacterProject = () => {
		console.log(alias);
		const id = uuidv4();
		let characterData = {
			id,
			alias,
		}

		
		// const storedLibraryExists = localStorage.getItem("character-library");
		// if (storedLibraryExists) {
		// 	let storedLibrary = JSON.parse(storedLibraryExists);
		// 	let clonedLibrary = [...storedLibrary]
		// 	clonedLibrary.push(characterData)

		// 	localStorage.setItem("character-library", JSON.stringify(clonedLibrary));
		// } else{
		// 	let data = []
		// 	data.push(characterData);
		// 	localStorage.setItem("character-library", JSON.stringify(data));
		// }		


		const storedLibrary = JSON.parse(localStorage.getItem("character-library") || "[]");
		
		const updatedLibrary = [...storedLibrary, characterData];
		localStorage.setItem("character-library", JSON.stringify(updatedLibrary));	

		router.push(`/create-character?character-id=${id}`)
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto">
				<header className="mb-12 text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Fable Creative Suite</h1>
					<p className="text-xl text-gray-600">Craft your perfect character and scene</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-svh">
					<MenuItem item={menuItems[5]} handleClick={() => router.push("/character-library") } />
					<MenuItem item={menuItems[0]} handleClick={() => setOpenModal(true)} />
					<MenuItem item={menuItems[1]} handleClick={() => router.push("/scene-composer") }  />
					{/* <MenuItem item={menuItems[2]} handleClick={(val) => console.log(val)} /> */}
					{/* <MenuItem item={menuItems[3]} handleClick={(val) => console.log(val)} /> */}
					{/* <MenuItem item={menuItems[4]} handleClick={(val) => console.log(val)} /> */}
				</div>

				<footer className="mt-16 text-center text-gray-500 text-sm">
					<p>Start with any module or work through them sequentially</p>
				</footer>
			</div>

			<DialogCloseButton 
			openModal={openModal} 
			setOpenModal={setOpenModal} 
			alias={alias}
			setAlias={setAlias}
			onProceed={createCharacterProject}
			/> 
		</div>
	);
}

const MenuItem = ({ item, handleClick }) => {
	return (
		<div
			onClick={() => handleClick(item)}
			className={`group rounded-xl p-6 transition-all duration-300 ${item.color} shadow-md hover:shadow-lg transform hover:-translate-y-1`}
		>
			<div className="flex items-start">
				<span className="text-3xl mr-4">{item.icon}</span>
				<div>
					<h2 className="text-xl font-semibold mb-1">{item.title}</h2>
					<p className="text-sm opacity-80">{item.description}</p>
				</div>
			</div>
			<div className="mt-4 flex justify-end">
				<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-30">
					Explore →
				</span>
			</div>
		</div>
	)
}

function DialogCloseButton({ openModal, setOpenModal, alias, setAlias, onProceed }) {

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent className="sm:max-w-sm border-0 bg-white">
				<DialogHeader>
					<DialogTitle>Create character</DialogTitle>
					<DialogDescription>
						Provide an alias for your character
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-2 bg-white">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						{/* <Input
							id="link"
							defaultValue="https://ui.shadcn.com/docs/installation"
							readOnly
							className='outline-none'
						/> */}
						<input
							type="text"
							placeholder="First Name"
							className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-0"
							value={alias}
							onChange={(e) => setAlias(e.target.value) }
						/>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" className='bg-gray-900 text-white'>
							Close
						</Button>
					</DialogClose>
					<Button onClick={onProceed} disabled={alias ? false : true} className={`bg-purple-600 text-white ${alias ? "" : "opacity-30"}`}>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}