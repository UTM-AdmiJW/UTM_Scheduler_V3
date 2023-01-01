import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";

import type { SubmitHandler } from "react-hook-form/dist/types";
import type { ITimetable } from "../../model/domain/ITimetable";

import { Button } from "@mui/material";
import HookFormTextField from "../../components/form/HookFormTextField";
import SubmitEndAdornmentButton from "../../components/form/SubmitEndAdornmentButton";

import { AiFillEdit } from "react-icons/ai";

import { updateTimetableName } from "../../redux/timetableSlice";




// The timetable name's display which also allows the user to edit it
export default function TimetableNameEdit({ timetable }: { timetable: ITimetable }) {
    const { id, timetableName } = timetable;
    
    const dispatch = useDispatch();
    const { alertSuccess } = useAlert();

    const [ isEditing, setIsEditing ] = useState(false);
    const { control, handleSubmit } = useForm<{ timetableName: string }>({
        defaultValues: { timetableName, }
    });


    const onSubmit: SubmitHandler<{ timetableName: string }> = (data) => {
        setIsEditing(false);
        dispatch( updateTimetableName({ id, timetableName: data.timetableName }));
        alertSuccess('Timetable name updated');
    }


    return <>
    <form onSubmit={handleSubmit(onSubmit)}>
        {
            isEditing?
            <HookFormTextField
                hookFormProps={{
                    name: 'timetableName',
                    control,
                    defaultValue: timetableName,
                    rules: { required: 'Required' },
                }}
                textFieldProps={{
                    id: 'timetableName',
                    label: 'Timetable Name',
                    variant: 'outlined',
                    fullWidth: true,
                    required: true,
                    InputProps: { endAdornment: <SubmitEndAdornmentButton /> },
                }}
            />
            :
            <h1 className='text-2xl sm:text-3xl font-medium mb-4'>
                { timetable.timetableName }

                <Button 
                    color='secondary' 
                    className='ml-2 align-top min-w-fit' 
                    onClick={()=> setIsEditing(true)}
                >
                    <AiFillEdit />
                </Button>
            </h1>
        }
    </form>
    </>
}