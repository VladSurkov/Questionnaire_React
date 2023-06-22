import React, {useContext, useEffect, useState, Component} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Context} from '../../index';
import {observer} from 'mobx-react';

import './UserFormPage.scss';
import Header from '../../Components/Header/Header';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
        };

        props.qustionsCollectFunctions[props.id] = this.collectData;
        props.setQustionsCollectFunctions(props.qustionsCollectFunctions);
    }

    handleAnswerChange = (e) => {
        this.setState({answer: e.target.value});
    };

    collectData = () => {
        return {
            questionId: this.props.id,
            formId: this.props.formId,
            answerValue: this.state.answer,
        };
    };

    render() {
        const {id, question} = this.props;
        const {answer} = this.state;

        return (
            <div
                className='UserFormPage__question'
                key={id}
            >
                <div className='UserFormPage__question__question'>
                    {question}
                </div>
                <input
                    value={answer}
                    type='text'
                    onChange={this.handleAnswerChange}
                    className='UserFormPage__answer'
                />
            </div>
        );
    }
}

function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

const UserFormPage = observer(() => {
    let [searchParams, setSearchParams] = useSearchParams();
    const formId = searchParams.get('formId');
    const {store} = useContext(Context);
    const [form, setForm] = useState({});
    const [questions, setQuestions] = useState([]);
    const [qustionsCollectFunctions, setQustionsCollectFunctions] = useState(
        {},
    );

    const sendForm = () => {
        const data = Object.keys(qustionsCollectFunctions).map((key) => {
            const collectData = qustionsCollectFunctions[key];
            return collectData();
        });
        store.sendUserForm(formId, data);
    };

    useEffect(() => {
        store
            .getForm(formId)
            .then((result) => {
                console.log(result);
                setForm(result);

                if (!isEmpty(result)) {
                    setQuestions(
                        result.questions.map((question) => {
                            const question_comp = (
                                <Question
                                    id={question.id}
                                    formId={question.formId}
                                    question={question.question}
                                    qustionsCollectFunctions={
                                        qustionsCollectFunctions
                                    }
                                    setQustionsCollectFunctions={
                                        setQustionsCollectFunctions
                                    }
                                />
                            );
                            return question_comp;
                        }),
                    );
                }
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className='UserFormPage'>
            <Header />
            {!isEmpty(form) ? (
                <div className='UserFormPage__form'>
                    <div className='UserFormPage__title'>{form.formTitle}</div>
                    <div className='UserFormPage__creator'>{form.creator}</div>
                    {questions}
                    <button
                        onClick={sendForm}
                        className='UserFormPage__btn'
                    >
                        Відправити форму
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
});

export default UserFormPage;
