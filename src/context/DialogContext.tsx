
import { useMediaQuery, useTheme, Dialog } from "@mui/material";
import { createContext } from "react";
import { useState } from "react";


// A Dialog Context to allow you to show 'pop-up' windows anywhere in the application
// See Dialog documentation here: https://mui.com/components/dialogs/



export interface IDialogContextValue {
    openDialog: (content: React.ReactNode) => void;
    closeDialog: () => void;
}


export const DialogContext = createContext<IDialogContextValue>({ 
    openDialog: () => {}, 
    closeDialog: () => {},
});



export function DialogContextProvider({ children }: { children: React.ReactNode }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ content, setContent ] = useState<React.ReactNode>(null);

    const theme = useTheme();
    const isFullScreen = useMediaQuery( theme.breakpoints.down('sm'));


    // Exported function as context value
    const openDialog = (content: React.ReactNode) => {
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
            {/* To force minimum width */}
            <div style={{ minWidth: '300px' }} />

            { content }
        </Dialog>

        { children }
    </DialogContext.Provider>
};

