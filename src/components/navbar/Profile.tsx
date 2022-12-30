import { Button, Divider } from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/studentSlice";

import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaUserGraduate } from 'react-icons/fa';

import { useDialog } from "../../hooks/useDialog";
import { useAlert } from "../../hooks/useAlert";

import LoginDialog from "../../views/login/LoginDialog";


export default function Profile() {
    const { alertSuccess } = useAlert();
    const { openDialog } = useDialog();
    const dispatch = useDispatch();
    const { isLoggedIn, student } = useSelector((state: RootState) => state.student);


    const onLoginButtonClick = () => {
        openDialog(<LoginDialog />);
    }

    const onLogoutButtonClick = () => {
        dispatch(logout());
        alertSuccess('Logout successful');
    };


    return <div className='px-5 my-2'>
        
        {/* Info */}
        <div className='flex gap-3 items-center mb-3'>
            <FaUserGraduate className='mr-1' fontSize="xx-large" />

            {
                isLoggedIn?
                <div className='flex flex-col'>
                    <p className='font-bold'>{ student.name }</p>
                    <p className='text-sm mt-2'>
                        <span className='font-bold'>Student</span>
                        <span className='mx-1'>|</span>
                        <span>{ student.matricNo }</span>
                    </p>
                </div>
                :
                <p className='font-bold'>
                    Not logged in
                </p>
            }
        </div>

        <Divider className='my-4' />

        {/* Login/Logout */}
        {
            isLoggedIn?
            <Button 
                variant='contained' 
                size='small' 
                className='mb-2'
                fullWidth 
                onClick={ onLogoutButtonClick }
            >
                <AiOutlineLogout className='mr-2' fontSize='large' />
                Logout
            </Button>
            :
            <Button 
                variant='contained' 
                size='small' 
                fullWidth
                onClick={ onLoginButtonClick }
            >
                <AiOutlineLogin className='mr-2' fontSize='large' />
                Login
            </Button>
        }
    </div>

}