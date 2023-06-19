import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Select = ({ name, label, options, error, touched }) => {
    const isError = touched && error;

    return (
        <>
            <div className="SignUp__select">
                <label htmlFor={name}>{label}</label>
                <Field
                    name={name}
                    as="select"
                    id={name}
                    className={isError ? 'errored' : ''}
                >
                    <option value="">Не обрано</option>
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </Field>
            </div>

            <ErrorMessage
                className="error"
                name={name}
                component="div"
            />
        </>
    );
};

export default Select;
