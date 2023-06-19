import React, {useContext} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {NavLink} from 'react-router-dom';
import TextInput from '../../Components/TextInput/TextInput';
import Select from '../../Components/Select/Select';
import {Context} from '../../index';

import './SignInForm.scss';

const SignInForm = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    const RoleSelectOptions = [
        {value: 'Creator', label: 'Creator'},
        {value: 'User', label: 'User'},
        {value: 'Reviewer', label: 'Reviewer'},
    ];

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
                    onSubmit={(values, {resetForm}) => {
                        store.login(values.email, values.password, values.role);
                        navigate('/forms');
                        resetForm();
                    }}
                >
                    {({isValid, isSubmitting, errors, touched}) => (
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

                            <Select
                                name="role"
                                label="Оберіть роль:"
                                options={RoleSelectOptions}
                                error={errors.role}
                                touched={touched.role}
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
