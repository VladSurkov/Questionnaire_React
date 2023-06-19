import React, {useContext} from 'react';
import UserPage from '../../Pages/UserPage/UserPage';
import CreatorPage from '../../Pages/CreatorPage/CreatorPage';
import ReviewerPage from '../../Pages/ReviewerPage/ReviewerPage';
import {Context} from '../../index';
import {observer} from 'mobx-react';

const Forms = observer(() => {
    const {store} = useContext(Context);
    const role = store.user.role;

    if (role === 'Creator') {
        return <CreatorPage />;
    } else if (role === 'User') {
        return <UserPage />;
    } else if (role === 'Reviewer') {
        return <ReviewerPage />;
    }
});

export default Forms;
