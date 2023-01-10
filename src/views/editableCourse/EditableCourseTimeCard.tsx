import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import HookFormSelect from "../../components/form/HookFormSelect";
import HookFormTextField from "../../components/form/HookFormTextField";

import { Control, UseFormGetValues, } from "react-hook-form";

import { BsFillTrashFill } from "react-icons/bs";

import { DayOfWeekMenuItems } from "../../enums/";
import { IEditableCourse } from "../../model/domain/IEditableCourse";

import { getMenuItemsfromIMenuItems, hoursMenuItem } from "../../util/menuItemUtils";



interface IEditableCourseTimeCardProps {
    control: Control<IEditableCourse, any>;
    getValues: UseFormGetValues<IEditableCourse>;
    index: number;
    deleteFn: ()=> void;
}

export default function EditableCourseTimeCard({
    control,
    getValues,
    index,
    deleteFn
}: IEditableCourseTimeCardProps) {


    const validateBeginTime = ()=> {
        const beginTime = getValues(`timeList.${index}.beginTime`);
        const endTime = getValues(`timeList.${index}.endTime`);
        if (beginTime >= endTime) return "Begin time must be before end time";
    }


    return <>
        <Card variant="outlined">
        <CardContent>
            <HookFormSelect
                hookFormProps={{
                    control,
                    name: `timeList.${index}.dayOfWeek`,
                }}
                textFieldProps={{
                    label: 'Day of Week',
                    fullWidth: true,
                    size: 'small'
                }}
                menuItems={ getMenuItemsfromIMenuItems(DayOfWeekMenuItems) }
            />

            <Box className='flex gap-2 my-3'>
                <HookFormSelect
                    hookFormProps={{
                        control,
                        name: `timeList.${index}.beginTime`, 
                        rules: { validate: validateBeginTime }
                    }}
                    textFieldProps={{
                        label: 'Begin Time',
                        fullWidth: true,
                        size: 'small'
                    }}
                    menuItems={ hoursMenuItem }
                />

                <HookFormSelect
                    hookFormProps={{
                        control,
                        name: `timeList.${index}.endTime`,
                        rules: { validate: validateBeginTime }
                    }}
                    textFieldProps={{
                        label: 'End Time',
                        fullWidth: true,
                        size: 'small'
                    }}
                    menuItems={ hoursMenuItem }
                />
            </Box>

            <HookFormTextField
                hookFormProps={{
                    control,
                    name: `timeList.${index}.venue`,
                }}
                textFieldProps={{
                    label: 'Venue',
                    fullWidth: true,
                    size: 'small'
                }}
            />
        </CardContent>

        <CardActions className='justify-end'>
            <Button variant="contained" color='error' size="small" onClick={ deleteFn }>
                <BsFillTrashFill className='mr-2' />
                Delete
            </Button>
        </CardActions>
        </Card>
    </>
}