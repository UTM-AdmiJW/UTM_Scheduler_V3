import { Button, Container } from "@mui/material";

import { useAlert } from "../hooks/useAlert";
import { useDialog } from "../hooks/useDialog";

export default function TestPage() {

    const { alertError, alertSuccess, alertWarning, alertInfo } = useAlert();
    const { openDialog, closeDialog } = useDialog();

    return <Container className='my-4'>
        
        {/* Test Alerts */}
        <div className='flex gap-2'>
            <Button variant="contained" color='error' onClick={() => alertError('Error')}>Error</Button>
            <Button variant="contained" color='success' onClick={() => alertSuccess('Success')}>Success</Button>
            <Button variant="contained" color='warning' onClick={() => alertWarning('Warning')}>Warning</Button>
            <Button variant="contained" color='info' onClick={() => alertInfo('Info')}>Info</Button>
        </div>

        {/* Test Dialog */}
        <div className='flex gap-2 mt-4'>
            <Button variant="contained" color='primary' onClick={() => openDialog({
                title: 'Title',
                content: 'Content',
                actions: <Button variant="contained" color='primary' onClick={closeDialog}>Close</Button>
            })}>Open Dialog</Button>
        </div>

    </Container>
}