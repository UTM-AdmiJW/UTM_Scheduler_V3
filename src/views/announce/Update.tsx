import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from "@mui/material";
import { IAnnouncement } from "../../model/domain/IAnnouncement";

interface IAnnouncementProps {
    announce:IAnnouncement
}


export default function Update(
    {
       announce
    } : IAnnouncementProps
) {


    //give the array of the update, if null, return no update
    const updatelist = announce.update && announce.update.map((update, index) => <li key={index}>{update}</li>);

    return <>
    
        {/* One Component */}
            
        <Accordion className=''>
            <AccordionSummary className=''>
                <div className="min-w-full">
                    {/*Title of the component*/}
            <Box className='bg-red-800 text-white items-center pl-4'>
                <Typography variant='h2' className='font-light text-xl'>{announce.title}</Typography>
            </Box>
                <Typography variant='subtitle2' className='font-extralight pl-4 pt-2'>
                    {announce.date}
                </Typography>
            <Box className='p-4 pb-0'>
                <Typography variant="subtitle1" className=' text-m'>{announce.summary}</Typography>
                <Divider />

            </Box>
            </div>
            </AccordionSummary>
            {/*Details of the component*/}
            <AccordionDetails className="">
                <Box className='pl-4'>
                    {/*Content of the component*/
                    announce.content ?(
                        <Typography variant="subtitle2" className='text-m'>
                            {announce.content}
                            <br/>
                            </Typography>
                            
                    ):(
                        <span></span>
                    )}
                
                {/*Update of the component*/
                updatelist ? (
                    <ul className="list-disc list-inside font-light"><b>Update</b>{updatelist}</ul>
                ):(
                    <span>No update</span>
                )}
                </Box>
            </AccordionDetails>
            </Accordion>        

    </>
}