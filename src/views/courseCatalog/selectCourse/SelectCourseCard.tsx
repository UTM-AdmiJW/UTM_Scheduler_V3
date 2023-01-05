import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useAlert } from "../../../hooks/useAlert";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";
import type { ISubjekSeksyenDTO } from "../../../model/DTO/SubjekSeksyen/ISubjekSeksyenDTO";

import { BsCode } from 'react-icons/bs';


export default function SelectCourseCard({ course }: { course: ISubjekSeksyenDTO }) {
    
    const { setCourseCatalog } = useCourseCatalogContext();
    const { alertSuccess, alertWarning } = useAlert();

    const handleSelectCourse = () => {
        // If no sections list, alert user and return
        if ( !(course.seksyen_list) || course.seksyen_list.length === 0 ) {
            alertWarning(`No section data found for ${course.kod_subjek} ${course.nama_subjek}`);
            return;
        }

        setCourseCatalog(prev => {
            return {
                ...prev,
                subjekSeksyen: course,
                progress: CourseCatalogProgress.SELECT_SECTION
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
                <Typography className='font-medium text-sm mb-3 flex items-center'>
                    <BsCode className='inline mr-1' />
                    {course.kod_subjek}
                </Typography>

                <table className="table-auto text-gray-400 font-extralight text-xs">
                <tbody>
                    <tr>
                        <td className='pr-3 align-top'>Total sections: </td>
                        <td>{ course.bil_seksyen || 'N/A' }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 align-top'>Total lecturers: </td>
                        <td>{ course.bil_pensyarah || 'N/A' }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 align-top'>Total students: </td>
                        <td>{ course.bil_pelajar || 'N/A' }</td>
                    </tr>
                </tbody>
                </table>
            </CardContent>
        </CardActionArea>
        </Card>
    </>
}