
import { Box, Button, Paper, Typography } from "@mui/material";
import HookFormTextField from "../../components/form/HookFormTextField";

import { Control, useFieldArray } from "react-hook-form";

import type { IEditableCourse } from "../../model/domain/IEditableCourse";

import { useAlert } from "../../hooks/useAlert";

import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import { EmptyStatusView } from "../../components/statuses";

import createBlankTime from "../../model/modelGenerators/createBlankTime";



interface IEditableCourseTimeEdit {
    control: Control<IEditableCourse, any>;
}


export default function EditableCourseTimeEdit({
    control
}: IEditableCourseTimeEdit) {

    const { alertSuccess } = useAlert();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "timeList",
    });


    const handleAddTime = ()=> {
        alertSuccess('Added a new class');
        append(createBlankTime());
    }




    return <>
    <Box className='my-5'>
        <Typography className='text-2xl font-light flex items-center mb-3'>
            <AiOutlineClockCircle className='mr-2' />
            Classes
        </Typography>

        {/* Button controls */}
        <Box className='flex gap-3 mb-3'>
            <Button variant='outlined' size='small' onClick={ handleAddTime }>
                <AiOutlinePlus className='mr-2' />
                Add
            </Button>
        </Box>

        {/* List of times */}
        {
            fields.length === 0?
            <EmptyStatusView message='This course has no classes yet'>
                <Box className='text-center mt-3'>
                    <Button variant='outlined' size='small' onClick={ handleAddTime } className='mt-3'>
                        <AiOutlinePlus className='mr-2' /> Add a class
                    </Button>
                </Box>
            </EmptyStatusView>
            :
            <Paper
                className='p-5 mb-5 grid gap-5' 
                variant='outlined' 
                sx={{ gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 325px) )' }}
            >
                {
                    fields.map((time, index)=> {
                        return <>{ time.beginTime } - { time.endTime }</>
                    })
                }
            </Paper>
        }

    </Box>
    </>
}