import { Button, DialogActions, DialogContent, Typography } from '@mui/material';
import EnterProfileDialog from '../../profile/EnterProfileDialog';

import { useEffect } from 'react';
import { useDialog } from '../../../hooks/useDialog';
import { useStudentRedux } from '../../../hooks/redux/useStudentRedux';
import { useRegisteredCoursesContext } from '../../../hooks/context/useRegisteredCoursesContext';

import { BsPersonXFill } from 'react-icons/bs';
import { RegisteredCoursesProgress } from '../../../enums/';



export default function RegisteredCoursesLoginView() {

    const { openDialog, closeDialog } = useDialog();
    const { studentState: { isLoggedIn } } = useStudentRedux();
    const { setRegisteredCoursesState } = useRegisteredCoursesContext();


    const handleLoginButton = ()=> {
        openDialog(<EnterProfileDialog />);
    }

    useEffect(()=> {
        if (!isLoggedIn) return;

        setRegisteredCoursesState(prev => {
            return { ...prev, progress: RegisteredCoursesProgress.SELECT_SESSIONSEMESTER };
        });
    }, [isLoggedIn, setRegisteredCoursesState]);


    return <>
        <DialogContent className='pt-4 flex flex-col items-center'>

            <BsPersonXFill className='text-5xl text-gray-400' />

            <Typography className='text-center text-gray-400 mt-2 mb-4 font-extralight'>
                We need your matric number<br/> to retrieve your registered courses.
            </Typography>

            <Button variant='contained' color='primary' onClick={handleLoginButton}>
                Enter your profile
            </Button>
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}