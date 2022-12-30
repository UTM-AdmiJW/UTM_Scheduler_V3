import { TextField, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from "@mui/material";

import { useDispatch } from "react-redux";
import { login } from "../../redux/studentSlice";

import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import FormController from "../../components/form/FormController";

import { AiOutlineLogin } from 'react-icons/ai';

import { useDialog } from "../../hooks/useDialog";
import { useAlert } from "../../hooks/useAlert";
import type { IStudent } from "../../model/IStudent";



// Form validators
const validators = {
    name: {
        required: 'Required',
    },
    matricNo: {
        required: 'Required',
    },
};





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



    return <form onSubmit={ handleSubmit(onSubmit) }>
        <DialogTitle>
            <Typography className='text-2xl font-bold flex items-center'>
                <AiOutlineLogin className='mr-2 inline' fontSize='x-large' /> 
                Login
            </Typography>
        </DialogTitle>
    
        <DialogContent className='py-4'>
            <FormController name='name' control={control} defaultValue='' rules={ validators.name }>
                <TextField id="name" label="Name" variant="outlined" size='small' fullWidth required />
            </FormController>

            <div className='my-3'></div>

            <FormController name='matricNo' control={control} defaultValue='' rules={ validators.matricNo }>
                <TextField id="matricNo" label="Matric Number" variant="outlined" size='small' fullWidth required />
            </FormController>
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
}