import { Button, Container } from "@mui/material";


import Face6Icon from '@mui/icons-material/Face6';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Profile() {

    return <Container className='my-2'>
        
        {/* Info */}
        <div className='flex gap-3 items-center mb-3'>
            <Face6Icon className='mr-1' fontSize="large" />

            <div className='flex flex-col'>
                <p className='font-bold'>Muhammad Ahmad bin Zamizi</p>
                <p className='text-sm mt-2'>
                    <span className='font-bold'>Student</span>
                    <span className='mx-1'>|</span>
                    <span>A20EC0151</span>
                </p>
            </div>
        </div>

        {/* Login/Logout */}
        <Button variant='contained' size='small' fullWidth className='mb-2'>
            <LogoutIcon fontSize='small' className='mr-2' />
            Logout
        </Button>

        <Button variant='contained' size='small' fullWidth>
            <LoginIcon fontSize='small' className='mr-2' />
            Login
        </Button>

    </Container>

}