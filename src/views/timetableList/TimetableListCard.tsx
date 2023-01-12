import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

import { BsFillTrashFill, BsTable } from 'react-icons/bs';

import type { ITimetable } from "../../model/domain/ITimetable";

import { useAlert } from "../../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../../hooks/useDialog";
import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";



interface ITimetableListCardProps {
    timetable: ITimetable;
};


export default function TimetableListCard({ timetable }: ITimetableListCardProps) {
    const { alertSuccess } = useAlert();
    const { openConfirmDialog } = useDialog();
    const { timetableActions: { deleteTimetable } } = useTimetableRedux();
    const navigate = useNavigate();


    const onClick = ()=> {
        navigate(`/timetable/${timetable.id}`);
    }
    

    const onDelete = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> )=> {
        e.stopPropagation();

        openConfirmDialog({
            title: `Delete Timetable`,
            message: `Are you sure you want to delete '${timetable.timetableName}'?`,
            onConfirm: ()=> {
                deleteTimetable(timetable.id);
                alertSuccess('Timetable deleted');
            }
        });
    }



    return <>
        <Card variant='outlined'>
        <CardActionArea className='h-full flex flex-col justify-start items-stretch' onClick={onClick}>
            
            <Box className='bg-secondary rounded p-4 text-white flex items-center'>
                <BsTable className='mr-3 min-w-max text-xl' />
                <Typography className='font-extralight text-xl'>{timetable.timetableName}</Typography>
            </Box>

            <CardContent>

                <table className="table-auto">
                <tbody>
                    <tr>
                        <td className='pr-3 font-medium align-top'>Created: </td>
                        <td>{ timetable.createdDate }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 font-medium align-top'>Modified: </td>
                        <td>{ timetable.lastModifiedDate }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 font-medium align-top'>By: </td>
                        <td>{ timetable.createdBy.name }</td>
                    </tr>
                </tbody>
                </table>

                <Typography className='text-gray-400 mt-4 font-light'>
                    {timetable.description}
                </Typography>

            </CardContent>

            {/* Delete Button */}
            <CardActions className="justify-end">
                <Button 
                    variant="outlined" 
                    component='span'
                    color='error' 
                    size='small'
                    onClick={ onDelete }
                    onMouseDown={ (e)=> e.stopPropagation() }
                    onTouchStart={ (e)=> e.stopPropagation() }
                >
                    <BsFillTrashFill className='mr-2' />
                    Delete
                </Button>
            </CardActions>

        </CardActionArea>  
        </Card>
    </>
}