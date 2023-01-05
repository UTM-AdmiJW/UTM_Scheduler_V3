import type { IJadualSubjek_RuangDTO } from "./IJadualSubjek_RuangDTO";


export interface IJadualSubjek_Combine {
    kod_subjek: string;
    id_jws: string;
    seksyen: number;
    masa_mula: number;
    masa_tamat: number;
    hari: number;
    ruang: IJadualSubjek_RuangDTO;
}