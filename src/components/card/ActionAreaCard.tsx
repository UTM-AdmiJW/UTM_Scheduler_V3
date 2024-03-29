import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";


interface IActionAreaCardProps {
    title: React.ReactNode;
    preDataContent?: React.ReactNode;
    tableData?: { label: React.ReactNode, value: React.ReactNode }[];
    postDataContent?: React.ReactNode;

    onClick?: () => void;
}


export default function ActionAreaCard({
    title,
    preDataContent,
    tableData = [],
    postDataContent,

    onClick = () => {}
}: IActionAreaCardProps) {

    return <>
        <Card variant="outlined">
        <CardActionArea className='h-full flex flex-col justify-start items-stretch' onClick={onClick}>

            <Box className='bg-secondary rounded p-3 text-white flex items-center'>
                <Typography className='font-extralight'>{ title }</Typography>
            </Box>

            <CardContent>
                { preDataContent }

                <table className="table-auto text-xs">
                <tbody>
                    {
                        tableData.map((item, i) => (
                            <tr key={i}>
                                <td className='pr-3 pb-1 align-top font-medium'>{ item.label }: </td>
                                <td className='font-light'>{ item.value }</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
                
                { postDataContent }
            </CardContent>
        </CardActionArea>
        </Card>
    </>

}