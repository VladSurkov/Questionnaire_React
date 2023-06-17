import React from 'react';
import './SignUpForm.scss';

const SignUpForm = () => {
    return (
        <div className="SignUp">

            <div className="SignUp__container">
                <h2 className="SignUp__title">Sign Up</h2>
                <div className="SignUp__text">Stay with Questionire creating your personal account</div>

                <form className="SignUp__form">
                    <input type="text"  placeholder='Name'/>
                    <input type="text"  placeholder='Surname'/>
                    <input type="password"  placeholder='Password'/>
                    <input type="email"  placeholder='Email'/>

                    <div className="SignUp__select">
                        <label htmlFor="roles">Select your role:</label>
                        <select name="roles" id='roles'>
                            <option value="creator">Creator</option>
                            <option value="user">User</option>
                            <option value="reviewer">Reviewer</option>
                        </select>
                    </div>

                    <button type="submit" class="SignUp__btn">Sign Up</button>

                </form>

            </div>

        </div>
    );
};

export default SignUpForm;