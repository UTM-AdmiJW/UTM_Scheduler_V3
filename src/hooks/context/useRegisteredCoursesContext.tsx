import { useContext } from "react"

import { RegisteredCoursesContext } from "../../context/RegisteredCoursesContext";


// A wrapper around useContext(RegisteredCoursesContext).
// Use this hook only in components that are descendants of RegisteredCoursesContextProvider.
export const useRegisteredCoursesContext = () => {
    const context = useContext(RegisteredCoursesContext)!;
    return context;
}