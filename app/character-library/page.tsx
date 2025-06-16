"use client"

import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CharacterLibraryPage = () => {
    const [characters, setCharacters] = useState<[]>([]);

    useEffect(() => {
        const storedLibraryExists = localStorage.getItem("character-library");
        if (storedLibraryExists) {
            let storedLibrary = JSON.parse(storedLibraryExists);
            
            setCharacters(storedLibrary);
        }
    }, []);
    return (
        <div className='mx-5 sm:mx-10 lg:mx-40'>
            <div className="text-center my-10">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Character Library</h1>
				{/* <p className="text-gray-600 text-sm">Create and customize your character with detailed attributes and features.</p> */}
			</div>
               <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {
                        characters?.map((item, index) => (
                            <Link  
                           href={`/create-character?character-id=${item?.id}`}
                            key={index} 
                            className="flex flex-col overflow-hidden rounded-2xl w-full cursor-pointer transition-all hover:shadow-lg bg-[#F9F9F9] border border-gray-50 hover:border-gray-100">
                                <div className="aspect-square w-full relative rounded-2xl">
                                    <Image
                                        src="/img/character-placeholder.png"
                                        alt="placeholder"
                                        fill
                                        className='object-cover rounded-2xl'
                                    />

                                </div>
                                <div className='px-3 py-4 bg-[#F9F9F9] rounded-b-2xl text-center flex flex-col justify-between'>
                                    <h2 className="font-extrabold min-h-[30px] capitalize text-sm">{(item?.firstName || item?.lastName) ? `${item?.firstName} ${item?.lastName}` : (item?.alias ?? "")}</h2>
                                    {/* <p className="capitalize text-[11px]">{item?.alias}</p> */}
                                </div>
                            </Link>
                        ))
                    }
                </div>
        </div>
    )
}

export default CharacterLibraryPage
