import { useContext } from "react"

import { CourseCatalogContext } from "../../context/CourseCatalogContext";


// A wrapper around useContext(CourseCatalogContext).
// Use this hook only in components that are descendants of CourseCatalogContextProvider.
export const useCourseCatalogContext = () => {
    const context = useContext(CourseCatalogContext)!;
    return context;
}