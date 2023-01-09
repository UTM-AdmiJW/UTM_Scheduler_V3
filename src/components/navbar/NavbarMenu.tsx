import { useState } from "react";
import { IconButton, Tooltip, Menu } from "@mui/material";


import { AiFillNotification } from 'react-icons/ai';
import { MdHelpCenter } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


import Profile from "./Profile";


export default function NavbarMenu() {
    const [profileAnchorElem, setProfileAnchorElem] = useState<null | HTMLElement>(null);


    const onOpenProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileAnchorElem(event.currentTarget);
    }

    const onCloseProfile = () => {
        setProfileAnchorElem(null);
    }

    const navigate = useNavigate();




    return <>
        <div className='align-center hidden sm:flex'>
            {/* Tutorial */}
            <Tooltip title='Tutorial' arrow>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="tutorial"

                >
                    <MdHelpCenter fontSize='x-large' />
                </IconButton>
            </Tooltip>

            {/* Announcements */}
            <Tooltip title='Announcements' arrow>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="announcements"
                    onClick={ () => navigate('/announcements') }
                >
                    <AiFillNotification fontSize='x-large' />
                </IconButton>
            </Tooltip>

            {/* Profile */}
            <Tooltip title='Profile' arrow>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="profile"
                    onClick={ onOpenProfile }
                >
                    <FaUserCircle fontSize='x-large' />
                </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Menu 
                open={ profileAnchorElem !== null }
                onClose={ onCloseProfile }
                anchorEl={ profileAnchorElem }
            >
                <Profile />
            </Menu>
        </div>
    </>
}