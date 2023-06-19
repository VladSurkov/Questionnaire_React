import React, {useState, useContext} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react';

const NewForm = observer(() => {
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
        // console.log(titleForm);
        // inputs.map((input) => console.log(input.value));
    };

    return (
        <form>
            <label>Назва форми</label>
            <input onChange={(e) => setTitleForm(e.target.value)} />

            <button
                onClick={addInputHandler}
                type="button"
            >
                Створити питання
            </button>

            {inputs.map((input) => (
                <div key={input.id}>
                    <input
                        type="text"
                        value={input.value}
                        onChange={(e) => handleInputChange(e, input.id)}
                    />
                    <button onClick={() => handleRemoveInput(input.id)}>
                        Видалити
                    </button>
                </div>
            ))}

            <button
                type="submit"
                onClick={createFormHandler}
            >
                Створити форму
            </button>
        </form>
    );
});

export default NewForm;
