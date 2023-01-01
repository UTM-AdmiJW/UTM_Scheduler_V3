import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";

import type { SubmitHandler } from "react-hook-form/dist/types";
import type { ITimetable } from "../../model/ITimetable";

import { Button } from "@mui/material";
import HookFormTextField from "../../components/form/HookFormTextField";
import SubmitEndAdornmentButton from "../../components/form/SubmitEndAdornmentButton";

import { AiFillEdit } from "react-icons/ai";

import { updateTimetableDescription } from "../../redux/timetableSlice";




// The timetable name's display which also allows the user to edit it
export default function TimetableDescriptionEdit({ timetable }: { timetable: ITimetable }) {
    const { id, description } = timetable;
    
    const dispatch = useDispatch();
    const { alertSuccess } = useAlert();

    const [ isEditing, setIsEditing ] = useState(false);
    const { control, handleSubmit } = useForm<{ description: string }>({
        defaultValues: { description, }
    });


    const onSubmit: SubmitHandler<{ description: string }> = (data) => {
        setIsEditing(false);
        dispatch( updateTimetableDescription({ id, description: data.description }));
        alertSuccess('Timetable description updated');
    }


    return <>
    <form onSubmit={handleSubmit(onSubmit)}>
        {
            isEditing?
            <HookFormTextField
                hookFormProps={{
                    name: 'description',
                    control,
                    defaultValue: description,
                }}
                textFieldProps={{
                    id: 'description',
                    label: 'Description',
                    variant: 'outlined',
                    size: 'small',
                    multiline: true,
                    rows: 3,
                    fullWidth: true,
                    InputProps: { endAdornment: <SubmitEndAdornmentButton /> },
                }}
            />
            :
            <p className='text-gray-400 font-light'>
                { timetable.description }
                
                <Button
                    color='secondary'
                    className='ml-2 align-top min-w-fit'
                    onClick={()=> setIsEditing(true)}
                >
                    <AiFillEdit />
                </Button>
            </p>
        }
    </form>
    </>
}