import { useContext } from "react";
import { DialogContext, IDialogContextValue } from "../context/DialogContext";



// A custom hook that helps you to useContext on DialogContext and return whatever is returned from the context
export const useDialog = () => {
    return { ...useContext(DialogContext) } as IDialogContextValue;
};