import React from 'react';
import {ErrorMessage, useField} from 'formik';
import './TextInput.scss';

const TextInput = ({...props}) =>{

    const [field, meta] = useField(props);
    const isError =  meta.touched && meta.error;

    return(
        <>
            <input {...props} {...field} className={isError ? "errored" : ''}/> 
            
            <ErrorMessage 
                className="error" 
                component="div"
                {...props}/>
        </>
    )
};

export default TextInput;