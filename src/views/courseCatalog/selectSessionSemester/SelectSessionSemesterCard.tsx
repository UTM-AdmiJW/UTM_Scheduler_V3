import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";


import { useCourseCatalog } from "../../../hooks/useCourseCatalog";
import { useAlert } from "../../../hooks/useAlert";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";
import type { ISesiSemesterDTO } from "../../../model/DTO/ISesiSemesterDTO";

import { AiTwotoneCalendar } from "react-icons/ai";



export default function SelectSessionSemesterCard({ sessionSemester }: { sessionSemester: ISesiSemesterDTO }) {
    
    const { setCourseCatalog } = useCourseCatalog();
    const { alertSuccess } = useAlert();

    const handleSelectSessionSemester = () => {
        setCourseCatalog(prev => {
            return {
                ...prev,
                sessionSemester: sessionSemester,
                progress: CourseCatalogProgress.SELECT_SUBJECT
            };
        });
        alertSuccess(`Selected ${sessionSemester.sesi} Semester ${sessionSemester.semester}`);
    }



    return <>
        <Card variant="outlined">
        <CardActionArea onClick={handleSelectSessionSemester}>

            <Box className='bg-blue-500 rounded p-3 text-white flex items-center'>
                <Typography className='font-extralight'>
                    {sessionSemester.sesi} Semester {sessionSemester.semester}
                </Typography>
            </Box>

            <CardContent>
                <Typography className='text-gray-500 font-light text-xs flex items-center'>
                    <AiTwotoneCalendar className='inline mr-2' fontSize='small' />
                    {sessionSemester.tarikh_mula} to {sessionSemester.tarikh_tamat}
                </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </>
}