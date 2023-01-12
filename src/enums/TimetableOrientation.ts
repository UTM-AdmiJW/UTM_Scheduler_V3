import { IMenuItem } from "../model/types/menuItem/IMenuItem";


export enum TimetableOrientation {
    HORIZONTAL = 0,
    VERTICAL = 1,
};

export const TimetableOrientationMenuItems: IMenuItem<TimetableOrientation>[] = [
    { label: "Horizontal", value: TimetableOrientation.HORIZONTAL },
    { label: "Vertical", value: TimetableOrientation.VERTICAL }
];