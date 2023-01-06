import { Box } from "@mui/material";

import { MdOutlineError } from 'react-icons/md';



export interface IErrorPageProps {
    title?: string;
    message?: string;
}



export default function ErrorPage ({
    title = "Error",
    message = "An error had occurred.",
}: IErrorPageProps) {

    return <>
        <Box className='flex flex-col items-center p-6'>
            <p className='text-2xl mb-2 font-medium text-red-500 text-center'>{title}</p>
            <p className='text-lg text-gray-400 font-extralight mb-6 text-center'>{message}</p>

            <MdOutlineError className='text-5xl text-red-500 mb-4' />
        </Box>
    </>
}