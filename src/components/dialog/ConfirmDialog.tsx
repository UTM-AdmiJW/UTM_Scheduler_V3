import { DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

import { AiOutlineQuestionCircle } from 'react-icons/ai';

import { useDialog } from "../../hooks/useDialog";



export interface IConfirmDialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
}




export default function ConfirmDialog({ title, message, onConfirm, onCancel }: IConfirmDialogProps) {
    const { closeDialog } = useDialog();

    const handleConfirm = () => {
        onConfirm();
        closeDialog();
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
        closeDialog();
    };


    return <>
        <DialogTitle>
            <Typography className='text-2xl font-bold flex items-center'>
                <AiOutlineQuestionCircle className='mr-2 inline' fontSize='x-large' /> 
                { title }
            </Typography>
        </DialogTitle>
    
        <DialogContent className='pb-3'>
            { message }
        </DialogContent>

        <DialogActions>
            <Button variant="contained" type='submit' onClick={ handleConfirm }>
                Confirm
            </Button>
            <Button variant="outlined" onClick={ handleCancel }>
                Cancel
            </Button>
        </DialogActions>
    </>
}