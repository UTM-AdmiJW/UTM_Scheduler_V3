import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";
import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";

import type { SubmitHandler } from "react-hook-form/dist/types";
import type { ITimetable } from "../../model/domain/ITimetable";

import { Button, Tooltip } from "@mui/material";
import HookFormTextField from "../../components/form/HookFormTextField";
import SubmitEndAdornmentButton from "../../components/form/SubmitEndAdornmentButton";

import { AiFillEdit } from "react-icons/ai";




// The timetable name's display which also allows the user to edit it
export default function TimetableDescriptionEdit({ timetable }: { timetable: ITimetable }) {
    const { id, description } = timetable;
    
    const { timetableActions: { updateTimetableDescription } } = useTimetableRedux();
    const { alertSuccess } = useAlert();

    const [ isEditing, setIsEditing ] = useState(false);
    const { control, handleSubmit } = useForm<{ description: string }>({
        defaultValues: { description, }
    });


    const onSubmit: SubmitHandler<{ description: string }> = (data) => {
        setIsEditing(false);
        updateTimetableDescription({ timetableId: id, description: data.description });
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
                    fullWidth: true,
                    InputProps: { endAdornment: <SubmitEndAdornmentButton /> },
                }}
            />
            :
            <p className='text-gray-500'>
                { timetable.description }
                
                <Tooltip title='Edit description'>
                    <Button
                        color='secondary'
                        className='ml-2 align-top min-w-fit'
                        onClick={()=> setIsEditing(true)}
                    >
                        <AiFillEdit />
                    </Button>
                </Tooltip>
            </p>
        }
    </form>
    </>
}