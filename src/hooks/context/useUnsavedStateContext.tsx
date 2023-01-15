import { useContext } from "react"
import { UnsavedStateContext } from "../../context/UnsavedStateContext";


// A wrapper around useContext(CourseCatalogContext).
// Use this hook only in components that are descendants of CourseCatalogContextProvider.
export const useUnsavedStateContext = () => {
    const context = useContext(UnsavedStateContext)!;
    return context;
}