import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import Form from './Form';
import { observer } from 'mobx-react';

import './UserPage.scss';


const UserPage = () => {
    const { store } = useContext(Context);
    const [forms, setForms] = useState();
    const UPDATE_MS = 60000;

    const getForms = () => {
        // const forms_data = store.getAllForms();

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
        const forms_data = JSON.parse(rawForms);

        return (
            <>
                {forms_data.map(form => (
                    Form(form.formId, form.creator, form.formTitle)
                ))}
            </>
        )
    }

    useEffect(() => {
        setForms(getForms());

        const interval = setInterval(() => {
            setForms(getForms());
            console.log("update");
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