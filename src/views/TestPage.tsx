import { Button, Container } from "@mui/material";

import { useAlert } from "../hooks/useAlert";
import { useDialog } from "../hooks/useDialog";

import Loading from "../components/loading/Loading";

export default function TestPage() {

    const { alertError, alertSuccess, alertWarning, alertInfo } = useAlert();
    const { openConfirmDialog } = useDialog();

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
            <Button variant="contained" color='primary' onClick={()=> {
                openConfirmDialog({
                    title: 'Confirm',
                    message: 'Are you sure?',
                    onConfirm: () => alertSuccess('Confirmed'),
                    onCancel: () => alertError('Cancelled')
                })
            }}>
                Open Confirm Dialog
            </Button>
        </div>

        <Loading />

    </Container>
}