import { useState } from "react";
import { IconButton, Tooltip, Menu } from "@mui/material";


import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import FaceIcon from '@mui/icons-material/Face';
import Profile from "./Profile";


export default function NavbarMenu() {
    const [profileAnchorElem, setProfileAnchorElem] = useState<null | HTMLElement>(null);


    const onOpenProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileAnchorElem(event.currentTarget);
    }

    const onCloseProfile = () => {
        setProfileAnchorElem(null);
    }




    return <>
        <div className='align-center hidden sm:flex'>
            {/* Tutorial */}
            <Tooltip title='Tutorial' arrow>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="tutorial"
                >
                    <HelpIcon />
                </IconButton>
            </Tooltip>

            {/* Announcements */}
            <Tooltip title='Announcements' arrow>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="announcements"
                >
                    <NotificationsIcon />
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
                    <FaceIcon />
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