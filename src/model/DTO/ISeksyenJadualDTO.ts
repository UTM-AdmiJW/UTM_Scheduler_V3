import { IJadualDTO } from "./IJadualDTO";
import { ISeksyenDTO } from "./ISeksyenDTO";


export interface ISeksyenJadualDTO {
    seksyen: ISeksyenDTO,
    jadual: IJadualDTO[],
}