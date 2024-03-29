import type { ISubjekSeksyen_SeksyenDTO } from "./ISubjekSeksyen_SeksyenDTO";


export interface ISubjekSeksyenDTO {
    nama_subjek: string;
    bil_pelajar: number;
    bil_pensyarah: number;
    bil_seksyen: number;
    kod_subjek: string;
    seksyen_list: ISubjekSeksyen_SeksyenDTO[];
}