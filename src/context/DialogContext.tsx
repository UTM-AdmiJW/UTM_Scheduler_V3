
import { useMediaQuery, useTheme, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { createContext } from "react";
import { useState } from "react";


// A Dialog Context to allow you to show 'pop-up' windows anywhere in the application
// See Dialog documentation here: https://mui.com/components/dialogs/


interface IDialogContextContent {
    title?: React.ReactNode,
    content?: React.ReactNode,
    actions?: React.ReactNode,
}

export interface IDialogContextValue {
    openDialog: (content: IDialogContextContent) => void;
    closeDialog: () => void;
}


export const DialogContext = createContext<IDialogContextValue>({ 
    openDialog: () => {}, 
    closeDialog: () => {} 
});



export function DialogContextProvider({ children }: { children: React.ReactNode }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ content, setContent ] = useState<IDialogContextContent>({});

    const theme = useTheme();
    const isFullScreen = useMediaQuery( theme.breakpoints.down('sm'));


    // Exported function as context value
    const openDialog = (content: IDialogContextContent) => {
        setIsOpen(true);
        setContent(content);
    }
    const closeDialog = () => {
        setIsOpen(false);
    };

    
    return <DialogContext.Provider value={{ openDialog, closeDialog }}>
        <Dialog
            fullScreen={ isFullScreen }
            open={ isOpen }
            onClose={ closeDialog }
            className='p-2'
            aria-labelledby="responsive-dialog"
            scroll="paper"
        >
            {
                content.title &&
                <DialogTitle>{ content.title }</DialogTitle>
            }

            {
                content.content &&
                <DialogContent>{ content.content }</DialogContent>
            }
            
            {
                content.actions &&
                <DialogActions>{ content.actions }</DialogActions>
            }
        </Dialog>

        { children }
    </DialogContext.Provider>
};

