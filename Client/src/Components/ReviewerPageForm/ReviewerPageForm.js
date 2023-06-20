import React from 'react';

import './ReviewerPageForm.scss';

const ReviewerPageForm = ({
    userFormId,
    user,
    titleForm,
    formStatus,
    navigate,
}) => {
    const goToForm = () => {
        navigate(`/form?userFormId=${userFormId}`);
    };

    return (
        <div
            className="ReviewerPageForm"
            key={userFormId}
        >
            <div className="ReviewerPageForm__title">{titleForm}</div>
            <div className="ReviewerPageForm__text">{user}</div>
            <div className="ReviewerPageForm__status">{formStatus}</div>
            <button
                onClick={goToForm}
                className="ReviewerPageForm__btn"
            >
                Open Form
            </button>
        </div>
    );
};

export default ReviewerPageForm;
