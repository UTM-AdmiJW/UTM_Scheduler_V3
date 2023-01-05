import { Button, DialogActions, DialogContent, Typography } from '@mui/material';
import LoginDialog from '../../login/LoginDialog';

import { useEffect } from 'react';
import { useDialog } from '../../../hooks/useDialog';
import { useStudentRedux } from '../../../hooks/redux/useStudentRedux';
import { useRegisteredCoursesContext } from '../../../hooks/context/useRegisteredCoursesContext';

import { BsPersonXFill } from 'react-icons/bs';
import { RegisteredCoursesProgress } from '../../../enums/RegisteredCoursesProgress';



export default function RegisteredCoursesLoginView() {

    const { openDialog, closeDialog } = useDialog();
    const { studentState: { isLoggedIn } } = useStudentRedux();
    const { setRegisteredCoursesState } = useRegisteredCoursesContext();


    const handleLoginButton = ()=> {
        openDialog(<LoginDialog />);
    }

    useEffect(()=> {
        if (!isLoggedIn) return;

        setRegisteredCoursesState(prev => {
            return { ...prev, progress: RegisteredCoursesProgress.SELECT_REGISTERED_SUBJECT };
        });
    }, [isLoggedIn]);


    return <>
        <DialogContent className='pt-4 flex flex-col items-center'>

            <BsPersonXFill className='text-5xl text-gray-400' />

            <Typography className='text-center text-gray-400 mt-2 mb-4 font-extralight'>
                You must be logged in in order to view your registered <br/>
                courses using your matric number.
            </Typography>

            <Button variant='contained' color='primary' onClick={handleLoginButton}>
                Login
            </Button>
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}