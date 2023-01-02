import { createContext } from "react";

import { useState } from "react";

import { CourseCatalogProgress } from "../enums/CourseCatalogProgress";
import type { ICourseCatalogState } from "../model/domain/ICourseCatalogState";


// The context used in CourseCatalogDialog to hold the state of the course catalog.

export interface ICourseCatalogContextType {
    courseCatalog: ICourseCatalogState;
    setCourseCatalog: React.Dispatch<React.SetStateAction<ICourseCatalogState>>;
}


export const CourseCatalogContext = createContext<ICourseCatalogContextType | null>(null);


export function CourseCatalogContextProvider({ children }: { children: React.ReactNode }) {
    
    const [ courseCatalog, setCourseCatalog ] = useState<ICourseCatalogState>({
        progress: CourseCatalogProgress.SELECT_SESSION_SEMESTER,
    });

    
    return <>
        <CourseCatalogContext.Provider value={{ courseCatalog, setCourseCatalog }}>    
            { children }
        </CourseCatalogContext.Provider>
    </>
};

