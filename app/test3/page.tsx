"use client"

import React, { useState } from 'react';
import { Copy, Download, Heart, History, RefreshCw, Eye, Settings } from 'lucide-react';
import { useEnhancedCharacterPrompt } from '@/prompt-builder/useCharacterPrompt';

const CharacterPromptGenerator = () => {
	const [showSegments, setShowSegments] = useState(false);
	const [showHistory, setShowHistory] = useState(false);
	const [showVariations, setShowVariations] = useState(false);
	const [artStyle, setArtStyle] = useState('highly detailed digital art');
	const [lighting, setLighting] = useState('cinematic lighting');
	const [cameraAngle, setCameraAngle] = useState('medium shot');

	const {
		prompt,
		promptSegments,
		promptHistory,
		favoritePrompts,
		addToFavorites,
		removeFromFavorites,
		generateVariations,
		isEmpty,
		wordCount,
		characterCount,
		exportPrompt
	} = useEnhancedCharacterPrompt({
		artStyle,
		lighting,
		cameraAngle
	});

	const [variations, setVariations] = useState<string[]>([]);
	const [selectedFormat, setSelectedFormat] = useState<'text' | 'json' | 'markdown'>('text');

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		alert('Copied to clipboard!');
	};

	const downloadPrompt = () => {
		const blob = new Blob([exportPrompt(selectedFormat)], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `character-prompt.${selectedFormat}`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleGenerateVariations = () => {
		setVariations(generateVariations());
		setShowVariations(true);
	};

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-2">AI Character Prompt Generator</h2>
				<p className="text-gray-600">Real-time prompt generation based on character attributes</p>
			</div>

			{/* Style Controls */}
			<div className="mb-6 p-4 bg-gray-50 rounded-lg">
				<div className="flex items-center gap-2 mb-3">
					<Settings className="w-5 h-5 text-gray-600" />
					<h3 className="font-semibold text-gray-700">Style Controls</h3>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Art Style</label>
						<select
							value={artStyle}
							onChange={(e) => setArtStyle(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						>
							<option value="highly detailed digital art">Digital Art</option>
							<option value="oil painting style">Oil Painting</option>
							<option value="watercolor painting">Watercolor</option>
							<option value="anime style">Anime Style</option>
							<option value="photorealistic">Photorealistic</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Lighting</label>
						<select
							value={lighting}
							onChange={(e) => setLighting(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						>
							<option value="cinematic lighting">Cinematic</option>
							<option value="dramatic lighting">Dramatic</option>
							<option value="soft lighting">Soft</option>
							<option value="golden hour lighting">Golden Hour</option>
							<option value="studio lighting">Studio</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Camera Angle</label>
						<select
							value={cameraAngle}
							onChange={(e) => setCameraAngle(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						>
							<option value="close-up">Close-up</option>
							<option value="medium shot">Medium Shot</option>
							<option value="full body shot">Full Body</option>
							<option value="wide shot">Wide Shot</option>
						</select>
					</div>
				</div>
			</div>

			{/* Generated Prompt Display */}
			<div className="mb-6">
				<div className="flex items-center justify-between mb-3">
					<h3 className="text-lg font-semibold text-gray-800">Generated Prompt</h3>
					<div className="flex gap-2">
						<button
							onClick={() => setShowSegments(!showSegments)}
							className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
						>
							<Eye className="w-4 h-4" />
							{showSegments ? 'Hide' : 'Show'} Segments
						</button>
						<button
							onClick={() => copyToClipboard(prompt)}
							className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
						>
							<Copy className="w-4 h-4" />
							Copy
						</button>
						<button
							onClick={() => addToFavorites(prompt)}
							className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
						>
							<Heart className="w-4 h-4" />
							Favorite
						</button>
						<div className="flex">
							<select
								value={selectedFormat}
								onChange={(e) => setSelectedFormat(e.target.value as any)}
								className="border-r-0 rounded-r-none border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="text">.txt</option>
								<option value="json">.json</option>
								<option value="markdown">.md</option>
							</select>
							<button
								onClick={downloadPrompt}
								className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-l-none rounded-md hover:bg-purple-200 transition-colors"
							>
								<Download className="w-4 h-4" />
								Download
							</button>
						</div>
					</div>
				</div>

				<div className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
					{isEmpty ? (
						<span className="text-gray-500">Configure character attributes to generate prompt...</span>
					) : (
						prompt
					)}
				</div>

				<div className="flex justify-between text-sm text-gray-500 mt-2">
					<span>Words: {wordCount} | Characters: {characterCount}</span>
					<button
						onClick={handleGenerateVariations}
						className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
					>
						<RefreshCw className="w-4 h-4" />
						Generate Variations
					</button>
				</div>
			</div>

			{/* Prompt Segments */}
			{showSegments && (
				<div className="mb-6 p-4 bg-blue-50 rounded-lg">
					<h4 className="font-semibold text-blue-800 mb-3">Prompt Segments</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{Object.entries(promptSegments).map(([key, value]) => (
							<div key={key} className="bg-white p-3 rounded border border-blue-100">
								<h5 className="font-medium text-blue-700 capitalize">{key}</h5>
								<p className="text-sm text-gray-700 mt-1">{value}</p>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Prompt Variations */}
			{showVariations && variations.length > 0 && (
				<div className="mb-6 p-4 bg-green-50 rounded-lg">
					<div className="flex items-center justify-between mb-3">
						<h4 className="font-semibold text-green-800">Prompt Variations</h4>
						<button
							onClick={() => setShowVariations(false)}
							className="text-sm text-gray-500 hover:text-gray-700"
						>
							Hide
						</button>
					</div>
					<div className="space-y-4">
						{variations.map((variation, index) => (
							<div key={index} className="bg-white p-3 rounded border border-green-100">
								<div className="flex justify-between items-start">
									<p className="text-sm text-gray-700">{variation}</p>
									<div className="flex gap-2 ml-3">
										<button
											onClick={() => copyToClipboard(variation)}
											className="text-green-600 hover:text-green-800"
											title="Copy"
										>
											<Copy className="w-4 h-4" />
										</button>
										<button
											onClick={() => addToFavorites(variation)}
											className="text-red-600 hover:text-red-800"
											title="Favorite"
										>
											<Heart className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Prompt History */}
			<div className="mb-6 p-4 bg-yellow-50 rounded-lg">
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-2">
						<History className="w-5 h-5 text-yellow-600" />
						<h4 className="font-semibold text-yellow-800">Prompt History</h4>
					</div>
					<button
						onClick={() => setShowHistory(!showHistory)}
						className="text-sm text-gray-500 hover:text-gray-700"
					>
						{showHistory ? 'Hide' : 'Show'}
					</button>
				</div>

				{showHistory && (
					<div className="space-y-3">
						{promptHistory.length > 0 ? (
							promptHistory.map((historyPrompt, index) => (
								<div key={index} className="bg-white p-3 rounded border border-yellow-100">
									<p className="text-sm text-gray-700 mb-2">{historyPrompt}</p>
									<div className="flex justify-end gap-2">
										<button
											onClick={() => copyToClipboard(historyPrompt)}
											className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
										>
											Copy
										</button>
										{favoritePrompts.includes(historyPrompt) ? (
											<button
												onClick={() => removeFromFavorites(historyPrompt)}
												className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
											>
												Remove Favorite
											</button>
										) : (
											<button
												onClick={() => addToFavorites(historyPrompt)}
												className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
											>
												Favorite
											</button>
										)}
									</div>
								</div>
							))
						) : (
							<p className="text-sm text-gray-500">No history yet</p>
						)}
					</div>
				)}
			</div>

			{/* Favorites Section */}
			{favoritePrompts.length > 0 && (
				<div className="p-4 bg-red-50 rounded-lg">
					<div className="flex items-center gap-2 mb-3">
						<Heart className="w-5 h-5 text-red-600" />
						<h4 className="font-semibold text-red-800">Favorite Prompts</h4>
					</div>
					<div className="space-y-3">
						{favoritePrompts.map((favPrompt, index) => (
							<div key={index} className="bg-white p-3 rounded border border-red-100">
								<p className="text-sm text-gray-700 mb-2">{favPrompt}</p>
								<div className="flex justify-end gap-2">
									<button
										onClick={() => copyToClipboard(favPrompt)}
										className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
									>
										Copy
									</button>
									<button
										onClick={() => removeFromFavorites(favPrompt)}
										className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
									>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CharacterPromptGenerator;