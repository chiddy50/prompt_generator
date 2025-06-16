"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of your context
interface AppContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    aIModel: string | null;
    setAIModel: (value: string | null) => void;
}

// Create context with proper typing and default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define props for your context provider
interface MainContextProps {
    children: ReactNode;
}

export function MainProvider({ children }: MainContextProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [aIModel, setAIModel] = useState<string>("");

    useEffect(() => {
        // Your initialization logic here
    }, []);

    return (
        <AppContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            aIModel, setAIModel
        }}>
            {children}
        </AppContext.Provider>
    );
}

// Create a custom hook for using the context
export function useMainContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a MainContext provider');
    }
    return context;
}