import { IJadualRuangDTO } from "./IJadualRuangDTO";


export interface IJadualDTO {
    kod_subjek: string;
    id_jws: string;
    seksyen: number;
    masa: number;
    hari: number;
    ruang: IJadualRuangDTO;
}