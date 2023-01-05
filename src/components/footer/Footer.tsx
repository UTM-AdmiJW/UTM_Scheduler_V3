import { Container, Grid, Box } from '@mui/material';
import { Icon, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import { AiFillGithub, AiFillPhone, AiFillMail } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return <>
        <footer>
        <Box className='bg-primary text-white'>
            <Container>

                <Grid container spacing={4} mx-auto width="100%">
                    <Grid item xs={12} sm={6} >
                        <Box className='flex items-center gap-3'>
                            <ImLocation2 className='text-xl' />
                            <span>UTM Skudai, Johor Bahru, Malaysia</span>
                        </Box>
                        <Box>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Phone">
                                <Icon component={AiFillPhone} fontSize='medium' />
                            </IconButton>
                            <span>+60 7-553 5000</span>
                        </Box>
                        <Box>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Email">
                                <Icon component={AiFillMail} fontSize='medium' />
                            </IconButton>
                            <span>utm.my</span>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box borderBottom={1}>
                            UTM Timetable Generator V3
                        </Box>
                        <Box>
                            <Link to="/">Home</Link>
                        </Box>
                        <Box>
                            <Link to="/about">About</Link>
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
                                <Icon component={FaFacebook} fontSize='medium' />
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Instagram">
                                <Icon component={FaInstagram} fontSize='medium' />
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Twitter">
                                <Icon component={FaTwitter} fontSize='medium' />
                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="Github">
                                <Icon component={AiFillGithub} fontSize='medium' />
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