import axios from "axios";

import { useQuery } from "react-query";
import { useAlert } from "../useAlert";

import type { ISubjekSeksyenDTO } from "../../model/DTO/SubjekSeksyen/ISubjekSeksyenDTO";



interface IFetchSubjekSeksyenParams {
    sesi: string;
    semester: number;
}


// Fetch function with currying
export function fetchSubjekSeksyen({ sesi, semester }: IFetchSubjekSeksyenParams) {
    return async (): Promise<ISubjekSeksyenDTO[]> => {
        const url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?` +
                    `entity=subjek_seksyen&` + 
                    `sesi=${sesi}&` +
                    `semester=${semester}`;

        return axios
            .get(url)
            .then((res) => res.data);
    };
}



// Hook
export function useFetchSubjekSeksyen({ sesi, semester }: IFetchSubjekSeksyenParams) {
    const { alertError } = useAlert();

    return useQuery<ISubjekSeksyenDTO[], Error>(
        ['courses', sesi, semester], 
        fetchSubjekSeksyen({ sesi, semester }),
        {
            onError: (error) => {
                alertError("Failed to retrieve course data. See console for more details.");
                console.error(error);
            }
        }
    );
}