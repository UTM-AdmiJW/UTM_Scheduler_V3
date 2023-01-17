import { IconButton, Tooltip, Menu } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiFillNotification, AiOutlineTable } from 'react-icons/ai';
import { MdHelpCenter } from 'react-icons/md';
import { FaUserCircle, FaSearchLocation } from 'react-icons/fa';


import Profile from "./Profile";


export default function NavbarMenu() {
    const [profileAnchorElem, setProfileAnchorElem] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();


    const handleOpenProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileAnchorElem(event.currentTarget);
    }

    const handleCloseProfile = () => {
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
                    onClick={ () => navigate('/tutorial') }
                >
                    <MdHelpCenter fontSize='x-large' />
                </IconButton>
            </Tooltip>

            {/* My Timetables */}
            <Tooltip title='My Timetables' arrow>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="my timetables"
                    onClick={ () => navigate('/timetable') }
                >
                    <AiOutlineTable fontSize='x-large' />
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

            {/* Venue Searcher */}
            <Tooltip title='Venue Searcher' arrow>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="venue-searcher"
                    onClick={ () => navigate('/venue') }
                >
                    <FaSearchLocation fontSize='x-large' />
                </IconButton>
            </Tooltip>

            {/* Profile */}
            <Tooltip title='Profile' arrow>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="profile"
                    onClick={ handleOpenProfile }
                >
                    <FaUserCircle fontSize='x-large' />
                </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Menu 
                open={ profileAnchorElem !== null }
                onClose={ handleCloseProfile }
                anchorEl={ profileAnchorElem }
            >
                <Profile />
            </Menu>
        </div>
    </>
}