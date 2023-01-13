import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";

import type { IClashReport } from "../../../model/types/clashCheck/IClashReport"

import { MdExpandMore, MdOutlineError, MdCheck } from "react-icons/md";
import { RiSwordLine } from "react-icons/ri";
import ClashCheckInstanceCard from "./ClashCheckInstanceCard";

interface IClashCheckReportProps {
    report: IClashReport;
}



export default function ClashCheckReport({
    report
}: IClashCheckReportProps) {

    return <>
        <Typography className='font-light text-2xl my-3'>
            <RiSwordLine className='inline-block mr-2' />
            Clash Checker
        </Typography>

        <Accordion>
            {
                report.isClash?
                <AccordionSummary expandIcon={<MdExpandMore className='text-white' />} className='bg-red-500'>
                    <Typography className='flex items-center text-white '>
                        <MdOutlineError className='mr-3' />
                        Clash detected. Expand to see details
                    </Typography>
                </AccordionSummary>
                :
                <AccordionSummary expandIcon={<MdExpandMore className='text-white' />} className='bg-green-500 text-white'>
                    <Typography className='flex items-center text-white'>
                        <MdCheck className='mr-3' />
                        No clash detected. You are good to go!
                    </Typography>
                </AccordionSummary>
            }

            {
                report.isClash &&
                <AccordionDetails>
                <Box
                    className='my-2 grid gap-2' 
                    sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 300px))' }}
                >
                    {
                        report.clashes.map((clash, index) => (
                            <ClashCheckInstanceCard
                                key={index}
                                clash={clash}
                                index={index + 1}
                            />
                        ))
                    }
                </Box>
                </AccordionDetails>
            }
        </Accordion>
    </>
}