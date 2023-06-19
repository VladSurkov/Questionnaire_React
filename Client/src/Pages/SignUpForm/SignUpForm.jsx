import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Context } from '../../index';
import { NavLink } from 'react-router-dom';

import TextInput from '../../Components/TextInput/TextInput';
import Select from '../../Components/Select/Select';

import './SignUpForm.scss';

const SignUpForm = () => {
    const { store } = useContext(Context);

    const RoleSelectOptions = [
        { value: 'Creator', label: 'Creator' },
        { value: 'User', label: 'User' },
        { value: 'Reviewer', label: 'Reviewer' },
    ];

    return (
        <div className="SignUp">
            <div className="SignUp__container">
                <h2 className="SignUp__title">Реєстрація</h2>
                <div className="SignUp__text">
                    Залишайтеся з <span>Questionaire</span> створивши свій
                    обліковий запис.
                </div>

                <Formik
                    initialValues={{
                        firstName: '',
                        secondName: '',
                        email: '',
                        password: '',
                        role: '',
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .min(2, "Ім'я повинно бути хоча б з 2 символами!")
                            .required("Це обов'язково!"),

                        secondName: Yup.string()
                            .min(
                                2,
                                'Прізвище повинно бути хоча б з 2 символами!',
                            )
                            .required("Це обов'язково!"),

                        email: Yup.string()
                            .email('Неправильно введено почтову адресу!')
                            .required("Це обов'язково!"),

                        password: Yup.string()
                            .min(8, 'Пароль має містити мінімум 8 символів')
                            .max(20, 'Пароль не може перевищувати 20 символів')
                            .required("Це обов'язково!")
                            .matches(
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                'Пароль повинен містити: A-z, 0-9, ! @ # $ % ^ & *() ?.',
                            ),

                        role: Yup.string().required("Це обов'язково!"),
                    })}
                    onSubmit={(values, { resetForm }) => {
                        store.register(
                            values.email,
                            values.password,
                            values.firstName,
                            values.secondName,
                            values.role,
                        );
                        resetForm();
                    }}
                >
                    {({ isValid, isSubmitting, errors, touched }) => (
                        <Form className="SignUp__form">
                            <div className="SignUp__input-box">
                                <i className="bi bi-person"></i>
                                <TextInput
                                    name="firstName"
                                    type="text"
                                    placeholder="Ім'я"
                                />
                            </div>

                            <div className="SignUp__input-box">
                                <i className="bi bi-person-check"></i>
                                <TextInput
                                    name="secondName"
                                    type="text"
                                    placeholder="Прізвище"
                                />
                            </div>

                            <div className="SignUp__input-box">
                                <i className="bi bi-envelope"></i>
                                <TextInput
                                    name="email"
                                    type="email"
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

                            <div className="SignUp__link">
                                Вже маєте обліковий запис?
                                <NavLink
                                    end
                                    to="/SignIn"
                                >
                                    Авторизуватись у системі
                                </NavLink>
                                .
                            </div>

                            <button
                                type="submit"
                                className="SignUp__btn"
                                disabled={!isValid || isSubmitting}
                            >
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
