
import { Paper } from "@mui/material";
import InfoTooltipButton from "../../components/form/InfoTooltipButton";



export interface IExportConfigurationCard {
    title: string;
    children: React.ReactNode;

    tooltip?: string;
}



export default function ExportConfigurationCard ({
    title,
    children,
    tooltip,
}: IExportConfigurationCard ) {

    return <>
        <Paper variant='outlined' className='p-3 flex flex-col justify-between'>
            <p className='text-md font-medium mb-5'>
                { title }
                {
                    tooltip && 
                    <InfoTooltipButton tooltip={tooltip} /> 
                }
            </p>
            
            { children }
        </Paper>
    </>
}