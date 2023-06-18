import React from 'react';
import './SignInForm.scss';

const SignInForm = () => {
    return (
        <div className="SignIn">

            <div className="SignIn__container">
                <h2 className="SignIn__title">Авторизація</h2>
                <div className="SignIn__text">Увійдіть у свій особистий кабінет <span>Questionaire</span> за даними нижче.</div>

                <form className="SignIn__form">

                    <input type="email"  placeholder='Email'/>
                    <input type="password"  placeholder='Пароль'/>
                    
                    <div className="SignIn__select">
                        <label htmlFor="roles">Ваша роль:</label>
                        <select name="roles" id='roles'>
                            <option value="creator">Creator</option>
                            <option value="user">User</option>
                            <option value="reviewer">Reviewer</option>
                        </select>
                    </div>

                    <div className="SignIn__link">Ще не маєте обліковий запис? <a href="#">Зареєструватися у системі</a>.</div>

                    <button type="submit" class="SignIn__btn">Увійти</button>

                </form>

            </div>

        </div>
    );
};

export default SignInForm;