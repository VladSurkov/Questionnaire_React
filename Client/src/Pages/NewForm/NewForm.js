import React, {useState, useContext} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import {useNavigate} from 'react-router-dom';

import './NewForm.scss';
import Header from '../../Components/Header/Header';

const NewForm = observer(() => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [titleForm, setTitleForm] = useState('');
    const [inputs, setInputs] = useState([]);

    const addInputHandler = () => {
        const newInput = {
            id: inputs.length + 1,
            value: '',
        };

        setInputs([...inputs, newInput]);
    };

    const handleInputChange = (e, id) => {
        const updatedInputs = inputs.map((input) =>
            input.id === id ? {...input, value: e.target.value} : input,
        );

        setInputs(updatedInputs);
    };

    const handleRemoveInput = (id) => {
        const updatedInputs = inputs.filter((input) => input.id !== id);

        setInputs(updatedInputs);
    };

    const createFormHandler = (e) => {
        e.preventDefault();
        store.createNewForm(titleForm, inputs);
        setTitleForm('');
        setInputs([]);
        navigate('/forms');
    };

    return (
        <>
            <Header />
            <div className='NewForm'>
                <div className='NewForm__container'>
                    <h2 className='NewForm__title'>Нова Форма</h2>
                    <div className='NewForm__text'>
                        Створіть нову форму за допомогою інструментів нижче.
                    </div>

                    <form className='NewForm__form'>
                        <div className='NewForm__input-box'>
                            <label htmlFor='formName'>Назва форми</label>
                            <input
                                id='formName'
                                value={titleForm}
                                onChange={(e) => setTitleForm(e.target.value)}
                            />
                        </div>

                        <div className='NewForm__questions'>
                            {inputs.map((input) => (
                                <div
                                    key={input.id}
                                    className='NewForm__input-box'
                                >
                                    <label>Питання </label>
                                    <input
                                        type='text'
                                        value={input.value}
                                        onChange={(e) =>
                                            handleInputChange(e, input.id)
                                        }
                                    />
                                    <button
                                        className='NewForm__btn'
                                        onClick={() =>
                                            handleRemoveInput(input.id)
                                        }
                                    >
                                        Видалити
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            className='NewForm__question-btn'
                            onClick={addInputHandler}
                            type='button'
                        >
                            Створити питання
                        </button>

                        <button
                            className='NewForm__form-btn NewForm__btn'
                            type='submit'
                            onClick={createFormHandler}
                        >
                            Створити форму
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
});

export default NewForm;
