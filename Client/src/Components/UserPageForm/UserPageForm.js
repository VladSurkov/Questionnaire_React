import React from 'react';

import './UserPageForm.scss';

const UserPageForm = ({formId, formCreator, formTitle, navigate}) => {
    const goToForm = () => {
        navigate(`/form?formId=${formId}`);
    };

    return (
        <div
            className="UserPageForm"
            key={formId}
        >
            <div className="UserPageForm__title">{formTitle}</div>
            <div className="UserPageForm__text">Creator: {formCreator}</div>
            <button
                onClick={goToForm}
                className="UserPageForm__btn"
            >
                Open Form
            </button>
        </div>
    );
};

export default UserPageForm;
