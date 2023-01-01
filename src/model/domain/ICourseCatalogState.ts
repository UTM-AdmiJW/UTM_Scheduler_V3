import { CourseCatalogProgress } from "../../enums/CourseCatalogProgress";


export interface ICourseCatalogState {
    progress: CourseCatalogProgress;
    session: string;
    semester: number;
    subject: any;
    section: any;
}