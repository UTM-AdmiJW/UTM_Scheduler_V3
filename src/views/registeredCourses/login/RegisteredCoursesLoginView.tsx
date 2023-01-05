import { Button, DialogActions, DialogContent } from '@mui/material';

import { useDialog } from '../../../hooks/useDialog';

import { BsPersonXFill } from 'react-icons/bs';



export default function RegisteredCoursesLoginView() {

    const { closeDialog } = useDialog();

    

    return <>
        <DialogContent className='pt-2'>

        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}