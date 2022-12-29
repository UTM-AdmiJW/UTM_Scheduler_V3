import { Button, Divider } from "@mui/material";

import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaUserGraduate } from 'react-icons/fa';

import { useDialog } from "../../hooks/useDialog";

import LoginDialog from "../login/LoginDialog";


export default function Profile() {
    const { openDialog } = useDialog();


    const onLoginButtonClick = () => openDialog(<LoginDialog />);



    return <div className='px-5 my-2'>
        
        {/* Info */}
        <div className='flex gap-3 items-center mb-3'>
            <FaUserGraduate className='mr-1' fontSize="xx-large" />

            <div className='flex flex-col'>
                <p className='font-bold'>Muhammad Ahmad bin Zamizi</p>
                <p className='text-sm mt-2'>
                    <span className='font-bold'>Student</span>
                    <span className='mx-1'>|</span>
                    <span>A20EC0151</span>
                </p>
            </div>
        </div>

        <Divider className='my-4' />

        {/* Login/Logout */}
        <Button variant='contained' size='small' fullWidth className='mb-2'>
            <AiOutlineLogout className='mr-2' fontSize='large' />
            Logout
        </Button>

        <Button 
            variant='contained' 
            size='small' 
            fullWidth
            onClick={onLoginButtonClick}
        >
            <AiOutlineLogin className='mr-2' fontSize='large' />
            Login
        </Button>

    </div>

}