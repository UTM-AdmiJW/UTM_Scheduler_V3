
import { Box } from "@mui/material";
import { Control } from "react-hook-form";
import HookFormTextField from "../../components/form/HookFormTextField";

import type { IEditableCourse } from "../../model/domain/IEditableCourse";



interface IEditableCourseInfoEditProps {
    control: Control<IEditableCourse, any>;
}


export default function EditableCourseInfoEdit({
    control
}: IEditableCourseInfoEditProps) {


    return <>
    <Box className='my-3'>
        {/* Course Name */}
        <HookFormTextField
            hookFormProps={{
                control,
                name: 'courseName',
            }}
            textFieldProps={{
                label: 'Course Name',
                fullWidth: true,
            }}
        />
        <Box className="my-4" />

        <Box className='flex gap-3'>
            {/* Course Code */}
            <HookFormTextField
                hookFormProps={{
                    control,
                    name: 'courseCode'
                }}
                textFieldProps={{
                    label: 'Course Code',
                    fullWidth: true,
                    size: 'small'
                }}
            />
            
            {/* Section no */}
            <HookFormTextField
                hookFormProps={{
                    control,
                    name: 'sectionNo',
                }}
                textFieldProps={{
                    label: 'Section No',
                    type: 'number',
                    fullWidth: true,
                    size: 'small'
                }}
            />
        </Box>

        <Box className="my-4" />

        <HookFormTextField
            hookFormProps={{
                control,
                name: 'lecturer',
            }}
            textFieldProps={{
                label: 'Lecturer',
                fullWidth: true,
                size: 'small'
            }}
        />
    </Box>
    </>
}