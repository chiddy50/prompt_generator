"use client"

import { useState, useRef, useEffect } from 'react';

export const facialMarks = {
  // NATURAL
  skinFeatures: [
    "Freckles (light/heavy)",
    "Moles (single/cluster)",
    "Rosacea",
    "Vitiligo",
    "Bone-white birthmarks"
  ],

  // DAMAGE
  scars: [
    "Dueling scar",
    "Claw marks",
    "Burn scars (acid/fire)",
    "Surgical stitches",
    "Cyber-implant seams"
  ],

  // ARTIFICIAL
  adornments: [
    "Ritual tattoos",
    "Faction brandings",
    "Nano-circuit tattoos",
    "Glowing runes",
    "Piercings (nose/lip/brow)"
  ],

  // TEMPORARY
  temporary: [
    "Bruises (fresh/healing)",
    "War paint",
    "Dust/grease smears",
    "Blood splatters",
    "Healing fractures (cracked skin)"
  ]
};

type FacialMarksCategory = keyof typeof facialMarks;
type FacialMarkOption = string;

interface FacialMarksSelectorProps {
  onSelect: (category: FacialMarksCategory, option: FacialMarkOption) => void;
  selectedOptions: Partial<Record<FacialMarksCategory, FacialMarkOption[]>>;
  className?: string;
}

export default function FacialMarksSelector({ 
  onSelect, 
  selectedOptions,
  className = ''
}: FacialMarksSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<FacialMarksCategory | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category: FacialMarksCategory) => {
    setCurrentCategory(category);
  };

  const handleOptionSelect = (option: FacialMarkOption) => {
    if (currentCategory) {
      onSelect(currentCategory, option);
    }
  };

  const isOptionSelected = (category: FacialMarksCategory, option: FacialMarkOption) => {
    return selectedOptions[category]?.includes(option) || false;
  };

  const getCategoryLabel = (category: FacialMarksCategory) => {
    const labels: Record<FacialMarksCategory, string> = {
      skinFeatures: 'Natural Features',
      scars: 'Scars & Damage',
      adornments: 'Adornments',
      temporary: 'Temporary Marks'
    };
    return labels[category];
  };

  const countSelectedInCategory = (category: FacialMarksCategory) => {
    return selectedOptions[category]?.length || 0;
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border capitalize text-xs border-gray-300 rounded-md shadow-sm focus:outline-none"
      >
        {Object.values(selectedOptions).flat().length > 0 ? (
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(selectedOptions).map(([category, options]) => (
              options?.map(option => (
                <span 
                  key={`${category}-${option}`}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {option}
                </span>
              ))
            ))}
          </div>
        ) : (
          'Select facial marks...'
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="flex h-96 overflow-hidden">
            {/* Category sidebar */}
            <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-gray-50">
              {Object.keys(facialMarks).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category as FacialMarksCategory)}
                  className={`w-full px-4 py-2 text-left text-xs capitalize flex justify-between items-center ${currentCategory === category ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-gray-100'}`}
                >
                  <span>{getCategoryLabel(category as FacialMarksCategory)}</span>
                  {countSelectedInCategory(category as FacialMarksCategory) > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {countSelectedInCategory(category as FacialMarksCategory)}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Options panel */}
            <div className="w-2/3 overflow-y-auto">
              {currentCategory ? (
                <div>
                  <div className="sticky top-0 px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-bold text-sm">{getCategoryLabel(currentCategory)}</h3>
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    {facialMarks[currentCategory].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full px-4 py-2 text-left capitalize text-xs flex items-center ${isOptionSelected(currentCategory, option) ? 'bg-blue-50 text-blue-800' : 'hover:bg-gray-50'}`}
                      >
                        <span className={`w-4 h-4 flex items-center justify-center mr-2 border rounded-sm ${isOptionSelected(currentCategory, option) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                          {isOptionSelected(currentCategory, option) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  Select a category
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}