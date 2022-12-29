import { TextField, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from "@mui/material";

import { AiOutlineLogin } from 'react-icons/ai';

import { useDialog } from "../../hooks/useDialog";


export default function LoginDialog() {
    const { closeDialog } = useDialog();


    return <>
        <DialogTitle>
            <Typography variant='h5' className='font-bold'>
                <AiOutlineLogin className='mr-2 inline' fontSize='x-large' /> 
                Login
            </Typography>
        </DialogTitle>
    
        <DialogContent className='py-4'>
            <TextField id="name" label="Name" variant="outlined" size='small' fullWidth />
            <div className='my-3'></div>
            <TextField id="matric" label="Matric Number" variant="outlined" size='small' fullWidth />
        </DialogContent>

        <Divider className='m-4' />

        <DialogActions>
            <Button variant="contained" color='primary'>
                Login
            </Button>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    
    </>
}