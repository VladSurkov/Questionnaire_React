import React, {useContext} from 'react';
import UserFormPage from '../../Pages/UserFormPage/UserFormPage';
import CreatorFormPage from '../../Pages/CreatorFormPage/CreatorFormPage';
import ReviewerFormPage from '../../Pages/ReviewerFormPage/ReviewerFormPage';
import {Context} from '../../index';
import {observer} from 'mobx-react';

const Form = observer(() => {
    const {store} = useContext(Context);
    // const role = store.user.role;
    const role = "User";

    if (role === 'Creator') {
        return <CreatorFormPage />;
    } else if (role === 'User') {
        return <UserFormPage />;
    } else if (role === 'Reviewer') {
        return <ReviewerFormPage />;
    }
});

export default Form;
