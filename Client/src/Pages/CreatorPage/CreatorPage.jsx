import React from 'react';
import {useNavigate} from 'react-router-dom';

import './CreatorPage.scss';
import Header from '../../Components/Header/Header';

const CreatorPage = () => {
    const navigate = useNavigate();

    const createNewForm = () => {
        navigate('/newForm');
    };

    return (
        <>
            <Header/>
            <button
                onClick={createNewForm}
                className="CreatorPage__btn"
            >
                Створити форму
            </button>
        </>
    );
};

export default CreatorPage;
