import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { MdOutlineError, MdArrowBack } from "react-icons/md";


// Not found component used when timetable does not exist
export default function TimetableNotFound() {
    const navigate = useNavigate();

    return <>
        <Container className='py-7'>
            <div className='flex flex-col items-center justify-center h-full'>
                <MdOutlineError className='text-5xl mb-2 text-red-600' />
                <p className='text-2xl font-medium mb-2 text-red-600'>Timetable not found</p>
                <p className='text-center text-gray-500'>The timetable you are looking for does not exist.</p>
                
                <Button variant='contained' className='mt-5' onClick={()=> navigate('/')}>
                    <MdArrowBack className='mr-2' />
                    Go back
                </Button>
            </div>
        </Container>
    </>
}
