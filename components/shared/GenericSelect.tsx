"use client"

import { useState, useRef, useEffect } from 'react';

interface GenericSelectProps<T> {
	options: T[];
	selected: T | null;
	onSelect: (option: T | null) => void;
	className?: string;
	renderOption?: (option: T) => JSX.Element;
	placeholder?: string;
	allowClear?: boolean;
}

export default function GenericSelect<T>({
	options,
	selected,
	onSelect,
	className = '',
	renderOption,
	placeholder = "Select an option...",
	allowClear = true
}: GenericSelectProps<T>) {
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

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation();
		onSelect(null);
	};

	return (
		<div className={`relative text-xs ${className}`} ref={dropdownRef}>
			<button
				type="button"
				className="w-full px-4 py-2 text-left bg-white text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none flex items-center justify-between"
				onClick={() => setIsOpen(!isOpen)}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span className="truncate capitalize">
					{selected || placeholder}
				</span>
				<div className="flex items-center ml-2">
					{/* Clear button - only show when there's a selection and clear is allowed */}
					{allowClear && selected && (
						<div
							// type="button"
							className="mr-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
							onClick={handleClear}
							aria-label="Clear selection"
						>
							<svg
								className="w-3 h-3 text-gray-400 hover:text-gray-600"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					)}
					{/* Dropdown arrow */}
					<svg
						className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
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
				</div>
			</button>

			{isOpen && (
				<ul
					className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
					role="listbox"
				>
					{/* Clear option at the top of the dropdown */}
					{allowClear && (
						<li
							role="option"
							aria-selected={selected === null}
							className={`px-4 py-2 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${selected === null ? 'bg-gray-100 text-gray-800' : 'text-gray-500'
								}`}
							onClick={() => {
								onSelect(null);
								setIsOpen(false);
							}}
						>
							<span className="block truncate italic">Clear selection</span>
						</li>
					)}

					{options.map((option) => (
						<li
							key={option.toString()}
							role="option"
							aria-selected={selected === option}
							className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${selected === option ? 'bg-blue-100 text-blue-800' : 'text-gray-900'
								}`}
							onClick={() => {
								onSelect(option);
								setIsOpen(false);
							}}
						>
							{renderOption ? renderOption(option) : <span className="block truncate capitalize">{option.toString()}</span>}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}