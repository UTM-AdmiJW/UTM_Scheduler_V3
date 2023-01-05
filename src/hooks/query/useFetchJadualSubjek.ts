import { useQueries, UseQueryOptions } from "react-query";

import type { ISesiSemesterDTO } from "../../model/DTO/SesiSemester/ISesiSemesterDTO";
import type { ISubjekSeksyenDTO } from "../../model/DTO/SubjekSeksyen/ISubjekSeksyenDTO";
import type { IJadualSubjekDTO } from "../../model/DTO/JadualSubjek/IJadualSubjekDTO";
import type { IJadualSubjek_SeksyenJadual } from "../../model/DTO/JadualSubjek/IJadualSubjek_SeksyenJadual";



export function useFetchJadualSubjek(
    sesiSemester: ISesiSemesterDTO,
    subjekSeksyen: ISubjekSeksyenDTO
) {

    const queries = useQueries(
        subjekSeksyen.seksyen_list.map<UseQueryOptions<IJadualSubjek_SeksyenJadual, Error>>((seksyen) => ({
            queryKey: [sesiSemester.sesi_semester_id, seksyen.seksyen],
            queryFn: async ()=> {

                const url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?` +
                    `entity=jadual_subjek&` + 
                    `sesi=${ sesiSemester.sesi }&` + 
                    `semester=${ sesiSemester.semester }&` + 
                    `kod_subjek=${ subjekSeksyen.kod_subjek }&` + 
                    `seksyen=${ seksyen.seksyen }`;

                return fetch(url)
                    .then(res => res.json())
                    .then((data: IJadualSubjekDTO[]) => ({
                        seksyen: seksyen,
                        jadual: data
                    }));
            }
        }))
    );

    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);
    const isSuccess = queries.every(q => q.isSuccess);

    return { isLoading, isError, isSuccess, queries };
}