import axios from "axios";

import { useQuery } from "react-query";
import { useAlert } from "../useAlert";

import type { IRuangDTO } from "../../model/DTO/Ruang/IRuangDTO";



// Fetch function
export async function fetchRuang(): Promise<IRuangDTO[]> {
    return axios
        .get<IRuangDTO[]>('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=ruang')
        .then((res) => res.data);
}



// Hook
export function useFetchRuang() {
    const { alertError } = useAlert();

    return useQuery<IRuangDTO[], Error>(
        'ruang', 
        fetchRuang,
        {
            onError: (error) => {
                alertError("Failed to retrieve venue data. See console for more details.");
                console.error(error);
            }
        }
    );
}