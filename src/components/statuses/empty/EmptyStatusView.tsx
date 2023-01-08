import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { TbMoodEmpty } from "react-icons/tb";


export interface IEmptyProps {
    message : string;
    children? : React.ReactNode;
}


export default function EmptyStatusView({ message, children }: IEmptyProps) {

    return <>
        <Paper variant='outlined' className='py-9'>
            <Box className='text-gray-500 text-center'>
                <TbMoodEmpty className='text-5xl m-auto mb-3' />
                <p className='text-xl'>{ message }</p>
            </Box>

            { children }
        </Paper>
    </>
}