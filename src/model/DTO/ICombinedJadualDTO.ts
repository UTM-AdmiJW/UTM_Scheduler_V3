import { IJadualRuangDTO } from "./IJadualRuangDTO";


export interface ICombinedJadualDTO {
    kod_subjek: string;
    id_jws: string;
    seksyen: number;
    masa_mula: number;
    masa_tamat: number;
    hari: number;
    ruang: IJadualRuangDTO;
}