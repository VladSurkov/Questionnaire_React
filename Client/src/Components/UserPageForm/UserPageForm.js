import React from 'react';

const UserPageForm = ({formId, formCreator, formTitle, navigate}) => {
    const goToForm = () => {
        navigate(`/form?formId=${formId}`);
    };

    return (
        <div
            className="form"
            key={formId}
        >
            <div className="form__title">{formTitle}</div>
            <div className="from__creator">{formCreator}</div>
            <button onClick={goToForm}>Open Form</button>
        </div>
    );
};

export default UserPageForm;
