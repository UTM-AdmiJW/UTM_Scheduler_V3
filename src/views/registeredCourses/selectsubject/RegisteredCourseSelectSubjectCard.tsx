import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

import { useRegisteredCoursesContext } from "../../../hooks/context/useRegisteredCoursesContext";
import { useAlert } from "../../../hooks/useAlert";

import { RegisteredCoursesProgress } from "../../../enums/RegisteredCoursesProgress";
import type { IPelajarSubjekDTO } from "../../../model/DTO/PelajarSubjek/IPelajarSubjekDTO";

import { BsCode } from 'react-icons/bs';


export default function RegisteredCourseSelectSubjectCard({ course }: { course: IPelajarSubjekDTO }) {
    
    const { setRegisteredCoursesState } = useRegisteredCoursesContext();
    const { alertSuccess, alertWarning } = useAlert();

    const handleSelectCourse = () => {
        setRegisteredCoursesState(prev => {
            return {
                ...prev,
                progress: RegisteredCoursesProgress.CONFIRMATION,
                selectedCourse: course
            };
        });
        alertSuccess(`Selected ${course.kod_subjek} - ${course.nama_subjek}`);
    }



    return <>
        <Card variant="outlined">
        <CardActionArea className='h-full flex flex-col justify-start items-stretch' onClick={handleSelectCourse}>

            <Box className='bg-blue-500 rounded p-3 text-white flex items-center'>
                <Typography className='font-extralight'>
                    {course.nama_subjek}
                </Typography>
            </Box>

            <CardContent>
                <table className="table-auto font-light text-xs">
                <tbody>
                    <tr>
                        <td className='pr-3 align-top'>Semester: </td>
                        <td>{ course.sesi + ' Sem ' + course.semester }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 align-top'>Code: </td>
                        <td>{ course.kod_subjek || 'N/A' }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 align-top'>Year: </td>
                        <td>{ course.tahun_kursus || 'N/A' }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 align-top'>Section: </td>
                        <td>{ course.seksyen || 'N/A' }</td>
                    </tr>
                </tbody>
                </table>

            </CardContent>
        </CardActionArea>
        </Card>
    </>
}