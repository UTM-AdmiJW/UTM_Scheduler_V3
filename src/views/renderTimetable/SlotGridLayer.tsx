import { Layer, Rect } from "react-konva";

import type { ITimetableGrid } from "../../model/render/ITimetableGrid";
import type { IThemeSlotGridLayer } from "../../model/render/theme/IThemeSlotGridLayer";


interface ISlotGridLayerProps {
    timetableGrid: ITimetableGrid,
    slotGridLayerTheme: IThemeSlotGridLayer,
}


export default function SlotGridLayer({
    timetableGrid,
    slotGridLayerTheme
}: ISlotGridLayerProps) {

    const { slots } = timetableGrid;

    const {
        stripBgColors,
        injection
    } = slotGridLayerTheme;

    const { pre = null, post = null } = injection ?? {};


    
    return <>
        <Layer>
            { pre }

            {/* Slot grids */}
            {
                Object.entries(slots).map( ([dayOfWeek, strip], i) => {
                    return Object.entries(strip).map( ([time, { startX, startY, width, height }]) => {
                        return <Rect
                            key={dayOfWeek + " " + time}
                            fill={stripBgColors[i % stripBgColors.length]}
                            x={startX}
                            y={startY}
                            width={width}
                            height={height}
                            preventDefault={false}
                        />
                    })
                })
            }

            { post }
        </Layer>
    </>

}