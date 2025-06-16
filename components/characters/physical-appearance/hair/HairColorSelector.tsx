"use client"

import { useState, useRef, useEffect } from 'react';

export const hairColors = [
  "Auburn",
  "Black",
  "Blonde",
  "Blue",
  "Brunette",
  "Caramel",
  "Chestnut",
  "Crimson",
  "Copper",
  "Dark Brown",
  "Dark Gray",
  "Honey",
  "Ice Blonde",
  "Lavender",
  "Mahogany",
  "Orange",
  "Pearl Blonde",
  "Platinum Blonde",
  "Purple",
  "Red",
  "Rose Gold",
  "Silver",
  "Strawberry Blonde",
  "Turquoise",
  "Violet",
  "White",
];

interface HairColorSelectorProps {
  selectedColor: string | null;
  onSelect: (color: string) => void;
  className?: string;
  showColorPreview?: boolean;
}

export default function HairColorSelector({
  selectedColor,
  onSelect,
  className = '',
  showColorPreview = true,
}: HairColorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  // Map color names to Tailwind CSS color classes
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      Auburn: 'bg-[#a52a2a]',
      Black: 'bg-black',
      Blonde: 'bg-[#faf0be]',
      Blue: 'bg-blue-500',
      Brunette: 'bg-[#5a3d2b]',
      Caramel: 'bg-[#c19a6b]',
      Chestnut: 'bg-[#954535]',
      Crimson: 'bg-[#dc143c]',
      Copper: 'bg-[#b87333]',
      'Dark Brown': 'bg-[#654321]',
      'Dark Gray': 'bg-gray-700',
      Honey: 'bg-[#f5b876]',
      'Ice Blonde': 'bg-[#f0f8ff]',
      Lavender: 'bg-[#e6e6fa]',
      Mahogany: 'bg-[#c04000]',
      Orange: 'bg-orange-500',
      'Pearl Blonde': 'bg-[#f0e6d2]',
      'Platinum Blonde': 'bg-[#e5e4e2]',
      Purple: 'bg-purple-500',
      Red: 'bg-red-600',
      'Rose Gold': 'bg-[#b76e79]',
      Silver: 'bg-[#c0c0c0]',
      'Strawberry Blonde': 'bg-[#ffdad8]',
      Turquoise: 'bg-[#40e0d0]',
      Violet: 'bg-[#8a2be2]',
      White: 'bg-white border border-gray-300',
    };
    return colorMap[color] || 'bg-gray-200';
  };

  return (
    <div className={`relative text-xs ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {showColorPreview && selectedColor && (
            <span
              className={`w-4 h-4 rounded-full mr-2 ${getColorClass(selectedColor)}`}
              aria-hidden="true"
            />
          )}
          <span className="truncate">
            {selectedColor || "Select hair color..."}
          </span>
        </div>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
          role="listbox"
        >
          {hairColors.map((color) => (
            <li
              key={color}
              role="option"
              aria-selected={selectedColor === color}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                selectedColor === color ? 'bg-blue-100 text-blue-800' : 'text-gray-900'
              }`}
              onClick={() => {
                onSelect(color);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center">
                {showColorPreview && (
                  <span
                    className={`w-4 h-4 rounded-full mr-2 ${getColorClass(color)}`}
                    aria-hidden="true"
                  />
                )}
                <span className="block truncate">{color}</span>
                {selectedColor === color && (
                  <svg
                    className="w-5 h-5 ml-2 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}