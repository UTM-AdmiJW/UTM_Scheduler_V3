import { createContext } from "react";

import { useState } from "react";

import { RegisteredCoursesProgress } from "../enums/RegisteredCoursesProgress";
import type { IRegisteredCoursesState } from "../model/domain/IRegisteredCoursesState";


// The context used in CourseCatalogDialog to hold the state of the course catalog.

export interface IRegisteredCoursesContextType {
    registeredCoursesState: IRegisteredCoursesState;
    setRegisteredCoursesState: React.Dispatch<React.SetStateAction<IRegisteredCoursesState>>;
}


export const RegisteredCoursesContext = createContext<IRegisteredCoursesContextType | null>(null);


export function RegisteredCoursesContextProvider({ children }: { children: React.ReactNode }) {
    
    const [ registeredCoursesState, setRegisteredCoursesState ] = useState<IRegisteredCoursesState>({
        progress: RegisteredCoursesProgress.LOGIN,
    });

    
    return <>
        <RegisteredCoursesContext.Provider value={{ registeredCoursesState, setRegisteredCoursesState }}>    
            { children }
        </RegisteredCoursesContext.Provider>
    </>
};

