import { useState } from "react";
import { ListItemIcon, MenuItem, Menu, ListItemText, Divider, IconButton } from "@mui/material";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';

import Profile from "./Profile";


export default function NavbarMobileMenu() {
    const [anchorElem, setAnchorElem] = useState<null | HTMLElement>(null);


    const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElem(event.currentTarget);
    }

    const onCloseMenu = () => {
        setAnchorElem(null);
    }




    return <>

        {/* Open Menu Button */}
        <IconButton
            size="large"
            aria-label="open menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color='inherit'
            onClick={onOpenMenu}
            className='sm:hidden'
        >
            <MoreVertIcon />
        </IconButton>


        <Menu 
            open={ anchorElem !== null }
            onClose={ onCloseMenu }
            anchorEl={ anchorElem }
        >
            <Profile />
            
            <Divider />

            <MenuItem>
                <ListItemIcon>
                    <NotificationsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Announcements</ListItemText>
            </MenuItem>

            <MenuItem>
                <ListItemIcon>
                    <HelpIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Tutorial</ListItemText>
            </MenuItem>
        </Menu>

    
    </>;
}