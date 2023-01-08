import { Box } from "@mui/material";
import Loader from "./Loader";



export interface ILoadingStatusViewProps {
    title?: string;
    message?: string;
}




export default function LoadingStatusView ({
    title = "Loading",
    message = "Retrieving data from the server...",
}: ILoadingStatusViewProps) {

    return <>
        <Box className='flex flex-col items-center p-6'>
            <p className='text-2xl mb-2 font-medium text-primary text-center'>{title}</p>
            <p className='text-lg text-gray-400 font-extralight mb-6 text-center'>{message}</p>

            <Loader />
        </Box>
    </>
}