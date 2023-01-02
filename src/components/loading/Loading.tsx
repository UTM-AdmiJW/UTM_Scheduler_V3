import { Box } from "@mui/material";
import Loader from "./Loader";



export interface ILoadingProps {
    title?: string;
    message?: string;
}




export default function Loading ({
    title = "Loading",
    message = "Retrieving data from the server...",
}: ILoadingProps) {


    return <>
        <Box className='flex flex-col items-center'>
            <p className='text-2xl font-medium mb-1 text-primary'>{title}</p>
            <p className='text-lg text-gray-400 font-extralight mb-8'>{message}</p>

            <Loader />
        </Box>
    </>
}