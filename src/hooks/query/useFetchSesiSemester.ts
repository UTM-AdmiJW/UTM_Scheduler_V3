import { useQuery } from "react-query";
import { useAlert } from "../useAlert";

import type { ISesiSemesterDTO } from "../../model/DTO/SesiSemester/ISesiSemesterDTO";



// Fetch function
export async function fetchSesiSemester(): Promise<ISesiSemesterDTO[]> {
    return fetch('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=sesisemester')
        .then(res => res.json());
}



// Hook
export function useFetchSesiSemester() {
    const { alertError } = useAlert();

    return useQuery<ISesiSemesterDTO[], Error>(
        'session/semester', 
        fetchSesiSemester,
        {
            onError: (error) => {
                alertError("Failed to retrieve session/semester data. See console for more details.");
                console.error(error);
            }
        }
    );
}