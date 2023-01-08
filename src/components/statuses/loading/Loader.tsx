// Loader inspired by https://codepen.io/chrysokitty/pen/ZbxwJX


import { Box } from "@mui/material";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { GiAbstract080 } from "react-icons/gi";


import '../../../style/loader.css';


export default function Loader() {
    return <>
        <Box className='flex text-3xl text-primary'>
            <BsChevronLeft className='loader-left' />
            <GiAbstract080 className='loader-center' />
            <BsChevronRight className='loader-right' />
        </Box>
    </>
}