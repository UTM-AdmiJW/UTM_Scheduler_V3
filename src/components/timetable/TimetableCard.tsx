import { Button, Card, CardActionArea, CardActions, CardContent } from "@mui/material";

import { BsFillTrashFill, BsTable } from 'react-icons/bs';

import type { ITimetable } from "../../model/ITimetable";



interface ITimetableCardProps {
    timetable: ITimetable;
};


export default function TimetableCard({ timetable }: ITimetableCardProps) {

    
    const onDelete = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> )=> {
        e.stopPropagation();
    }



    return <>
        <Card variant='outlined'>
        <CardActionArea>
            <CardContent>
                <div className='flex items-center'>
                    <BsTable className='mr-4 text-2xl min-w-max' />
                    <p className='text-2xl font-medium'>{timetable.timetableName}</p>
                </div>

                <table className="table-auto my-3 text-gray-400">
                <tbody>
                    <tr>
                        <td className='pr-3 font-medium align-top'>Created: </td>
                        <td>{ timetable.createdDate.toDateString() }</td>
                    </tr>
                    <tr>
                        <td className='pr-3 font-medium align-top'>Modified: </td>
                        <td>{ timetable.lastModifiedDate.toDateString() }</td>
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

            <CardActions className="justify-end">
                <Button 
                    variant="contained" 
                    color='error' 
                    size='small'
                    onClick={ onDelete }
                    onMouseDown={ (e)=> e.stopPropagation() }
                >
                    <BsFillTrashFill className='mr-2' />
                    Delete
                </Button>
            </CardActions>  
        </CardActionArea>  
        </Card>
    </>
}