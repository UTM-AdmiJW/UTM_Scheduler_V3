import { Text } from "react-konva";

import type { IGridDimension } from "../../model/render/IGridDimension";
import type { ITextStyle } from "../../model/render/theme/ITextStyle";



interface IThemedTextProps {
    gridDimension: IGridDimension,
    style: ITextStyle,
    textPadding: number,
    fontSize: number,
    text: string,

    align?: "left" | "center" | "right",
    verticalAlign?: "top" | "middle" | "bottom",

    preventDefault?: boolean,
}



export default function ThemedText({
    gridDimension,
    style,
    textPadding,
    fontSize,
    text,

    align = "center",
    verticalAlign = "middle",
    preventDefault = false,
}: IThemedTextProps) {

    return <>
        <Text
            x={ gridDimension.startX }
            y={ gridDimension.startY }
            width={ gridDimension.width }
            height={ gridDimension.height }

            fontFamily={ style.fontFamily }
            fill={ style.color }
            fontStyle={ style.fontStyle }
            textDecoration={ style.textDecoration }
            lineHeight={ style.lineHeight }
            strokeColor={ style.strokeColor }
            strokeWidth={ style.strokeWidth }
            shadowColor={ style.shadowColor }
            shadowBlur={ style.shadowBlur }
            shadowOffsetX={ style.shadowOffsetX }
            shadowOffsetY={ style.shadowOffsetY }

            padding={ textPadding }
            fontSize={ fontSize }
            
            text={ text }
            align={ align }
            verticalAlign={ verticalAlign }

            preventDefault={ preventDefault }
        />
    </>
}