"use client"

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

type CameraAngle = 'wide' | 'medium' | 'closeup' | 'extreme-closeup' | 'over-shoulder';
type CameraHeight = 'eye-level' | 'low-angle' | 'high-angle' | 'dutch-angle';
type CameraMovement = 'static' | 'pan' | 'tilt' | 'dolly' | 'track' | 'zoom';

interface Keyframe {
  time: number;
  angle: CameraAngle;
  height: CameraHeight;
  movement: CameraMovement;
  target: 'both' | 'characterA' | 'characterB' | 'environment';
}

interface Scene {
  id: string;
  duration: number; // 7-8 seconds
  keyframes: Keyframe[];
}

export default function SceneComposer() {
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: 'scene1',
      duration: 7.5,
      keyframes: [
        { time: 0, angle: 'wide', height: 'eye-level', movement: 'static', target: 'both' },
        { time: 3, angle: 'closeup', height: 'eye-level', movement: 'static', target: 'characterA' },
        { time: 5, angle: 'over-shoulder', height: 'eye-level', movement: 'static', target: 'characterB' }
      ]
    }
  ]);

  const [activeScene, setActiveScene] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const addKeyframe = () => {
    if (currentTime >= scenes[activeScene].duration) return;
    
    setScenes(prev => {
      const updated = [...prev];
      updated[activeScene].keyframes = [
        ...updated[activeScene].keyframes,
        {
          time: currentTime,
          angle: 'medium',
          height: 'eye-level',
          movement: 'static',
          target: 'both'
        }
      ].sort((a, b) => a.time - b.time);
      
      return updated;
    });
  };

  const updateKeyframe = (index: number, updates: Partial<Keyframe>) => {
    setScenes(prev => {
      const updated = [...prev];
      updated[activeScene].keyframes[index] = {
        ...updated[activeScene].keyframes[index],
        ...updates
      };
      return updated;
    });
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    setCurrentTime(percentage * scenes[activeScene].duration);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scene Composer</h1>
        <p className="text-gray-600">Design camera movements for your 7-8 second scenes</p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scene Preview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Scene Preview</p>
              <p className="text-sm text-gray-400">
                Current: {currentTime.toFixed(1)}s - {scenes[activeScene].keyframes.find(k => k.time <= currentTime)?.angle || 'wide'} shot
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-2">Timeline (7.5 seconds)</h3>
            <div 
              ref={timelineRef}
              onClick={handleTimelineClick}
              className="h-16 bg-gray-200 rounded-lg relative cursor-pointer"
            >
              {/* Keyframe markers */}
              {scenes[activeScene].keyframes.map((kf, i) => (
                <motion.div
                  key={i}
                  initial={{ x: (kf.time / scenes[activeScene].duration) * 100 + '%' }}
                  className="absolute top-0 w-2 h-full bg-blue-600 rounded-full -ml-1 cursor-move"
                  drag="x"
                  dragConstraints={timelineRef}
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    if (!timelineRef.current) return;
                    const rect = timelineRef.current.getBoundingClientRect();
                    const newTime = Math.min(
                      scenes[activeScene].duration, 
                      Math.max(0, (info.point.x - rect.left) / rect.width * scenes[activeScene].duration)
                    );
                    updateKeyframe(i, { time: newTime });
                  }}
                />
              ))}

              {/* Current time indicator */}
              <div 
                className="absolute top-0 w-0.5 h-full bg-red-500 -ml-px"
                style={{ left: `${(currentTime / scenes[activeScene].duration) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Camera Controls</h2>
          
          {/* Current Keyframe Editor */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Current Keyframe at {currentTime.toFixed(1)}s</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Angle</label>
                <select 
                  className="w-full rounded-md border-gray-300 shadow-sm"
                  value={scenes[activeScene].keyframes.find(k => Math.abs(k.time - currentTime) < 0.3)?.angle || 'wide'}
                  onChange={(e) => {
                    const existing = scenes[activeScene].keyframes.findIndex(k => Math.abs(k.time - currentTime) < 0.3);
                    if (existing >= 0) {
                      updateKeyframe(existing, { angle: e.target.value as CameraAngle });
                    }
                  }}
                >
                  <option value="wide">Wide Shot (shows entire scene)</option>
                  <option value="medium">Medium Shot (waist up)</option>
                  <option value="closeup">Close-up (face filling frame)</option>
                  <option value="extreme-closeup">Extreme Close-up (eyes only)</option>
                  <option value="over-shoulder">Over-the-Shoulder</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['eye-level', 'low-angle', 'high-angle', 'dutch-angle'] as CameraHeight[]).map(height => (
                    <button
                      key={height}
                      className={`py-2 px-3 text-xs rounded-md ${scenes[activeScene].keyframes.find(k => Math.abs(k.time - currentTime) < 0.3)?.height === height ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                      onClick={() => {
                        const existing = scenes[activeScene].keyframes.findIndex(k => Math.abs(k.time - currentTime) < 0.3);
                        if (existing >= 0) {
                          updateKeyframe(existing, { height });
                        }
                      }}
                    >
                      {height.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Movement</label>
                <select 
                  className="w-full rounded-md border-gray-300 shadow-sm"
                  value={scenes[activeScene].keyframes.find(k => Math.abs(k.time - currentTime) < 0.3)?.movement || 'static'}
                  onChange={(e) => {
                    const existing = scenes[activeScene].keyframes.findIndex(k => Math.abs(k.time - currentTime) < 0.3);
                    if (existing >= 0) {
                      updateKeyframe(existing, { movement: e.target.value as CameraMovement });
                    }
                  }}
                >
                  <option value="static">Static (no movement)</option>
                  <option value="pan">Pan (side-to-side)</option>
                  <option value="tilt">Tilt (up-down)</option>
                  <option value="dolly">Dolly (forward/backward)</option>
                  <option value="track">Tracking (follow subject)</option>
                  <option value="zoom">Zoom (magnification change)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['both', 'characterA', 'characterB', 'environment'] as const).map(target => (
                    <button
                      key={target}
                      className={`py-2 px-3 text-xs rounded-md ${scenes[activeScene].keyframes.find(k => Math.abs(k.time - currentTime) < 0.3)?.target === target ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                      onClick={() => {
                        const existing = scenes[activeScene].keyframes.findIndex(k => Math.abs(k.time - currentTime) < 0.3);
                        if (existing >= 0) {
                          updateKeyframe(existing, { target });
                        }
                      }}
                    >
                      {target === 'both' ? 'Both Characters' : 
                       target === 'characterA' ? 'Character A' :
                       target === 'characterB' ? 'Character B' : 'Environment'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={addKeyframe}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Keyframe at {currentTime.toFixed(1)}s
          </button>

          {/* Keyframe List */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-2">Keyframes</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {scenes[activeScene].keyframes.map((kf, i) => (
                <div 
                  key={i}
                  className={`p-3 rounded-md cursor-pointer ${Math.abs(kf.time - currentTime) < 0.3 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                  onClick={() => setCurrentTime(kf.time)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium">{kf.angle.replace('-', ' ')}</span>
                      <span className="text-xs text-gray-500 ml-2">{kf.time.toFixed(1)}s</span>
                    </div>
                    <button 
                      className="text-red-500 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setScenes(prev => {
                          const updated = [...prev];
                          updated[activeScene].keyframes = updated[activeScene].keyframes.filter((_, idx) => idx !== i);
                          return updated;
                        });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {kf.height}, {kf.movement}, focus on {kf.target}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}