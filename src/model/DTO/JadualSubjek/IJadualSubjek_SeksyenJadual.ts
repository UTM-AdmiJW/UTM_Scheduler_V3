import type { ISubjekSeksyen_SeksyenDTO } from "../SubjekSeksyen/ISubjekSeksyen_SeksyenDTO";
import type { IJadualSubjekDTO } from "./IJadualSubjekDTO";


export interface IJadualSubjek_SeksyenJadual {
    seksyen: ISubjekSeksyen_SeksyenDTO,
    jadual: IJadualSubjekDTO[],
}