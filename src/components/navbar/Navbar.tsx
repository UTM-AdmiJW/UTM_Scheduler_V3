import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";


import NavbarMenu from "./NavbarMenu";
import NavbarMobileMenu from "./NavbarMobileMenu";

export default function Navbar() {

    return <AppBar position='sticky'>
        <Toolbar>
            {/* Logo and Name of application */}
            <Link to='/' className='flex items-center'>
                <img src="/img/utm logo.png" alt="UTM Logo" className='mr-2 h-9 w-9' />

                <Typography className='grow font-bold text-lg sm:text-xl' component="div">
                    UTM Scheduler V3
                </Typography>
            </Link>

            {/* To separate Left and Right */}
            <div className='grow'></div>

            {/* Mobile screen menu */}
            <NavbarMobileMenu />

            {/* Large screen menu */}
            <NavbarMenu />
        </Toolbar>
    </AppBar>
}