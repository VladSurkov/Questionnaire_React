import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import ReviewerPageForm from '../../Components/ReviewerPageForm/ReviewerPageForm';
import {useNavigate} from 'react-router-dom';

import './ReviewerPage.scss';
import Header from '../../Components/Header/Header';

const ReviewerPage = observer(() => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [forms, setForms] = useState([]);
    const UPDATE_MS = 60000;

    const updateForms = () => {
        store
            .getAllUserForms()
            .then((result) => {
                setForms(result);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        updateForms();

        const interval = setInterval(() => {
            updateForms();
        }, UPDATE_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="ReviewerPage">
            <Header/>
            {forms.map((form) => {
                return ReviewerPageForm({
                    userFormId: form.userFormId,
                    user: form.user,
                    titleForm: form.titleForm,
                    formStatus: form.formStatus,
                    navigate: navigate,
                });
            })}
        </div>
    );
});

export default ReviewerPage;
