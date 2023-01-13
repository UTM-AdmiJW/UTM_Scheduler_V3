import { Divider } from "@mui/material";
import ClashCheckReport from "./clashCheck/ClashCheckReport";
import ExportConfiguration from "./exportConfiguration/ExportConfiguration";
import ExportTimetable from "./exportTimetable/ExportTimetable";

import type { ITimetable } from "../../model/domain/ITimetable";

import { clashChecker } from "../../logic/clashCheck/clashChecker";



export default function ExportPanel({ timetable }: { timetable: ITimetable }) {

    const clashCheckReport = clashChecker(Object.values(timetable.editableCourses));


    return <>
        {/* Clash check and clash report */}
        <ClashCheckReport report={clashCheckReport} />
        <Divider className='my-5' />

        {/* Export configuration */}
        <ExportConfiguration timetable={timetable} />
        <Divider className='my-5' />

        {/* Generate timetable */}
        <ExportTimetable timetable={timetable} isClash={clashCheckReport.isClash} />
    </>
}