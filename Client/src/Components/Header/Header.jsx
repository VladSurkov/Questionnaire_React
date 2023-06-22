import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Context} from '../../index';
import {observer} from 'mobx-react';

import './Header.scss';

const Header = observer(() => {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    const clickLogoHendler = () => {
        navigate('/forms');
    };

    const logoutButtonHandler = () => {
        store.logout();
        navigate('/');
    };

    return (
        <header className='header'>
            <div
                className='header__logo'
                onClick={clickLogoHendler}
            >
                Questionnaire
            </div>
            <button
                className='header__btn'
                onClick={logoutButtonHandler}
            >
                Вийти
            </button>
        </header>
    );
});

export default Header;
