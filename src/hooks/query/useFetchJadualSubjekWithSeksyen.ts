import axios from "axios";

import { useQueries, useQuery, UseQueryOptions } from "react-query";

import type { IJadualSubjekDTO } from "../../model/DTO/JadualSubjek/IJadualSubjekDTO";
import type { IJadualSubjek_SeksyenJadual } from "../../model/DTO/JadualSubjek/IJadualSubjek_SeksyenJadual";
import type { ISubjekSeksyen_SeksyenDTO } from "../../model/DTO/SubjekSeksyen/ISubjekSeksyen_SeksyenDTO";

import { useAlert } from "../useAlert";


interface IFetchJadualSubjekWithSeksyenParams {
    sesi: string;
    semester: number;
    kod_subjek: string;
    seksyen: ISubjekSeksyen_SeksyenDTO;
}


// Similar to useFetchJadualSubjek, but this one returns an array of IJadualSubjek_SeksyenJadual

export function fetchJadualSubjekWithSeksyen({ sesi, semester, kod_subjek, seksyen }: IFetchJadualSubjekWithSeksyenParams) {
    return async (): Promise<IJadualSubjek_SeksyenJadual> => {
        const url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?` +
                    `entity=jadual_subjek&` + 
                    `sesi=${ sesi }&` + 
                    `semester=${ semester }&` + 
                    `kod_subjek=${ kod_subjek }&` + 
                    `seksyen=${ seksyen.seksyen }`;

        return axios
            .get<IJadualSubjekDTO[]>(url)
            .then((res)=> res.data)
            .then((jadual) => ({ jadual, seksyen }) );
    };
}


export function useFetchJadualSubjekWithSeksyen({ sesi, semester, kod_subjek, seksyen }: IFetchJadualSubjekWithSeksyenParams) {
    const { alertError } = useAlert();

    return useQuery<IJadualSubjek_SeksyenJadual, Error>(
        [sesi, semester, kod_subjek, seksyen],
        fetchJadualSubjekWithSeksyen({ sesi, semester, kod_subjek, seksyen }),
        {
            onError: (error) => {
                alertError("Failed to retrieve session/semester data. See console for more details.");
                console.error(error);
            }
        }
    );
}



// To fetch multiple section's schedule at once
export function useFetchJadualSubjekManyWithSeksyen(params: IFetchJadualSubjekWithSeksyenParams[]) {
    const queries = useQueries(
        params.map<UseQueryOptions<IJadualSubjek_SeksyenJadual, Error>>((param) => ({
            queryKey: [param.sesi, param.semester, param.kod_subjek, param.seksyen],
            queryFn: fetchJadualSubjekWithSeksyen(param)
        }))
    );
    
    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);
    const isSuccess = queries.every(q => q.isSuccess);
    const error = queries.find(q => q.isError)?.error;
    const data = !isLoading && !isError ? queries.map(q => q.data) : undefined;
    
    return { isLoading, isError, isSuccess, error, queries, data };
}

