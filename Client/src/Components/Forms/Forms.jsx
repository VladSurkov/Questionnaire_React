import React, { useContext } from 'react';
import UserPage from '../../Pages/UserPage/UserPage';
import ReviewerPage from '../../Pages/ReviewerPage/ReviewerPage';
import { Context } from '../../index';


const Forms = () => {
    const { store } = useContext(Context);
    // role = store.user.role;
    const role = "User";
    
    if (role === "Creator") {
        // return <CreatorPage />
        return <></>;
    }
    else if (role === "User") {
        return <UserPage />;
    }
    else if (role === "Reviewer") {
        return <ReviewerPage />;
    }
}

export default Forms