
import { useQuery } from "react-query";
import { useAlert } from "../useAlert";

import type { IPelajarSubjekDTO } from "../../model/DTO/PelajarSubjek/IPelajarSubjekDTO";


// Fetch function with currying
export function fetchPelajarSubjek(no_matrik: string) {
    return async (): Promise<IPelajarSubjekDTO[]> => {
        return fetch(
            `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi` +
            `?entity=pelajar_subjek&` +
            `no_matrik=${no_matrik}`
        )
        .then(res => res.json());
    };
}


// Hook
export function useFetchPelajarSubjek(no_matrik: string) {

    const { alertError } = useAlert();

    return useQuery<IPelajarSubjekDTO[], Error>(
        no_matrik,
        fetchPelajarSubjek(no_matrik),
        {
            onError: (error) => {
                alertError("Failed to retrieve registered courses. See console for more details.");
                console.error(error);
            }
        }
    );
}