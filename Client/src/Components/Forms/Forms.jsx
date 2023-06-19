import React, {useContext} from 'react';
import UserPage from '../../Pages/UserPage/UserPage';
import CreatorPage from '../../Pages/CreatorPage/CreatorPage';
import ReviewerPage from '../../Pages/ReviewerPage/ReviewerPage';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import {useNavigate} from 'react-router-dom';

const Forms = observer(() => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const role = store.user.role;
    // const role = "Reviewer";

    if (role === 'Creator') {
        return <CreatorPage />;
    } else if (role === 'User') {
        return <UserPage />;
    } else if (role === 'Reviewer') {
        return <ReviewerPage />;
    }
    // else {
    //     navigate('/');
    // }
});

export default Forms;
