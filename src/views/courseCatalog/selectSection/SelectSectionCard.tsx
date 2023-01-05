import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import TimeInfo from "../../../components/time/TimeInfo";

import { useCourseCatalog } from "../../../hooks/useCourseCatalog";
import { useAlert } from "../../../hooks/useAlert";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";
import type { IJadualSubjek_SeksyenJadual } from "../../../model/DTO/JadualSubjek/IJadualSubjek_SeksyenJadual";

import { combineIJadualDTO } from "../../../util/timetableUtils";



export default function SelectSectionCard({ seksyen, jadual }: IJadualSubjek_SeksyenJadual) {
    
    const { setCourseCatalog } = useCourseCatalog();
    const { alertSuccess } = useAlert();

    // From a list of IJadualSubjek, combine them into IJadualSubjek_Combine that includes time start and end
    const combinedSchedules = combineIJadualDTO(jadual);

    const handleSelectSection = () => {
        setCourseCatalog(prev => {
            return {
                ...prev,
                seksyen: seksyen,
                jadualSubjek: combinedSchedules,
                progress: CourseCatalogProgress.CONFIRMATION
            };
        });
        alertSuccess(`Selected Section ${ seksyen.seksyen }`);
    }



    return <>
        <Card variant="outlined">
        <CardActionArea className='h-full flex flex-col justify-start items-stretch' onClick={handleSelectSection}>

            <Box className='bg-blue-500 rounded p-3 text-white flex items-center'>
                <Typography className='font-extralight'>
                    Section {seksyen.seksyen}
                </Typography>
            </Box>

            <CardContent>

                <table className="table-auto font-extralight text-xs mb-3">
                <tbody>
                    <tr>
                        <td className='pr-3 align-top'>Lecturer: </td>
                        <td>{ seksyen.pensyarah || 'N/A' }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 align-top'>Capacity: </td>
                        <td>{ seksyen.bil_pelajar || 'N/A' }</td>
                    </tr>
                </tbody>
                </table>

                {
                    combinedSchedules.map((time) => (
                        <TimeInfo 
                            key={time.id_jws}
                            beginTime={time.masa_mula} 
                            endTime={time.masa_tamat} 
                            dayOfWeek={time.hari} 
                            venue={time.ruang.nama_ruang_singkatan} 
                        />
                    ))
                }

            </CardContent>
        </CardActionArea>
        </Card>
    </>
}