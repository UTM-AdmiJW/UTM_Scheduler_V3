import { ListItemIcon, MenuItem, Menu, ListItemText, Divider, IconButton } from "@mui/material";
import Profile from "./Profile";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineMenu, AiOutlineClose, AiFillNotification, AiOutlineTable } from 'react-icons/ai';
import { MdHelpCenter } from 'react-icons/md';
import { FaSearchLocation } from 'react-icons/fa';



export default function NavbarMobileMenu() {
    const [anchorElem, setAnchorElem] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();


    const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElem(event.currentTarget);
    }

    const onCloseMenu = () => {
        setAnchorElem(null);
    }

    const handleNavigate = (path: string) => {
        navigate(path);
        onCloseMenu();
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

            <MenuItem onClick={()=> handleNavigate('/tutorial')}>
                <ListItemIcon>
                    <MdHelpCenter fontSize="large" />
                </ListItemIcon>
                <ListItemText>Tutorial</ListItemText>
            </MenuItem>

            <MenuItem onClick={()=> handleNavigate('/timetable')}>
                <ListItemIcon>
                    <AiOutlineTable fontSize="large" />
                </ListItemIcon>
                <ListItemText>My Timetables</ListItemText>
            </MenuItem>

            <MenuItem onClick={()=> handleNavigate('/venue')}>
                <ListItemIcon>
                    <FaSearchLocation fontSize="large" />
                </ListItemIcon>
                <ListItemText>Venue Search</ListItemText>
            </MenuItem>

            <MenuItem onClick={()=> handleNavigate('/announcements')}>
                <ListItemIcon>
                    <AiFillNotification fontSize="large" />
                </ListItemIcon>
                <ListItemText>Announcements</ListItemText>
            </MenuItem>

        </Menu>

    
    </>;
}