import { useSnackbar, SnackbarKey } from 'notistack';
import { Close } from '@mui/icons-material';


// A custom hook that extends useSnackbar from notistack
export const useAlert = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Action button, including the button to close the snackbar
    const action = (snackbarId: SnackbarKey) => <>
        <button onClick={() => { closeSnackbar(snackbarId) }}>
            <Close />
        </button>
    </>

    // Snackbar Variants
    const alertError = (message: string) => { enqueueSnackbar(message, { variant: 'error', action }); };
    const alertWarning = (message: string) => { enqueueSnackbar(message, { variant: 'warning', action }); };
    const alertInfo = (message: string) => { enqueueSnackbar(message, { variant: 'info', action }); };
    const alertSuccess = (message: string) => { enqueueSnackbar(message, { variant: 'success', action }); };

    return { alertError, alertWarning, alertInfo, alertSuccess };
};