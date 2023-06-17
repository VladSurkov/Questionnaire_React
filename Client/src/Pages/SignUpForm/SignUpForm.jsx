import React from 'react';
import './SignUpForm.scss';

const SignUpForm = () => {
    return (
        <div className="SignUp">

            <div className="SignUp__container">
                <h2 className="SignUp__title">Реєстрація</h2>
                <div className="SignUp__text">Залишайтеся з <span>Questionaire</span> створивши свій обліковий запис.</div>

                <form className="SignUp__form">
                    <input type="text"  placeholder="Ім'я"/>
                    <input type="text"  placeholder='Прізвище'/>
                    <input type="email"  placeholder='Email'/>
                    <input type="password"  placeholder='Пароль'/>
                    
                    <div className="SignUp__select">
                        <label htmlFor="roles">Оберіть роль:</label>
                        <select name="roles" id='roles'>
                            <option value="creator">Creator</option>
                            <option value="user">User</option>
                            <option value="reviewer">Reviewer</option>
                        </select>
                    </div>

                    <button type="submit" class="SignUp__btn">Зареєструватися</button>

                </form>

            </div>

        </div>
    );
};

export default SignUpForm;