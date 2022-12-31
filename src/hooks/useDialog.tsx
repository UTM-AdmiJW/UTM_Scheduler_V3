import { useContext } from "react";
import { DialogContext } from "../context/DialogContext";

import ConfirmDialog, { IConfirmDialogProps } from "../components/dialog/ConfirmDialog";


// A custom hook that helps you to useContext on DialogContext and return whatever is returned from the context
export const useDialog = () => {

    // The context consisting of openDialog and closeDialog
    const context = useContext(DialogContext);

    // Opens a ConfirmDialog
    const openConfirmDialog = (title: string, message: string, onConfirm: () => void, onCancel: () => void) => {
        const props: IConfirmDialogProps = {
            title, message, onConfirm, onCancel
        };

        context.openDialog(<ConfirmDialog {...props} />);
    }

    return { ...context, openConfirmDialog };
};