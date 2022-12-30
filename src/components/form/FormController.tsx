import { cloneElement } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';


// A reusable react-hook form controller wrapper.
// To prevent long codes like this:
//
// <Controller
//     name='name'
//     control={control}
//     defaultValue=''
//     render={({ field }) =>
//         <TextField {...field} id="name" label="Name" variant="outlined" size='small' fullWidth />
//     }
// />
//
// We can use this wrapper to shorten the code:
//
// <FormController name='name' control={control} defaultValue='' >
//     <TextField id="name" label="Name" variant="outlined" size='small' fullWidth />
// </FormController>



interface IFormControllerProps<T> extends UseControllerProps<T & FieldValues> {
    children: React.ReactElement;
}


export default function FormController<T>({ children, ...props }: IFormControllerProps<T>) {
    const { field, fieldState: { error} } = useController(props);
    
    return cloneElement(children as React.ReactElement, { 
        ...field,
        error: error !== undefined,
        helperText: error?.message
    });
}