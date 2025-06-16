// app/layout-providers.tsx
"use client"

import { CharacterProvider } from "@/contexts/CharacterContext";
import { MainProvider } from "@/contexts/MainContext";

export function LayoutProviders({ children }: { children: React.ReactNode }) {
	return (
		<MainProvider>
			<CharacterProvider>
				{children}
			</CharacterProvider>
		</MainProvider>
	);
}