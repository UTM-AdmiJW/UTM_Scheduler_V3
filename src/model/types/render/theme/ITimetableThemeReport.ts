import { IThemeBackgroundLayer } from "./IThemeBackgroundLayer";
import { IThemeLabelGridLayer } from "./IThemeLabelGridLayer";
import { IThemeLabelLayer } from "./IThemeLabelLayer";
import { IThemeSlotGridLayer } from "./IThemeSlotGridLayer";



export interface ITimetableThemeReport {
    backgroundLayerTheme: IThemeBackgroundLayer;
    labelGridLayerTheme: IThemeLabelGridLayer;
    slotGridLayerTheme: IThemeSlotGridLayer;

    labelLayerTheme: IThemeLabelLayer;
}