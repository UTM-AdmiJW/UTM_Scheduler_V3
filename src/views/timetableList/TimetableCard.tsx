import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardActions, CardContent } from "@mui/material";

import { BsFillTrashFill, BsTable } from 'react-icons/bs';

import type { ITimetable } from "../../model/domain/ITimetable";

import { useAlert } from "../../hooks/useAlert";
import { useDialog } from "../../hooks/useDialog";

import { deleteTimetable } from "../../redux/timetableSlice";



interface ITimetableCardProps {
    timetable: ITimetable;
};


export default function TimetableCard({ timetable }: ITimetableCardProps) {
    const { alertSuccess } = useAlert();
    const { openConfirmDialog } = useDialog();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onClick = ()=> {
        navigate(`/timetable/${timetable.id}`);
    }
    

    const onDelete = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> )=> {
        e.stopPropagation();

        openConfirmDialog(
            `Delete Timetable`,
            `Are you sure you want to delete '${timetable.timetableName}'?`, 
            ()=> {
                dispatch( deleteTimetable(timetable.id) );
                alertSuccess('Timetable deleted');
            }
        );
    }



    return <>
        <Card variant='outlined'>
        <CardActionArea className='p-1' onClick={onClick}>

            {/* Timetable details */}
            <CardContent>
                <div className='flex items-center mb-6'>
                    <BsTable className='mr-4 text-2xl min-w-max' />
                    <p className='text-2xl font-medium'>{timetable.timetableName}</p>
                </div>

                <table className="table-auto my-3 text-gray-400">
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

                <p className='text-gray-400'>
                    {timetable.description}
                </p>
            </CardContent>

            {/* Delete Button */}
            <CardActions className="justify-end">
                <Button 
                    variant="contained" 
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