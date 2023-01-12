import type { ITimetableThemeReport } from "../../../../model/types/render/theme/ITimetableThemeReport";
import { backgroundLayer } from "./backgroundLayer";
import { labelGridLayer } from "./labelGridLayer";
import { labelLayer } from "./labelLayer";
import { slotGridLayer } from "./slotGridLayer";



export const utmTheme: ITimetableThemeReport = {
    backgroundLayerTheme: backgroundLayer,
    labelGridLayerTheme: labelGridLayer,
    slotGridLayerTheme: slotGridLayer,
    labelLayerTheme: labelLayer,
}