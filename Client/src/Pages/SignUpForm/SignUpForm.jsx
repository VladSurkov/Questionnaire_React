import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import TextInput from '../../Components/TextInput/TextInput';
import './SignUpForm.scss';


const SignUpForm = () => {

    return (
        <div className="SignUp">

            <div className="SignUp__container">
                <h2 className="SignUp__title">Реєстрація</h2>
                <div className="SignUp__text">Залишайтеся з <span>Questionaire</span> створивши свій обліковий запис.</div>

                <Formik
                    initialValues = {{
                        name: '',
                        surname: '',
                        email: '',
                        password: '',
                        role: '',
                    }}
                    
                    validationSchema = {Yup.object({
                        name: Yup.string()
                                .min(2,"Ім'я повинно бути хоча б з 2 символами!").required("Це обов'язково!"),
            
                        surname: Yup.string()
                                   .min(2,"Прізвище повинно бути хоча б з 2 символами!").required("Це обов'язково!"),
            
                        email: Yup.string()
                                 .email('Неправильно введено почтову адресу!').required("Це обов'язково!"),
            
                        password: Yup.string()
                                    .min(8, "Пароль має містити мінімум 8 символів")
                                    .max(20, "Пароль не може перевищувати 20 символів")
                                    .required("Це обов'язково!")
                                    .matches(
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        "Пароль повинен містити: A-z, 0-9, ! @ # $ % ^ & *() ?."
                                    ),
            
                        role: Yup.string()
                                .required("Це обов'язково!")
                    })}

                    onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
                    >

                    {({isValid, isSubmitting}) => (

                        <Form className="SignUp__form">

                            <div className="SignUp__input-box">
                                <TextInput 
                                    name="name" 
                                    type="text"  
                                    placeholder="Ім'я"/>
                            </div>

                            <div className="SignUp__input-box">
                                <TextInput 
                                    name="surname" 
                                    type="text"  
                                    placeholder="Прізвище"/>
                            </div>

                            <div className="SignUp__input-box">
                                <TextInput 
                                    name="email" 
                                    type="email"  
                                    placeholder="Email"/>
                            </div>
                            
                            <div className="SignUp__input-box">
                                <TextInput 
                                    name="password" 
                                    type="password"  
                                    placeholder="Пароль"/>
                            </div>
                            
                            <div className="SignUp__select">
                                <label htmlFor="role">Оберіть роль:</label>

                                <Field 
                                    name="role" 
                                    id="role"
                                    as="select">
                                    <option value="">Не обрано</option>        
                                    <option value="creator">Creator</option>
                                    <option value="user">User</option>
                                    <option value="reviewer">Reviewer</option>
                                </Field>

                            </div>

                            <ErrorMessage className="error" name="role" component="div"/>

                            <div className="SignUp__link">Вже маєте обліковий запис? <a href="#">Увійти в систему</a>.</div>

                            <button 
                                type="submit" 
                                className="SignUp__btn"
                                disabled={!isValid || isSubmitting}>
                                    Зареєструватися
                            </button>

                        </Form>
                    
                    )}
                </Formik>

            </div>

        </div>
    );
};

export default SignUpForm;