

/**
 * A button used to navigate to another page. However, it will check with UnsavedStateContext to see if there are
 * unsaved data in the application. If there are, it will prompt the user to confirm if they want to leave the page.
 */

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApplicationRedux } from "../../hooks/redux/useApplicationRedux";
import { useDialog } from "../../hooks/useDialog";

interface INavigateButtonProps {
    navigateTo: string;
    label: string;
    icon?: React.ReactNode;
    
}


export default function NavigateButton({
    navigateTo,
    label,
    icon,
}: INavigateButtonProps) {

    const navigate = useNavigate();
    const { openConfirmDialog } = useDialog();
    const { applicationState: { hasUnsavedData }, applicationActions: { setHasUnsavedData } } = useApplicationRedux();


    const handleClick = ()=> {
        if (!hasUnsavedData) return navigate(navigateTo);
        
        openConfirmDialog({
            title: "Unsaved changes",
            message: "You have unsaved changes. Are you sure you want to leave this page?",
            onConfirm: ()=> {
                navigate(navigateTo);
                setHasUnsavedData(false);
            },
        });
    }

    
    return <>
        <Button variant='contained' className='mt-5' onClick={handleClick} >
            { icon }
            { label }
        </Button>
    </>
}