import React, {useContext, useEffect, useState, Component} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import {useNavigate} from 'react-router-dom';

import './ReviewerFormPage.scss';
import Header from '../../Components/Header/Header';

function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

const ReviewerFormPage = observer(() => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const userFormId = searchParams.get('userFormId');
    const [form, setForm] = useState({});
    const [status, setStatus] = useState();
    const [comment, setComment] = useState('');
    const {store} = useContext(Context);

    useEffect(() => {
        store
            .getUserForm(userFormId)
            .then((result) => {
                console.log(result);
                setForm(result);
                setStatus('Approved');
            })
            .catch((e) => console.log(e));
    }, []);

    const handleStatusBtnToggle = () => {
        if (status === 'Approved') {
            setStatus('Rejected');
        } else {
            setStatus('Approved');
        }
    };

    const sendReview = () => {
        store.sendReview(userFormId, status, comment);
        setComment('');
        navigate('/forms');
    };

    return (
        <>
            <Header />
            <div className='ReviewerFormPage'>
                {!isEmpty(form) ? (
                    <div className='ReviewerFormPage__form'>
                        <div className='ReviewerFormPage__title'>
                            {form.formTitle}
                        </div>
                        <div className='ReviewerFormPage__text'>
                            User: {form.user}
                        </div>
                        {form.answers.map((answer) => {
                            return (
                                <section className='ReviewerFormPage__answer-question'>
                                    <div className='ReviewerFormPage__answer-question__question'>
                                        {answer.question}
                                    </div>
                                    <div className='ReviewerFormPage__answer-question__answer'>
                                        {answer.answer}
                                    </div>
                                </section>
                            );
                        })}

                        <div
                            className={`ReviewerFormPage__status-btn ${status}`}
                            onClick={handleStatusBtnToggle}
                        >
                            <div className='status-btn__choise-text'>
                                Approved
                            </div>
                            <button>choise</button>
                            <div className='status-btn__choise-text'>
                                Rejected
                            </div>
                        </div>

                        <div className='ReviewerFormPage__status'>{status}</div>
                        {status === 'Approved' ? (
                            <></>
                        ) : (
                            <div className='ReviewerFormPage__comment'>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                        )}

                        <button
                            onClick={sendReview}
                            className='ReviewerFormPage__sendBtn'
                        >
                            Send Review
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
});

export default ReviewerFormPage;
