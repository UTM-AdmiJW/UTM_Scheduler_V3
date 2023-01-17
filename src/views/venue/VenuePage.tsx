import { Container, Typography } from "@mui/material";
import { ErrorStatusView, LoadingStatusView } from "../../components/statuses";
import CardContainer from "../../components/card/CardContainer";

import { useFetchRuang } from "../../hooks/query/useFetchRuang";

import type { IRuangDTO } from "../../model/DTO/Ruang/IRuangDTO";

import { FaSearchLocation } from "react-icons/fa";
import { stringEnumToIMenuItems } from "../../util/menuItemUtils";
import ActionAreaCard from "../../components/card/ActionAreaCard";


enum VenuePageSortOrder {
    NAME_ASC = "Name (A-Z)",
    NAME_DESC = "Name (Z-A)",
    TYPE_ASC = "Type (A-Z)",
    TYPE_DESC = "Type (Z-A)",
}



const searchFn = (data: IRuangDTO, search: string)=> {
    search = search.toLowerCase();

    return (
        data.nama_ruang?.toLowerCase().includes(search) ||
        data.jenis?.toLowerCase().includes(search) ||
        data.nama_ruang_singkatan?.toLowerCase().includes(search) ||
        data.kod_fakulti?.toLowerCase().includes(search)
    );
}


const sortFn = (a: IRuangDTO, b: IRuangDTO, sortOrder: VenuePageSortOrder)=> {
    if (sortOrder === VenuePageSortOrder.NAME_ASC)
        return a.nama_ruang.localeCompare(b.nama_ruang);
    else if (sortOrder === VenuePageSortOrder.NAME_DESC)
        return b.nama_ruang.localeCompare(a.nama_ruang);
    else if (sortOrder === VenuePageSortOrder.TYPE_ASC)
        return a.jenis?.localeCompare(b.jenis);
    return b.jenis?.localeCompare(a.jenis);
}



export default function VenuePage() {

    const { data, isLoading, error } = useFetchRuang();


    return <>
        <Container className="py-7">
            <Typography className="mb-5 flex items-center text-2xl sm:text-3xl font-light">
                <FaSearchLocation className="mr-2 inline" />
                Venue Search
            </Typography>

            { isLoading && <LoadingStatusView message='Retrieving venue...' /> }
            { error && <ErrorStatusView message="Cannot retrieve venue." /> }
            { 
                data && 
                <CardContainer
                    searchOptions={{ searchFn }}
                    data={ data }
                    containerProps={{ sx: { gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" } }}
                    sortOptions={{
                        sortMenuItems: stringEnumToIMenuItems(VenuePageSortOrder),
                        initialSortBy: VenuePageSortOrder.NAME_ASC,
                        sortFn
                    }}
                    cardRenderFn={(data)=> (
                        <ActionAreaCard
                            key={data.kod_ruang}
                            title={data.nama_ruang}
                            tableData={[
                                { label: "Abbreviation", value: data.nama_ruang_singkatan },
                                { label: "Code", value: data.kod_ruang },
                                { label: "Type", value: data.jenis },
                                { label: "Faculty", value: data.kod_fakulti },
                                { label: "Capacity", value: data.kapasiti },
                            ]}
                        />
                    )}
                />
            }

        </Container>
    </>
}