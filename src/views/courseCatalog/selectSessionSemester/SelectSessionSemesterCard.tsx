import { Card, CardActionArea, CardContent, Typography } from "@mui/material";


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
        <Card>
        <CardActionArea onClick={handleSelectSessionSemester}>
            <CardContent>
                <Typography className='font-medium text-lg'>
                    {sessionSemester.sesi}
                </Typography>

                <Typography className='text-gray-400 font-light text-sm mb-3'>
                    Semester {sessionSemester.semester}
                </Typography>

                <Typography className='text-gray-400 font-light text-xs flex items-center'>
                    <AiTwotoneCalendar className='inline mr-2' fontSize='small' />
                    {sessionSemester.tarikh_mula} to {sessionSemester.tarikh_tamat}
                </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </>
}