import { useQuery } from "react-query";

import { useAlert } from "../useAlert";

import type { ISesiSemesterDTO } from "../../model/DTO/SesiSemester/ISesiSemesterDTO";
import type { ISubjekSeksyenDTO } from "../../model/DTO/SubjekSeksyen/ISubjekSeksyenDTO";


export function useFetchSubjekSeksyen(sesiSemester: ISesiSemesterDTO) {

    const { sesi, semester } = sesiSemester;

    const { alertError } = useAlert();

    return useQuery<ISubjekSeksyenDTO[], Error>(
        ['courses', sesi, semester], 
        async () => {
            return fetch(
                `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?` +
                `entity=subjek_seksyen&` + 
                `sesi=${sesi}&` +
                `semester=${semester}`
            )
            .then(res => res.json());
        }, {
            onError: (error) => {
                alertError("Failed to retrieve course data. See console for more details.");
                console.error(error);
            }
        }
    );
}