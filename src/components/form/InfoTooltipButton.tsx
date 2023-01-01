import { Tooltip, Button } from "@mui/material";
import { MdInfo } from "react-icons/md";



export default function InfoTooltipButton({ tooltip }: { tooltip: string }) {
    return <>
        <Tooltip title={tooltip} className='ml-1 align-top'>
            <Button size='small' variant='text' className='text-gray-500 min-w-min'>
                <MdInfo className='inline-block' />
            </Button>
        </Tooltip>
    </>
}