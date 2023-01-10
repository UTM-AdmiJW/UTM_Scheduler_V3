
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
                rules: { required: 'Course Name is empty' }
            }}
            textFieldProps={{
                label: 'Course Name',
                fullWidth: true,
                required: true,
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
                    rules: { 
                        required: 'Section No is empty', 
                        min: { value: 0, message: 'Section no cannot be less than 0'}, 
                        max: { value: 99, message: 'Section no cannot be greater than 99' }
                    }
                }}
                textFieldProps={{
                    label: 'Section No',
                    type: 'number',
                    fullWidth: true,
                    required: true,
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