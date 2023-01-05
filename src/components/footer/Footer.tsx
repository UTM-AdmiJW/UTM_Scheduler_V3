import { Container, Grid, Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';

import { AiFillGithub, AiFillPhone, AiFillMail } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return <>
        <footer>
        <Box className='bg-primary text-white'>
            <Container>

                <Grid container spacing={4} mx-auto width="100%">
                    <Grid item xs={12} sm={6} gap-3 >
                        <Box className='flex items-center gap-3 p-3'>
                            <ImLocation2 className='text-xl' />
                            <span>UTM Skudai, Johor Bahru, Malaysia</span>
                        </Box>
                        <Box className='flex items-center gap-3 p-3'>
                            <AiFillPhone className='text-xl'/>
                            <span>+60 7-553 5000</span>
                        </Box>
                        <Box className='flex items-center gap-3 p-3'>
                            <AiFillMail className='text-xl'/>
                            <span>utm.my</span>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box borderBottom={1}>
                            UTM Timetable Generator V3
                        </Box>
                        <Box>
                            <List disablePadding>
                                <ListItem disablePadding>
                                    <ListItemButton LinkComponent={Link} href="/">
                                    <ListItemText primary='Home' />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton LinkComponent={Link} href="">
                                    <ListItemText primary='About' />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                        <Box borderBottom={1}>
                            Subscribe us
                        </Box>
                        {/* @todo: Add externel Link
                                Add another tsx to export the button??*/}
                        <Box>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Facebook">
                                <FaFacebook  />
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Instagram">
                                <FaInstagram />
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Twitter">
                                <FaTwitter />
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Github">
                               <AiFillGithub />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>


                <Box className='text-center py-3'>
                    <span> UTM Timetable Generator V3 &reg; {new Date().getFullYear()} </span>
                </Box>
            </Container>
        </Box>
        </footer>
    </>
}