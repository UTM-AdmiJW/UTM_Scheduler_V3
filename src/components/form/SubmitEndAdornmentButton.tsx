import { Button } from "@mui/material";
import { MdDone } from "react-icons/md";


// A end adornment submit button that appears at the end of a form field.
// Like:
// [ Field Here         [ Submit ] ]   <---- The submit button
export default function SubmitEndAdornmentButton() {
    return <>
        <Button color='success' type='submit' className='min-w-fit'>
            <MdDone className='text-lg'/>
        </Button>
    </>
}