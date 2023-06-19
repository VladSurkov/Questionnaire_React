import React from 'react';

const ReviewerPageForm = ({userFormId, user, titleForm, formStatus, navigate}) => {
    const goToForm = () => {
        navigate(`/form?userFormId=${userFormId}`);
    };

    return (
        <div
            className="form"
            key={userFormId}
        >
            <div className="form__title">{titleForm}</div>
            <div className="from__creator">{user}</div>
            <div className="from__status">{formStatus}</div>
            <button onClick={goToForm}>Open Form</button>
        </div>
    );
};

export default ReviewerPageForm;
