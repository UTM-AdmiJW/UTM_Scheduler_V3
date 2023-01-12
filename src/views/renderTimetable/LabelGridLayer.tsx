import { Layer, Rect } from "react-konva";

import type { ITimetableGridReport } from "../../model/types/render/ITimetableGridReport";
import type { ITimetableThemeReport } from "../../model/types/render/theme/ITimetableThemeReport";


interface ILabelGridLayerProps {
    timetableGrid: ITimetableGridReport,
    timetableThemeReport: ITimetableThemeReport
}


export default function LabelGridLayer({
    timetableGrid,
    timetableThemeReport
}: ILabelGridLayerProps) {

    const { dayOfWeekLabel, labelIndicator, timeLabel } = timetableGrid;

    const { 
        timeLabelColor, dayOfWeekLabelColor, 
        labelIndicatorDayOfWeekBgColor, labelIndicatorTimeBgColor,
        injection
    } = timetableThemeReport.labelGridLayerTheme;

    const { pre = null, post = null } = injection ?? {};


    
    return <>
        <Layer>
            { pre }

            {/* Day of Week Label Indicator */}
            <Rect
                fill={labelIndicatorDayOfWeekBgColor}
                x={ labelIndicator.dayOfWeek.startX }
                y={ labelIndicator.dayOfWeek.startY }
                width={ labelIndicator.dayOfWeek.width }
                height={ labelIndicator.dayOfWeek.height }
                preventDefault={false}
            />

            {/* Time Label Indicator */}
            <Rect
                fill={labelIndicatorTimeBgColor}
                x={ labelIndicator.time.startX }
                y={ labelIndicator.time.startY }
                width={ labelIndicator.time.width }
                height={ labelIndicator.time.height }
                preventDefault={false}
            />

            {/* Time labels */}
            {
                Object.entries(timeLabel)
                .map( ([time, { startX, startY, width, height }]) => {
                    return <Rect
                        key={time}
                        fill={timeLabelColor}
                        x={startX}
                        y={startY}
                        width={width}
                        height={height}
                        preventDefault={false}
                    />
                })
            }

            {/* Day of week labels */}
            {
                Object.entries(dayOfWeekLabel)
                .map( ([dayOfWeek, { startX, startY, width, height }]) => {
                    return <Rect
                        key={dayOfWeek}
                        fill={dayOfWeekLabelColor}
                        x={startX}
                        y={startY}
                        width={width}
                        height={height}
                        preventDefault={false}
                    />
                })
            }

            { post }
        </Layer>
    </>

}