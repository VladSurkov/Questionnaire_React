import React, {useContext} from 'react';
import UserFormPage from '../../Pages/UserFormPage/UserFormPage';
import CreatorFormPage from '../../Pages/CreatorFormPage/CreatorFormPage';
import ReviewerFormPage from '../../Pages/ReviewerFormPage/ReviewerFormPage';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import {useNavigate} from 'react-router-dom';

const Form = observer(() => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    // const role = store.user.role;
    const role = 'User';

    if (role === 'Creator') {
        return <CreatorFormPage />;
    } else if (role === 'User') {
        return <UserFormPage />;
    } else if (role === 'Reviewer') {
        return <ReviewerFormPage />;
    }
    // else {
    //     navigate('/');
    // }
});

export default Form;
