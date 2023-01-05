import type { IJadualSubjek_RuangDTO } from "./IJadualSubjek_RuangDTO";


export interface IJadualSubjekDTO {
    kod_subjek: string;
    id_jws: string;
    seksyen: number;
    masa: number;
    hari: number;
    ruang: IJadualSubjek_RuangDTO;
}