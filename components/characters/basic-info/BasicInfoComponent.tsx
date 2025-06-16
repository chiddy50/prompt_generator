"use client"

import SingleSelectCategorySelector from '@/components/shared/SingleSelectCategorySelector';
import { raceBySpecies } from '@/data/character/raceBySpecies';
import React, { useEffect, useState } from 'react'
import { useCharacterContext } from '@/contexts/CharacterContext';



const BasicInfoComponent = () => {
    const { 
        firstName, setFirstName, lastName, setLastName,
        alias, setAlias, age, setAge, race, setRace, gender, setGender,
        characterData
    } = useCharacterContext();

    useEffect(() => {
        // setAlias(characterData?.alias ?? "")
        // setFirstName(characterData?.firstName ?? "")
        // setLastName(characterData?.lastName ?? "")
        // setAge(characterData?.age ?? "")
        // setRace(characterData?.race ?? "")
        // setGender(characterData?.gender ?? "")
    }, [])
   

    return (
        <div className='mt-5 mb-5'>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name 
                    </label>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-0"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value) }
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name 
                    </label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-0"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value) }
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alias 
                    </label>
                    <input
                        type="text"
                        placeholder="Alias"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-0"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value) }
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age 
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-0"
                        value={age}
                        onChange={(e) => setAge(e.target.value) }
                    />
                </div>
                
            </div>

            <div className="my-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <div className="border rounded-lg border-gray-200 px-3 py-2 ">                    
                        <select defaultValue=""
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)} 
                            className="w-full outline-0 bg-white text-sm">
                            <option disabled value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>



            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Race/Specie</label>
                <SingleSelectCategorySelector
                    options={raceBySpecies}
                    categoryLabels={{}}
                    selectedOption={race}
                    onSelect={(category, option) => setRace({ category, value: option })}
                    onRemove={() => setRace(null)}
                    placeholder="Select one hand wear material..."
                    title="Race/Specie"
                />
            </div>

        </div>
    )
}

export default BasicInfoComponent
