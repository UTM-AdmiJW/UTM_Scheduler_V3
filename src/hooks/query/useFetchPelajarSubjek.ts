
import { useQuery } from "react-query";

import { useAlert } from "../useAlert";

import type { IPelajarSubjekDTO } from "../../model/DTO/PelajarSubjek/IPelajarSubjekDTO";


export function useFetchPelajarSubjek(no_matrik: string) {

    const { alertError } = useAlert();

    return useQuery<IPelajarSubjekDTO[], Error>(
        no_matrik,
        async () => {
            return fetch(
                `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi` +
                `?entity=pelajar_subjek&` +
                `no_matrik=${no_matrik}`
            )
            .then(res => res.json());
        }, {
            onError: (error) => {
                alertError("Failed to retrieve registered courses. See console for more details.");
                console.error(error);
            }
        }
    );
}