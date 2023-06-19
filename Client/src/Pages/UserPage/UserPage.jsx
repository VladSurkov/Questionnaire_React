import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../../index';

import './UserPage.scss';


const Form = (formId, creator, formTitle) => {
    const navigate = useNavigate();
    const goToForm = () => navigate({
        pathname: '/form',
        search: `?formId=${formId}`,
    });

    return (
        <div className="form">
            <div className="form__title">{formTitle}</div>
            <div className="from__creator">{creator}</div>
            <button onClick={goToForm()}>Open Form</button>
        </div>
    )
}


const UserPage = () => {
    const { store } = useContext(Context);
    const [forms, setForms] = useState();
    const UPDATE_MS = 10000;

    const getForms = () => {
        // const forms = store.getAllForms();

        const rawForms = '[\
            {\
                "formId": "1061d3cb-183d-4c03-a67e-6f8df008735f",\
                "creator": "Vlad Surkov",\
                "formTitle": "Тест по школе"\
            },\
            {\
                "formId": "28636da4-3694-41df-bc71-af9dd8430616",\
                "creator": "Vlad Surkov",\
                "formTitle": "Самый лучший спорт"\
            },\
            {\
                "formId": "07adc9ad-ccb7-45cf-8434-ce2b1d9a9d85",\
                "creator": "Anton Kolich",\
                "formTitle": "Самые лучшие автомобили в мире"\
            }\
        ]';
        const forms = JSON.parse(rawForms);

        return (
            <>
                {forms.map(form => (
                    Form(form.formId, form.creator, form.formTitle)
                ))}
            </>
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setForms(getForms());
        }, UPDATE_MS);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="content">
            {forms}
        </div>
    )
}

export default UserPage;