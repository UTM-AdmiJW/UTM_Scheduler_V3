import { useState } from "react";
import { ListItemIcon, MenuItem, Menu, ListItemText, Divider, IconButton } from "@mui/material";

import { AiOutlineMenu, AiOutlineClose, AiFillNotification } from 'react-icons/ai';
import { MdHelpCenter } from 'react-icons/md';

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
            aria-label="open menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color='inherit'
            onClick={onOpenMenu}
            className='sm:hidden'
        >
            {
                anchorElem !== null?
                <AiOutlineClose />:
                <AiOutlineMenu />
            }
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
                    <AiFillNotification fontSize="large" />
                </ListItemIcon>
                <ListItemText>Announcements</ListItemText>
            </MenuItem>

            <MenuItem>
                <ListItemIcon>
                    <MdHelpCenter fontSize="large" />
                </ListItemIcon>
                <ListItemText>Tutorial</ListItemText>
            </MenuItem>
        </Menu>

    
    </>;
}