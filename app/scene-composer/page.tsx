"use client"

import { useState, useRef, useEffect } from 'react';
import { Camera, Play, Plus, Trash2, Move, Eye, Users, User, MapPin, Clock, Film, Pause, Settings } from 'lucide-react';

type CameraAngle = 'wide' | 'medium' | 'closeup' | 'extreme-closeup' | 'over-shoulder';
type CameraHeight = 'eye-level' | 'low-angle' | 'high-angle' | 'dutch-angle';
type CameraMovement = 'static' | 'pan' | 'tilt' | 'dolly' | 'track' | 'zoom';

interface Keyframe {
    id: string;
    time: number;
    angle: CameraAngle;
    height: CameraHeight;
    movement: CameraMovement;
    target: 'both' | 'characterA' | 'characterB' | 'environment';
    description?: string;
}

interface Scene {
    id: string;
    title: string;
    duration: number;
    keyframes: Keyframe[];
}

const cameraAngles = {
    'wide': { label: 'Wide Shot', desc: 'Shows entire scene & environment', icon: '🏞️' },
    'medium': { label: 'Medium Shot', desc: 'Waist up, good for dialogue', icon: '👥' },
    'closeup': { label: 'Close-up', desc: 'Face filling frame, emotional', icon: '😊' },
    'extreme-closeup': { label: 'Extreme Close-up', desc: 'Eyes/details only, intense', icon: '👁️' },
    'over-shoulder': { label: 'Over-Shoulder', desc: 'Behind one character', icon: '👤' }
};

const cameraHeights = {
    'eye-level': { label: 'Eye Level', desc: 'Natural, neutral perspective' },
    'low-angle': { label: 'Low Angle', desc: 'Camera below subject, powerful' },
    'high-angle': { label: 'High Angle', desc: 'Camera above subject, vulnerable' },
    'dutch-angle': { label: 'Dutch Angle', desc: 'Tilted, dramatic tension' }
};

const cameraMovements = {
    'static': { label: 'Static', desc: 'No movement, stable shot' },
    'pan': { label: 'Pan', desc: 'Side-to-side movement' },
    'tilt': { label: 'Tilt', desc: 'Up and down movement' },
    'dolly': { label: 'Dolly', desc: 'Forward/backward movement' },
    'track': { label: 'Track', desc: 'Follow the subject smoothly' },
    'zoom': { label: 'Zoom', desc: 'Change magnification/focus' }
};

const targets = {
    'both': { label: 'Both Characters', icon: Users, color: 'bg-purple-100 text-purple-800' },
    'characterA': { label: 'Character A', icon: User, color: 'bg-blue-100 text-blue-800' },
    'characterB': { label: 'Character B', icon: User, color: 'bg-green-100 text-green-800' },
    'environment': { label: 'Environment', icon: MapPin, color: 'bg-orange-100 text-orange-800' }
};

const durationPresets = [
    { value: 7.5, label: '7.5 seconds', desc: 'Standard short scene' },
    { value: 15, label: '15 seconds', desc: 'Medium scene' },
    { value: 30, label: '30 seconds', desc: 'Long scene' },
    { value: 60, label: '1 minute', desc: 'Extended scene' },
    { value: 120, label: '2 minutes', desc: 'Long-form content' },
    { value: 300, label: '5 minutes', desc: 'Full sequence' }
];

export default function ModernSceneComposer() {
    const [scenes, setScenes] = useState<Scene[]>([
        {
            id: 'scene1',
            title: 'Opening Conversation',
            duration: 7.5,
            keyframes: [
                {
                    id: 'kf1',
                    time: 0,
                    angle: 'wide',
                    height: 'eye-level',
                    movement: 'static',
                    target: 'both',
                    description: 'Establish the scene'
                },
                {
                    id: 'kf2',
                    time: 3,
                    angle: 'closeup',
                    height: 'eye-level',
                    movement: 'static',
                    target: 'characterA',
                    description: 'Character A speaks'
                },
                {
                    id: 'kf3',
                    time: 5.5,
                    angle: 'over-shoulder',
                    height: 'eye-level',
                    movement: 'static',
                    target: 'characterB',
                    description: 'Character B responds'
                }
            ]
        }
    ]);

    const [activeScene, setActiveScene] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [selectedKeyframe, setSelectedKeyframe] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showDurationSettings, setShowDurationSettings] = useState(false);
    const [customDuration, setCustomDuration] = useState('');
    const timelineRef = useRef<HTMLDivElement>(null);

    // Auto-play simulation
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= scenes[activeScene].duration) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 0.1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, activeScene, scenes]);

    const getCurrentKeyframe = () => {
        const keyframes = scenes[activeScene].keyframes;
        return keyframes.reduce((prev, curr) =>
            curr.time <= currentTime && curr.time > prev.time ? curr : prev
        );
    };

    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
    };

    const generateTimeMarkers = (duration: number) => {
        let interval = 1; // Default 1 second intervals

        if (duration <= 10) interval = 1;
        else if (duration <= 30) interval = 5;
        else if (duration <= 60) interval = 10;
        else if (duration <= 300) interval = 30;
        else interval = 60;

        const markers = [];
        for (let i = 0; i <= duration; i += interval) {
            if (i <= duration) {
                markers.push(i);
            }
        }

        // Always include the end time if it's not already included
        if (markers[markers.length - 1] !== duration) {
            markers.push(duration);
        }

        return markers;
    };

    const updateSceneDuration = (newDuration: number) => {
        setScenes(prev => {
            const updated = [...prev];
            updated[activeScene].duration = newDuration;

            // Remove keyframes that are beyond the new duration
            updated[activeScene].keyframes = updated[activeScene].keyframes.filter(
                kf => kf.time <= newDuration
            );

            return updated;
        });

        // Reset current time if it exceeds new duration
        if (currentTime > newDuration) {
            setCurrentTime(0);
        }

        setShowDurationSettings(false);
    };

    const handleCustomDuration = () => {
        const duration = parseFloat(customDuration);
        if (duration && duration > 0 && duration <= 3600) { // Max 1 hour
            updateSceneDuration(duration);
            setCustomDuration('');
        }
    };

    const addKeyframe = () => {
        if (currentTime >= scenes[activeScene].duration) return;

        const newKeyframe: Keyframe = {
            id: `kf_${Date.now()}`,
            time: Math.round(currentTime * 10) / 10,
            angle: 'medium',
            height: 'eye-level',
            movement: 'static',
            target: 'both',
            description: `New shot at ${Math.round(currentTime * 10) / 10}s`
        };

        setScenes(prev => {
            const updated = [...prev];
            updated[activeScene].keyframes = [
                ...updated[activeScene].keyframes,
                newKeyframe
            ].sort((a, b) => a.time - b.time);
            return updated;
        });

        setSelectedKeyframe(newKeyframe.id);
    };

    const updateKeyframe = (keyframeId: string, updates: Partial<Keyframe>) => {
        setScenes(prev => {
            const updated = [...prev];
            const keyframeIndex = updated[activeScene].keyframes.findIndex(kf => kf.id === keyframeId);
            if (keyframeIndex >= 0) {
                updated[activeScene].keyframes[keyframeIndex] = {
                    ...updated[activeScene].keyframes[keyframeIndex],
                    ...updates
                };
            }
            return updated;
        });
    };

    const deleteKeyframe = (keyframeId: string) => {
        setScenes(prev => {
            const updated = [...prev];
            updated[activeScene].keyframes = updated[activeScene].keyframes.filter(kf => kf.id !== keyframeId);
            return updated;
        });
        setSelectedKeyframe(null);
    };

    const handleTimelineClick = (e: React.MouseEvent) => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const percentage = clickPosition / rect.width;
        const newTime = Math.max(0, Math.min(scenes[activeScene].duration, percentage * scenes[activeScene].duration));
        setCurrentTime(newTime);
    };

    const currentKeyframe = getCurrentKeyframe();
    const selectedKf = scenes[activeScene].keyframes.find(kf => kf.id === selectedKeyframe) || currentKeyframe;
    const timeMarkers = generateTimeMarkers(scenes[activeScene].duration);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Film className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Scene Composer</h1>
                            <p className="text-slate-600 text-sm">Design cinematic camera movements for AI video generation</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowDurationSettings(!showDurationSettings)}
                            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            <Settings className="w-4 h-4" />
                            <span>Duration: {formatTime(scenes[activeScene].duration)}</span>
                        </button>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{isPlaying ? 'Pause' : 'Preview'}</span>
                        </button>
                    </div>
                </div>

                {/* Duration Settings Dropdown */}
                {showDurationSettings && (
                    <div className="absolute top-20 right-6 bg-white rounded-xl shadow-lg border border-slate-200 p-4 z-50 w-80">
                        <h3 className="font-semibold text-slate-900 mb-3">Scene Duration</h3>

                        {/* Preset Durations */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {durationPresets.map(preset => (
                                <button
                                    key={preset.value}
                                    onClick={() => updateSceneDuration(preset.value)}
                                    className={`p-3 text-left rounded-lg border-2 transition-all ${scenes[activeScene].duration === preset.value
                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{preset.label}</div>
                                    <div className="text-xs text-slate-600">{preset.desc}</div>
                                </button>
                            ))}
                        </div>

                        {/* Custom Duration */}
                        <div className="border-t border-slate-200 pt-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Custom Duration (seconds)</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={customDuration}
                                    onChange={(e) => setCustomDuration(e.target.value)}
                                    placeholder="Enter seconds..."
                                    min="1"
                                    max="3600"
                                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button
                                    onClick={handleCustomDuration}
                                    disabled={!customDuration || parseFloat(customDuration) <= 0}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                                >
                                    Set
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Maximum: 1 hour (3600 seconds)</p>
                        </div>
                    </div>
                )}
            </header>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    {/* Scene Preview - Takes up more space */}
                    <div className="xl:col-span-3 space-y-6">
                        {/* Scene Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">{scenes[activeScene].title}</h2>
                                    <p className="text-slate-600 text-sm">Duration: {formatTime(scenes[activeScene].duration)}</p>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatTime(currentTime)}</span>
                                </div>
                            </div>

                            {/* Video Preview Area */}
                            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center relative overflow-hidden">
                                <div className="text-center text-white">
                                    {/* <div className="text-6xl mb-4">
                                        {cameraAngles[currentKeyframe.angle].icon}
                                    </div> */}
                                    <h3 className="text-2xl font-semibold mb-2">
                                        {cameraAngles[currentKeyframe.angle].label}
                                    </h3>
                                    <p className="text-slate-300 mb-4">{cameraAngles[currentKeyframe.angle].desc}</p>
                                    <div className="flex items-center justify-center space-x-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Camera className="w-4 h-4" />
                                            <span>{cameraHeights[currentKeyframe.height].label}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Move className="w-4 h-4" />
                                            <span>{cameraMovements[currentKeyframe.movement].label}</span>
                                        </div>
                                        <div className={`px-2 py-1 rounded ${targets[currentKeyframe.target].color}`}>
                                            {targets[currentKeyframe.target].label}
                                        </div>
                                    </div>
                                </div>

                                {/* Progress indicator */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="w-full bg-white/20 rounded-full h-1">
                                        <div
                                            className="bg-white rounded-full h-1 transition-all duration-100"
                                            style={{ width: `${(currentTime / scenes[activeScene].duration) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
                                <p className='px-4 py-1.5 rounded-md text-xs bg-black text-white'>{`${Math.round(currentTime * 10) / 10}s`}</p>
                                <button
                                    onClick={addKeyframe}
                                    disabled={currentTime >= scenes[activeScene].duration}
                                    className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Keyframe</span>
                                </button>
                            </div>

                            {/* Timeline Track */}
                            <div className="relative">
                                {/* Time markers - positioned above the timeline */}
                                <div className="relative mb-8 h-6">
                                    {timeMarkers.map((time, i) => (
                                        <div
                                            key={i}
                                            className="absolute flex flex-col items-center"
                                            style={{ left: `${(time / scenes[activeScene].duration) * 100}%` }}
                                        >
                                            <span className="text-xs text-slate-500 mb-1 whitespace-nowrap">
                                                {formatTime(time)}
                                            </span>
                                            <div className="w-px h-4 bg-slate-300" />
                                        </div>
                                    ))}
                                </div>

                                <div
                                    ref={timelineRef}
                                    onClick={handleTimelineClick}
                                    className="h-20 bg-slate-100 rounded-xl relative cursor-pointer border-2 border-dashed border-slate-300 hover:border-indigo-300 transition-colors overflow-hidden"
                                >
                                    {/* Keyframe markers */}
                                    {scenes[activeScene].keyframes.map((kf, i) => {
                                        const TargetIcon = targets[kf.target].icon;
                                        const leftPosition = (kf.time / scenes[activeScene].duration) * 100;

                                        return (
                                            <div
                                                key={kf.id}
                                                className={`absolute top-2 bottom-2 w-12 rounded-lg cursor-pointer transition-all duration-200 border-2 ${selectedKeyframe === kf.id
                                                        ? 'bg-indigo-600 border-indigo-600 scale-110 z-10'
                                                        : 'bg-white border-slate-300 hover:border-indigo-400 hover:scale-105'
                                                    }`}
                                                style={{
                                                    left: `${Math.max(0, Math.min(leftPosition, 95))}%`,
                                                    marginLeft: leftPosition > 95 ? '-48px' : leftPosition < 5 ? '0px' : '-24px'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedKeyframe(kf.id);
                                                    setCurrentTime(kf.time);
                                                }}
                                            >
                                                <div className="h-full flex flex-col items-center justify-center">
                                                    <TargetIcon className={`w-4 h-4 ${selectedKeyframe === kf.id ? 'text-white' : 'text-slate-600'}`} />
                                                    <span className={`text-xs font-medium ${selectedKeyframe === kf.id ? 'text-white' : 'text-slate-700'}`}>
                                                        {formatTime(kf.time)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Current time indicator */}
                                    <div
                                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 transition-all duration-100"
                                        style={{ left: `${(currentTime / scenes[activeScene].duration) * 100}%` }}
                                    >
                                        <div className="absolute -top-3 -left-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Panel */}
                    <div className="space-y-6">
                        {/* Keyframe Editor */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900">Camera Settings</h3>
                                {selectedKf && (
                                    <button
                                        onClick={() => deleteKeyframe(selectedKf.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {selectedKf && (
                                <div className="space-y-6">
                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Shot Description</label>
                                        <input
                                            type="text"
                                            value={selectedKf.description || ''}
                                            onChange={(e) => updateKeyframe(selectedKf.id, { description: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Describe this shot..."
                                        />
                                    </div>

                                    {/* Camera Angle */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Camera Angle</label>
                                        <div className="grid grid-cols-1 gap-2">
                                            {Object.entries(cameraAngles).map(([value, info]) => (
                                                <button
                                                    key={value}
                                                    onClick={() => updateKeyframe(selectedKf.id, { angle: value as CameraAngle })}
                                                    className={`p-3 text-left rounded-lg border-2 transition-all ${selectedKf.angle === value
                                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                                        }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        {/* <span className="text-xl">{info.icon}</span> */}
                                                        <div>
                                                            <div className="font-medium">{info.label}</div>
                                                            <div className="text-xs text-slate-600">{info.desc}</div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Camera Height */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Camera Height</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(cameraHeights).map(([value, info]) => (
                                                <button
                                                    key={value}
                                                    onClick={() => updateKeyframe(selectedKf.id, { height: value as CameraHeight })}
                                                    className={`p-2 text-center rounded-lg border-2 transition-all text-sm ${selectedKf.height === value
                                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                                        }`}
                                                >
                                                    <div className="font-medium">{info.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Camera Movement */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Camera Movement</label>
                                        <select
                                            value={selectedKf.movement}
                                            onChange={(e) => updateKeyframe(selectedKf.id, { movement: e.target.value as CameraMovement })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {Object.entries(cameraMovements).map(([value, info]) => (
                                                <option key={value} value={value}>
                                                    {info.label} - {info.desc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Focus Target */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Focus Target</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(targets).map(([value, info]) => {
                                                const IconComponent = info.icon;
                                                return (
                                                    <button
                                                        key={value}
                                                        onClick={() => updateKeyframe(selectedKf.id, { target: value as any })}
                                                        className={`p-3 rounded-lg border-2 transition-all ${selectedKf.target === value
                                                                ? 'border-indigo-500 bg-indigo-50'
                                                                : 'border-slate-200 hover:border-slate-300 bg-white'
                                                            }`}
                                                    >
                                                        <div className="flex flex-col items-center space-y-1">
                                                            <IconComponent className="w-5 h-5 text-slate-600" />
                                                            <span className="text-xs font-medium text-center">{info.label}</span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Keyframe List */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Shot List</h3>
                            <div className="space-y-2 max-h-80 overflow-y-auto">
                                {scenes[activeScene].keyframes.map((kf, i) => {
                                    const TargetIcon = targets[kf.target].icon;
                                    return (
                                        <div
                                            key={kf.id}
                                            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedKeyframe === kf.id
                                                    ? 'bg-indigo-50 border-2 border-indigo-200'
                                                    : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                                                }`}
                                            onClick={() => {
                                                setSelectedKeyframe(kf.id);
                                                setCurrentTime(kf.time);
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <TargetIcon className="w-4 h-4 text-slate-600" />
                                                    <div>
                                                        <div className="font-medium text-sm">{kf.description || cameraAngles[kf.angle].label}</div>
                                                        <div className="text-xs text-slate-600">{formatTime(kf.time)}</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {kf.angle} • {kf.movement}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop for dropdown */}
            {showDurationSettings && (
                <div
                    className="fixed inset-0 bg-black/10 z-40"
                    onClick={() => setShowDurationSettings(false)}
                />
            )}
        </div>
    );
}