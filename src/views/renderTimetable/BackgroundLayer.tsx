import { Layer, Rect } from "react-konva";

import type { ITimetableDimensionReport } from "../../model/render/ITimetableDimensionReport";
import type { IThemeBackgroundLayer } from "../../model/render/theme/IThemeBackgroundLayer";


interface IBackgroundLayerProps {
    timetableDimensionReport: ITimetableDimensionReport,
    backgroundLayerTheme: IThemeBackgroundLayer,
}


export default function BackgroundLayer({
    timetableDimensionReport,
    backgroundLayerTheme
}: IBackgroundLayerProps) {

    const { width, height } = timetableDimensionReport;
    const { backgroundColor, injection } = backgroundLayerTheme;
    const { pre = null, post = null } = injection ?? {};

    return <>
        <Layer>
            { pre }

            <Rect
                fill={backgroundColor}
                width={width}
                height={height}
                x={0} y={0}
                preventDefault={false}
            />

            { post }
        </Layer>
    </>

}