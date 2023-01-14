import type { IThemeBackgroundLayer } from "./IThemeBackgroundLayer";
import type { IThemeLabelGridLayer } from "./IThemeLabelGridLayer";
import type { IThemeSlotGridLayer } from "./IThemeSlotGridLayer";

import type { IThemeLabelLayer } from "./IThemeLabelLayer";

import type { IThemeClassesGridLayer } from "./IThemeClassesGridLayer";
import type { IThemeClassesLabelLayer } from "./IThemeClassesLabelLayer";



export interface ITimetableThemeReport {
    backgroundLayerTheme: IThemeBackgroundLayer;
    labelGridLayerTheme: IThemeLabelGridLayer;
    slotGridLayerTheme: IThemeSlotGridLayer;

    labelLayerTheme: IThemeLabelLayer;

    classesGridLayerTheme: IThemeClassesGridLayer;
    classesLabelLayerTheme: IThemeClassesLabelLayer,
}