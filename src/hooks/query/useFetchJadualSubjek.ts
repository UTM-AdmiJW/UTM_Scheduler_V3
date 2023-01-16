import axios from "axios";

import { useQueries, useQuery, UseQueryOptions } from "react-query";
import { useAlert } from "../useAlert";

import type { IJadualSubjekDTO } from "../../model/DTO/JadualSubjek/IJadualSubjekDTO";


interface IFetchJadualSubjekParams {
    sesi: string;
    semester: number;
    kod_subjek: string;
    seksyen: number;
}


export function fetchJadualSubjek({ sesi, semester, kod_subjek, seksyen }: IFetchJadualSubjekParams) {
    return async (): Promise<IJadualSubjekDTO[]> => {
        const url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?` +
                    `entity=jadual_subjek&` + 
                    `sesi=${ sesi }&` + 
                    `semester=${ semester }&` + 
                    `kod_subjek=${ kod_subjek }&` + 
                    `seksyen=${ seksyen }`;

        return axios
            .get<IJadualSubjekDTO[]>(url)
            .then((res)=> res.data);
    };
}


export function useFetchJadualSubjek({ sesi, semester, kod_subjek, seksyen }: IFetchJadualSubjekParams) {
    const { alertError } = useAlert();

    return useQuery<IJadualSubjekDTO[], Error>(
        [sesi, semester, kod_subjek, seksyen],
        fetchJadualSubjek({ sesi, semester, kod_subjek, seksyen }),
        {
            onError: (error) => {
                alertError("Failed to retrieve session/semester data. See console for more details.");
                console.error(error);
            }
        }
    );
}



// To fetch multiple section's schedule at once
export function useFetchJadualSubjekMany(params: IFetchJadualSubjekParams[]) {
    const queries = useQueries(
        params.map<UseQueryOptions<IJadualSubjekDTO[], Error>>((param) => ({
            queryKey: [param.sesi, param.semester, param.kod_subjek, param.seksyen],
            queryFn: fetchJadualSubjek(param)
        }))
    );
    
    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);
    const isSuccess = queries.every(q => q.isSuccess);
    const error = queries.find(q => q.isError)?.error;
    const data = !isLoading && !isError ? queries.map(q => q.data) : undefined;
    
    return { isLoading, isError, isSuccess, error, queries, data };
}

