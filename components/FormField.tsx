import React from 'react'
import { Controller, FieldValues, Control, Path } from 'react-hook-form'
import { FormItem, FormControl,FormMessage, FormLabel } from './ui/form'
import { Input } from './ui/input'

interface FormFieldProps<T extends FieldValues>{
    control : Control<T>;
    name : Path<T>;
    label : string;
    placeholder? : string;
    type?: 'text' | 'email' | 'password' | 'file' 
}

const FormField = ({control, name, label, placeholder, type="text"} : FormFieldProps<T> ) => (
    <Controller control={control} name={name} render={({field})=> 
    (
        <FormItem>
            <FormLabel className='label'>{label}</FormLabel>
            <FormControl>
              <Input className='input' placeholder={placeholder} {...field} type={type} />
            </FormControl>
            <FormMessage />
          </FormItem>
    )}
          
      />
)

export default FormField