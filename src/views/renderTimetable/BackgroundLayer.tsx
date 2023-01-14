
import { Group, Rect } from "react-konva";

import type { ITimetableDimensionReport } from "../../model/types/render/ITimetableDimensionReport";
import type { ITimetableThemeReport } from "../../model/types/render/theme/ITimetableThemeReport";


interface IBackgroundLayerProps {
    timetableDimensionReport: ITimetableDimensionReport,
    timetableThemeReport: ITimetableThemeReport,
}


export default function BackgroundLayer({
    timetableDimensionReport,
    timetableThemeReport
}: IBackgroundLayerProps) {

    const { width, height } = timetableDimensionReport;
    const { backgroundColor, injection } = timetableThemeReport.backgroundLayerTheme;
    const { pre = null, post = null } = injection ?? {};

    return <Group>
        { pre }

        <Rect
            fill={backgroundColor}
            width={width}
            height={height}
            x={0} y={0}
            preventDefault={false}
        />

        { post }
    </Group>;
}