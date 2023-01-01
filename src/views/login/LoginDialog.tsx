import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useDialog } from "../../hooks/useDialog";
import { useAlert } from "../../hooks/useAlert";

import { DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from "@mui/material";
import HookFormTextField from "../../components/form/HookFormTextField";

import { login } from "../../redux/studentSlice";

import { AiOutlineLogin } from 'react-icons/ai';

import type { SubmitHandler } from "react-hook-form/dist/types";
import type { IStudent } from "../../model/IStudent";




export default function LoginDialog() {
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm<IStudent>();
    
    const { alertSuccess } = useAlert();
    const { closeDialog } = useDialog();


    const onSubmit: SubmitHandler<IStudent> = (data) => {
        dispatch(login(data));
        alertSuccess('Login successful. Welcome, ' + data.name);
        closeDialog();
    };



    return <>
    <form onSubmit={ handleSubmit(onSubmit) }>
        
        <DialogTitle>
        <Typography className='text-2xl font-bold flex items-center'>
            <AiOutlineLogin className='mr-2 inline' fontSize='x-large' /> 
            Login
        </Typography>
        </DialogTitle>
    
        <DialogContent className='py-4'>
            
            {/* Name field */}
            <HookFormTextField
                hookFormProps={{
                    name: 'name',
                    control,
                    defaultValue: '',
                    rules: { required: 'Required' },
                }}
                textFieldProps={{
                    id: 'name',
                    label: 'Name',
                    variant: 'outlined',
                    size: 'small',
                    fullWidth: true,
                    required: true,
                }}
            />

            <div className='my-3'></div>

            {/* Matric number Field */}
            <HookFormTextField
                hookFormProps={{
                    name: 'matricNo',
                    control,
                    defaultValue: '',
                    rules: { required: 'Required' },
                }}
                textFieldProps={{
                    id: 'matricNo',
                    label: 'Matric Number',
                    variant: 'outlined',
                    size: 'small',
                    fullWidth: true,
                    required: true,
                }}
            />
        </DialogContent>

        <Divider className='m-4' />

        <DialogActions>
            <Button variant="contained" color='primary' type='submit'>
                Login
            </Button>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </form>
    </>
}