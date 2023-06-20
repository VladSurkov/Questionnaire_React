import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import UserPageForm from '../../Components/UserPageForm/UserPageForm';
import {useNavigate} from 'react-router-dom';

import './UserPage.scss';

const UserPage = observer(() => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [forms, setForms] = useState([]);
    const UPDATE_MS = 60000;

    const updateForms = () => {
        store
            .getAllForms()
            .then((result) => {
                setForms(result);
            })
            .catch((e) => console.log(e));

        // const rawForms =
        //     '[\
        //     {\
        //         "formId": "1061d3cb-183d-4c03-a67e-6f8df008735f",\
        //         "creator": "Vlad Surkov",\
        //         "formTitle": "Тест по школе"\
        //     },\
        //     {\
        //         "formId": "28636da4-3694-41df-bc71-af9dd8430616",\
        //         "creator": "Vlad Surkov",\
        //         "formTitle": "Самый лучший спорт"\
        //     },\
        //     {\
        //         "formId": "07adc9ad-ccb7-45cf-8434-ce2b1d9a9d85",\
        //         "creator": "Anton Kolich",\
        //         "formTitle": "Самые лучшие автомобили в мире"\
        //     }\
        // ]';
        // const forms_data = JSON.parse(rawForms);

        // return forms_data;
    };

    useEffect(() => {
        updateForms();

        const interval = setInterval(() => {
            updateForms();
            console.log('update');
        }, UPDATE_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="UserPage">
            {forms.map((form) => {
                return UserPageForm({
                    formId: form.formId,
                    formCreator: form.creator,
                    formTitle: form.formTitle,
                    navigate: navigate,
                });
            })}
        </div>
    );
});

export default UserPage;
