import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import UserPageForm from '../../Components/UserPageForm/UserPageForm';
import {useNavigate} from 'react-router-dom';
import Header from '../../Components/Header/Header';

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
        <>
            <Header />
            <div className='UserPage'>
                {forms.map((form) => {
                    return UserPageForm({
                        formId: form.formId,
                        formCreator: form.creator,
                        formTitle: form.formTitle,
                        navigate: navigate,
                    });
                })}
            </div>
        </>
    );
});

export default UserPage;
