
import { Box, Button, Typography } from "@mui/material";
import CardContainer from "../../components/card/CardContainer";
import EditableCourseTimeCard from "./EditableCourseTimeCard";

import type { IEditableCourse } from "../../model/domain/IEditableCourse";

import { Control, useFieldArray, UseFormGetValues } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";

import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";

import createBlankTime from "../../model/modelGenerators/createBlankTime";




interface IEditableCourseTimeEditProps {
    control: Control<IEditableCourse, any>;
    getValues: UseFormGetValues<IEditableCourse>;
}


export default function EditableCourseTimeEdit({
    control,
    getValues,
}: IEditableCourseTimeEditProps) {

    const { alertWarning, alertInfo } = useAlert();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "timeList",
    });



    const handleAddTime = ()=> {
        alertInfo('Added a new class');
        append(createBlankTime());
    }

    const handleDeleteTime = (index: number)=> {
        alertWarning('Deleted a class');
        remove(index);
    }


    const buttons = <>
        <Button variant='outlined' size='small' onClick={ handleAddTime }>
            <AiOutlinePlus className='mr-2' />
            Add
        </Button>
    </>;



    return <>
    <Box className='my-5'>
        <Typography className='text-2xl font-light flex items-center mb-3'>
            <AiOutlineClockCircle className='mr-2' />
            Classes
        </Typography>

        <CardContainer
            buttons={ buttons }
            data={ fields }
            containerProps={{ sx: { 
                gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 325px) )' 
            }}}
            cardRenderFn={(time, i, arr)=> (
                <EditableCourseTimeCard 
                    key={ i }
                    getValues={ getValues }
                    control={ control }
                    index={ i }
                    deleteFn={ ()=> handleDeleteTime(i) }
                />
            )}
        />
    </Box>
    </>
}