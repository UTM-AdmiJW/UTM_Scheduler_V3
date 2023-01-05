import { useQuery } from "react-query";
import { useAlert } from "../useAlert";

import type { ISesiSemesterDTO } from "../../model/DTO/SesiSemester/ISesiSemesterDTO";


export function useFetchSesiSemester() {
    const { alertError } = useAlert();


    return useQuery<ISesiSemesterDTO[], Error>(
        'session/semester', 
        async () => {
            return fetch('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=sesisemester')
                .then(res => res.json());
        }, {
            onError: (error) => {
                alertError("Failed to retrieve session/semester data. See console for more details.");
                console.error(error);
            }
        }
    );
}