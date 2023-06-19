import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import TextInput from '../../Components/TextInput/TextInput';
import { Context } from '../../index';

import './SignInForm.scss';

const SignInForm = () => {
    const { store } = useContext(Context);

    return (
        <div className="SignIn">
            <div className="SignIn__container">
                <h2 className="SignIn__title">Авторизація</h2>
                <div className="SignIn__text">
                    Увійдіть у свій особистий кабінет <span>Questionaire</span>{' '}
                    за даними нижче.
                </div>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        role: '',
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Неправильно введено почтову адресу!')
                            .required("Це обов'язково!"),
                        password: Yup.string().required("Це обов'язково!"),
                        role: Yup.string().required("Це обов'язково!"),
                    })}
                    onSubmit={(values, { resetForm }) => {
                        store.login(values.email, values.password, values.role);
                        resetForm();
                    }}
                >
                    {({ isValid, isSubmitting }) => (
                        <Form className="SignIn__form">
                            <div className="SignUp__input-box">
                                <i className="bi bi-envelope"></i>
                                <TextInput
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="SignUp__input-box">
                                <i className="bi bi-key"></i>
                                <TextInput
                                    name="password"
                                    type="password"
                                    placeholder="Пароль"
                                />
                            </div>

                            <div className="SignUp__select">
                                <label htmlFor="role">Оберіть роль:</label>

                                <Field
                                    name="role"
                                    id="role"
                                    as="select"
                                >
                                    <option value="">Не обрано</option>
                                    <option value="Creator">Creator</option>
                                    <option value="User">User</option>
                                    <option value="Reviewer">Reviewer</option>
                                </Field>
                            </div>

                            <ErrorMessage
                                className="error"
                                name="role"
                                component="div"
                            />

                            <div className="SignIn__link">
                                Ще не маєте обліковий запис?{' '}
                                <NavLink
                                    end
                                    to="/"
                                >
                                    Зареєструватися у системі
                                </NavLink>
                                .
                            </div>

                            <button
                                type="submit"
                                className="SignIn__btn"
                                disabled={!isValid || isSubmitting}
                            >
                                Увійти
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignInForm;
