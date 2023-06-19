import React from 'react'
import { useNavigate } from "react-router-dom";

const Form = (formId, creator, formTitle) => {
    // const navigate = useNavigate();
    // const goToForm = () => navigate({
    //     pathname: '/form',
    //     search: `?formId=${formId}`,
    // });
    const goToForm = () => {console.log(`${formId}`)};

    return (
        <div className="form" key={formId}>
            <div className="form__title">{formTitle}</div>
            <div className="from__creator">{creator}</div>
            <button onClick={goToForm()}>Open Form</button>
        </div>
    )
}

export default Form