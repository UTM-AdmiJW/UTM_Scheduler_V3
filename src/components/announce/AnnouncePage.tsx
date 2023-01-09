import { Accordion, Container, Paper, Typography } from "@mui/material";
import { GrAnnounce } from 'react-icons/gr';
import Update from "./Update";

export default function AnnouncePage() {
    return <>
    
        <Container className='py-7'>
            <Typography className='mb-5 flex items-center text-2xl sm:text-3xl font-light'>
                <GrAnnounce className='mr-2 inline'/>
                Announcement
            </Typography>

            <Paper variant="outlined" className='p-3 mb-2 flex flex-wrap gap-3'>

            </Paper>

            {
                
            }
            <Paper 
                    className='p-5 mb-5 grid gap-5 ' 
                    variant='outlined' 
                    sx={{ gridTemplateColumns: 'repeat( auto-fit )' }}
                >   
                    <Update />
             </Paper>
        </Container>
    </>;
}