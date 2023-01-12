import { Layer } from "react-konva";
import ThemedText from "../../components/render/ThemedText";

import type { ITimetableGridReport } from "../../model/render/ITimetableGridReport";
import type { ITimetableTextSizingReport } from "../../model/render/ITimetableTextSizingReport";
import type { ITimetableThemeReport } from "../../model/render/theme/ITimetableThemeReport";

import { convertDayOfWeekToString } from "../../util/timeUtils";
import { convert24HourTo12Hour } from "../../util/timeUtils";





interface ILabelLayerProps {
    timetableGrid: ITimetableGridReport,
    timetableThemeReport: ITimetableThemeReport,
    timetableTextSizingReport: ITimetableTextSizingReport,
}


export default function LabelLayer({
    timetableGrid,
    timetableThemeReport,
    timetableTextSizingReport,
}: ILabelLayerProps) {

    const { dayOfWeekLabel, labelIndicator, timeLabel } = timetableGrid;

    const { 
        labelIndicatorDayOfWeek, labelIndicatorTime,
        labelDayOfWeek, labelTime,
        injection
    } = timetableThemeReport.labelLayerTheme;

    const {
        textPadding,
        fontSizeDayOfWeekLabelIndiciator,
        fontSizeTimeLabelIndiciator,
        fontSizeDayOfWeekLabel,
        fontSizeTimeLabel,
    } = timetableTextSizingReport;

    const { pre = null, post = null } = injection ?? {};


    
    return <>
        <Layer>
            { pre }

            {/* Day of week label indicator */}
            <ThemedText
                gridDimension={ labelIndicator.dayOfWeek }
                style={ labelIndicatorDayOfWeek }
                textPadding={ textPadding }
                fontSize={ fontSizeDayOfWeekLabelIndiciator }
                text="Day of Week"
            />

            {/* Time label indicator */}
            <ThemedText
                gridDimension={ labelIndicator.time }
                style={ labelIndicatorTime }
                textPadding={ textPadding }
                fontSize={ fontSizeTimeLabelIndiciator }
                text="Time"
            />

            {/* Day of Week labels */}
            {
                Object.entries(dayOfWeekLabel).map(([dayOfWeek, gridDimension]) => {
                    return <ThemedText
                        key={ dayOfWeek }
                        gridDimension={ gridDimension }
                        style={ labelDayOfWeek }
                        textPadding={ textPadding }
                        fontSize={ fontSizeDayOfWeekLabel }
                        text={ convertDayOfWeekToString( parseInt(dayOfWeek) ) }
                    />
                })
            }

            {/* Time labels */}
            {
                Object.entries(timeLabel).map(([time, gridDimension]) => {
                    const t = parseInt(time);

                    return <ThemedText
                        key={ t }
                        gridDimension={ gridDimension }
                        style={ labelTime }
                        textPadding={ textPadding }
                        fontSize={ fontSizeTimeLabel }
                        text={`${convert24HourTo12Hour(t)}\n▼\n${convert24HourTo12Hour(t+1)}`}
                    />
                })
            }

            { post }
        </Layer>
    </>

}