import { ILayerInjection } from "../ILayerInjection";


// Meant to be inherited by all Theme layer interfaces
export interface IThemeLayer {
    injection?: ILayerInjection;
}