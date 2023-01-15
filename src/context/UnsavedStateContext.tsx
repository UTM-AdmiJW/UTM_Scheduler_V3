
 import { createContext } from "react";
 import { useState } from "react";


/**
 * In the application, there are pages that contain react-hook-forms that may still not be submitted yet.
 * This context is used to simply store whether there are unsaved data in the application to be accessed by
 * functions, such as alert the user if they try to leave the page without saving.
 */




export interface IUnsavedStateContextType {
    isDirty: boolean,
    setIsDirty: (isDirty: boolean) => void;
}



export const UnsavedStateContext = createContext<IUnsavedStateContextType | null>(null);



export function UnsavedStateContextProvider({ children }: { children: React.ReactNode }) {
    const [ isDirty, setIsDirty ] = useState(false);
    
    return <>
        <UnsavedStateContext.Provider value={{ isDirty, setIsDirty }}>
            { children }
        </UnsavedStateContext.Provider>
    </>
};

