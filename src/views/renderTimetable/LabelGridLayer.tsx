import { Layer, Rect } from "react-konva";

import type { ITimetableGrid } from "../../model/render/ITimetableGrid";
import type { IThemeLabelGridLayer } from "../../model/render/theme/IThemeLabelGridLayer";


interface ILabelGridLayerProps {
    timetableGrid: ITimetableGrid,
    labelGridLayerTheme: IThemeLabelGridLayer,
}


export default function LabelGridLayer({
    timetableGrid,
    labelGridLayerTheme
}: ILabelGridLayerProps) {

    const { dayOfWeekLabel, labelIndicator, timeLabel } = timetableGrid;

    const { 
        timeLabelColor, dayOfWeekLabelColor, 
        labelIndicatorDayOfWeekBgColor, labelIndicatorTimeBgColor,
        injection
    } = labelGridLayerTheme;

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