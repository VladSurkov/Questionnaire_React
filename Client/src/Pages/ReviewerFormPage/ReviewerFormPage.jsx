import React, {useContext, useEffect, useState, Component} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Context} from '../../index';
import {observer} from 'mobx-react';

function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

const ReviewerFormPage = observer(() => {
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
    };

    return (
        <div className="content">
            {!isEmpty(form) ? (
                <div className="form">
                    <div className="form__title">{form.formTitle}</div>
                    <div className="form__user">{form.user}</div>
                    {form.answers.map((answer) => {
                        return (
                            <section className="form__answer-question">
                                <div className="form__answer-question__question">
                                    {answer.question}
                                </div>
                                <div className="form__answer-question__answer">
                                    {answer.answer}
                                </div>
                            </section>
                        );
                    })}

                    <div
                        className={`status-btn ${status}`}
                        onClick={handleStatusBtnToggle}
                    >
                        <div className="status-btn__choise-text">Approved</div>
                        <button>choise</button>
                        <div className="status-btn__choise-text">Rejected</div>
                    </div>

                    <div className="form__status">{status}</div>
                    {status === 'Approved' ? (
                        <></>
                    ) : (
                        <div className="comment">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                    )}

                    <button onClick={sendReview}>Send Review</button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
});

export default ReviewerFormPage;
