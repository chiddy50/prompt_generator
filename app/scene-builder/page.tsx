"use client"

import GenericSelect from '@/components/shared/GenericSelect';
import SelectOneOptionForEachCategoryComponent from '@/components/shared/SelectOneOptionForEachCategoryComponent';
import { environmentalConditions, environmentParameters, indoorOptions, outdoorOptions, temporalSettings } from '@/data/scene/setting';
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SingleSelectCategorySelector from '@/components/shared/SingleSelectCategorySelector';
import { IndoorType, OutdoorType } from '@/types/scene/SceneType';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import BackgroundComponent from '@/components/background/BackgroundComponent';
import LightingComponent from '@/components/scene/lighting/LightingComponent';
import LightMoodSelector2 from '@/components/scene/lighting/LightMoodSelector2';
import CameraMovementComponent from '@/components/scene/camera/CameraMovementComponent';

const temporalSettingLabels = {
    timeOfDay: "Time Of Day",
    season: "Seasons",
    timePeriodOptions: "Time Period",
};

const SceneBuilderPage = () => {


    const [temporalSetting, setTemporalSetting] = useState<Partial<Record<keyof typeof temporalSettings, string>>>({});
    const [environmentalCondition, setEnvironmentalCondition] = useState<Partial<Record<keyof typeof environmentalConditions, string>>>({});
    const [atmosphere, setAtmosphere] = useState<{ category: any, value: string } | null>(null);
    const [specificEnvironmentType, setSpecificEnvironmentType] = useState<string>("indoor");
    const [indoorEnvironment, setIndoorEnvironment] = useState<{ category: IndoorType, value: string } | null>(null);
    const [outdoorEnvironment, setOutdoorEnvironment] = useState<{ category: OutdoorType, value: string } | null>(null);

    const [openBackgroundModal, setOpenBackgroundModal] = useState<boolean>(false);
    const [openLightingModal, setOpenLightingModal] = useState<boolean>(false);
    const [openCameraMovementModal, setOpenCameraMovementModal] = useState<boolean>(false);

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-10 tracking-wide text-center mt-10">Scene Composer</h1>
            <div className="mx-auto w-[90%] sm:w-[90%] lg:w-[70%] xl:w-[50%]">

                <div>
                    <div className="mb-7 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-10">
                        <div className="flex flex-col gap-4">
                            <RadioGroup className='grid-cols-5' defaultValue="indoor" value={specificEnvironmentType} onValueChange={setSpecificEnvironmentType}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="indoor" id="indoor" />
                                    <Label htmlFor="indoor">Indoor</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="outdoor" id="outdoor" />
                                    <Label htmlFor="outdoor">Outdoor</Label>
                                </div>
                            </RadioGroup>

                            {
                                specificEnvironmentType === "indoor" &&
                                <div className="min-w-[400px]">
                                    <h2 className="text-sm font-medium mb-1.5">Indoor Environment</h2>

                                    <SingleSelectCategorySelector
                                        options={indoorOptions}
                                        categoryLabels={{}}
                                        selectedOption={indoorEnvironment}
                                        onSelect={(category, option) => setIndoorEnvironment({ category, value: option })}
                                        onRemove={() => setIndoorEnvironment(null)}
                                        placeholder="Select one option..."
                                        title="Indoor"
                                    />
                                </div>
                            }

                            {
                                specificEnvironmentType === "outdoor" &&
                                <div className="min-w-[400px]">
                                    <h2 className="text-sm font-medium mb-1.5">Outdoor Environment</h2>

                                    <SingleSelectCategorySelector
                                        options={outdoorOptions}
                                        categoryLabels={{}}
                                        selectedOption={outdoorEnvironment}
                                        onSelect={(category, option) => setOutdoorEnvironment({ category, value: option })}
                                        onRemove={() => setOutdoorEnvironment(null)}
                                        placeholder="Select one option..."
                                        title="Outdoor"
                                    />
                                </div>
                            }
                        </div>


                        {/* TEMPORAL SETTING */}
                        {specificEnvironmentType === "outdoor" &&
                            <div>
                                <h2 className="text-sm font-medium mb-1.5">Temporal Setting</h2>

                                <SelectOneOptionForEachCategoryComponent
                                    data={temporalSettings}
                                    categoryLabels={temporalSettingLabels}
                                    placeholder="Select setting..."
                                    selectedOptions={temporalSetting}
                                    onSelectionChange={setTemporalSetting}
                                    className=""
                                />
                            </div>}

                        {/* ENVIRONMENTAL CONDITION */}
                        {specificEnvironmentType === "outdoor" &&
                            <div className="">
                                <h2 className="text-sm font-medium mb-1.5">Environmental Condition</h2>
                                <SelectOneOptionForEachCategoryComponent
                                    data={environmentalConditions}
                                    categoryLabels={{
                                        weatherOptions: "Weather Options",
                                        atmosphericEffects: "Atmospheric Effects",
                                    }}
                                    placeholder="Select setting..."
                                    selectedOptions={environmentalCondition}
                                    onSelectionChange={setEnvironmentalCondition}
                                    className=""
                                />
                            </div>}

                        {/* ATMOSPHERE */}
                        {
                            <div className="">
                                <h2 className="text-sm font-medium mb-1.5">Atmosphere</h2>


                                <SingleSelectCategorySelector
                                    options={environmentParameters.atmospheres}
                                    categoryLabels={{}}
                                    selectedOption={atmosphere}
                                    onSelect={(category, option) => setAtmosphere({ category, value: option })}
                                    onRemove={() => setAtmosphere(null)}
                                    placeholder="Select one option..."
                                    title="Indoor"
                                />
                            </div>
                        }

                        <div className="grid grid-cols-3 gap-4">

                            <div
                                onClick={() => setOpenBackgroundModal(true)}
                                className="cursor-pointer bg-gray-800 text-white p-[1rem] flex item-center justify-center gap-2">
                                <h1 className="text-sm font-bold">Background</h1>
                            </div>
                            <div
                                onClick={() => setOpenLightingModal(true)}
                                className="cursor-pointer bg-gray-800 text-white p-[1rem] flex item-center justify-center gap-2">
                                <h1 className="text-sm font-bold">Lighting</h1>                                
                            </div>
                              <div
                                onClick={() => setOpenCameraMovementModal(true)}
                                className="cursor-pointer bg-gray-800 text-white p-[1rem] flex item-center justify-center gap-2">
                                <h1 className="text-sm font-bold">Camera Movement</h1>                                
                            </div>
                        </div>
                        

                        {/* <Accordion type="single" collapsible>
                            <AccordionItem value="item-1" className="mb-5 border-none">
                                <AccordionTrigger className="border border-gray-200 p-[1rem]">
                                    <div className="flex item-center gap-2">
                                        <h1 className="text-md font-bold">Background</h1>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 mt-2 gap-4">
                                        <button
                                            onClick={() => openBackgroundModal(true)}
                                        className={`px-3 py-3 flex items-center justify-center text-xs border bg-gray-900 text-white font-medium rounded-md transition-all
                                            `}>
                                            Wall Treatment
                                        </button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion> */}


                        {/* <div className="positioning-panel">
                            <select className="element-selector">
                                <option>Select element...</option>
                                <option>Main Character</option>
                                <option>Villain</option>
                                <option>Sword Prop</option>
                            </select>

                            <div className="position-controls">
                                <select className="position-preset">
                                    <option>Custom Position</option>
                                    <option>Center Stage</option>
                                    <option>Foreground Left</option>
                                    <option>Background Right</option>
                                </select>

                                <div className="coordinate-inputs">
                                    <label>X: <input type="number" className="x-axis" /></label>
                                    <label>Y: <input type="number" className="y-axis" /></label>
                                    <label>Rotation: <input type="number" className="rotation" min="0" max="360" /></label>
                                </div>

                                <select className="layer-order">
                                    <option>Layer: Default</option>
                                    <option>Bring to Front</option>
                                    <option>Send to Back</option>
                                </select>
                            </div>
                        </div> */}

                    </div>
                </div>

                <div className="my-10 grid grid-cols-2 gap-4">

                </div>

                <div className=''>

                </div>

            </div>


            <BackgroundComponent
                setOpenModal={setOpenBackgroundModal}
                openModal={openBackgroundModal}
            />

            <LightingComponent 
                setOpenModal={setOpenLightingModal}
                openModal={openLightingModal}
            />

            <CameraMovementComponent 
                setOpenModal={setOpenCameraMovementModal}
                openModal={openCameraMovementModal}
            />
        </div>
    )
}

export default SceneBuilderPage;
