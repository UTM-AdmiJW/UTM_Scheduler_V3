import { IJadualSubjek_Combine } from "../JadualSubjek/IJadualSubjek_Combine";
import { ISubjekSeksyen_SeksyenDTO } from "../SubjekSeksyen/ISubjekSeksyen_SeksyenDTO";
import type { IPelajarSubjekDTO } from "./IPelajarSubjekDTO";

export interface IPelajarSubjek_SeksyenJadualDTO {
    pelajarsubjek: IPelajarSubjekDTO;
    seksyen: ISubjekSeksyen_SeksyenDTO;
    jadual: IJadualSubjek_Combine[];
}