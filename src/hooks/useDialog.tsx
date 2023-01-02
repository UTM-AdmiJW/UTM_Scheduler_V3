import { useContext } from "react";
import { DialogContext } from "../context/DialogContext";

import ConfirmDialog, { IConfirmDialogProps } from "../components/dialog/ConfirmDialog";


// A custom hook that helps you to useContext on DialogContext and return whatever is returned from the context
export const useDialog = () => {

    
    // The context consisting of openDialog and closeDialog
    const context = useContext(DialogContext)!;


    // Opens a ConfirmDialog
    const openConfirmDialog = ({
        title, 
        message, 
        onConfirm, 
        onCancel
    }: IConfirmDialogProps) => {
        context.openDialog(
            <ConfirmDialog 
                title={ title } 
                message={ message } 
                onConfirm={ onConfirm } 
                onCancel={ onCancel } 
            />
        );
    }

    return { ...context, openConfirmDialog };
};