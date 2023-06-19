import axios from 'axios';
import AuthService from '../Services/AuthService';
import {API_URL} from '../Http';
import {observable, action, makeAutoObservable} from 'mobx';
import FormService from '../Services/FormService';

export default class Store {
    user = {};

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    // Auth
    async register(email, password, firstName, secondName, role) {
        try {
            const response = await AuthService.register(
                email,
                password,
                firstName,
                secondName,
                role,
            );
            console.log(response);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async login(email, password, role) {
        try {
            const response = await AuthService.login(email, password, role);
            localStorage.setItem('token', response.data.token);
            this.setUser({
                firstName: response.data.firstName,
                secondName: response.data.secondName,
                email: response.data.email,
                role: response.data.role,
            });
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    // role = Creator
    async createNewForm(title, questions) {
        try {
            const questionsValue = [];
            questions.map((question) => {
                questionsValue.push(question.value);
            });
            const response = await FormService.createNewForm(
                title,
                questionsValue,
            );
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    // role = User
    async getAllForms() {
        try {
            const response = await FormService.getAllForms();
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    async getAllUserForms() {
        try {
            const data = '[\
                {\
                  "userFormId": "dd7fe8e0-0a7e-4d15-90d8-81880f5c1291",\
                  "user": "Stas Surkov",\
                  "titleForm": "Тест по школе",\
                  "formStatus": "Filled"\
                },\
                {\
                  "userFormId": "92ac311f-ddac-42d8-9ed2-cc35f548cddd",\
                  "user": "Stas Surkov",\
                  "titleForm": "Самый лучший спорт",\
                  "formStatus": "Filled"\
                },\
                {\
                  "userFormId": "112c5842-8b11-43b4-83d2-081113a885cb",\
                  "user": "Kolya Boomich",\
                  "titleForm": "Самые лучшие автомобили в мире",\
                  "formStatus": "Filled"\
                }\
            ]'

            return JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getForm(formId) {
        try {
            const data = '{\
                "formTitle": "Самые лучшие автомобили в мире",\
                "creator": "Anton Kolich",\
                "questions": [\
                  {\
                    "id": "285530bf-96dc-4e00-b8cd-a8175c8ee0f7",\
                    "formId": "07adc9ad-ccb7-45cf-8434-ce2b1d9a9d85",\
                    "question": "Какая машина самая быстрая?"\
                  },\
                  {\
                    "id": "5a1fa966-ce37-4cb1-bf06-da448f108003",\
                    "formId": "07adc9ad-ccb7-45cf-8434-ce2b1d9a9d85",\
                    "question": "Какая машина самая мощная?"\
                  },\
                  {\
                    "id": "82ed7c7c-31c9-4c43-91c3-3dfa78c7599c",\
                    "formId": "07adc9ad-ccb7-45cf-8434-ce2b1d9a9d85",\
                    "question": "Какая машина самая имеет 9 колес?"\
                  },\
                  {\
                    "id": "fb49ece8-1a44-4650-8bdb-189b8f6d63c5",\
                    "formId": "07adc9ad-ccb7-45cf-8434-ce2b1d9a9d85",\
                    "question": "Какая машина самая красивая?"\
                  }\
                ]\
              }'
            
            return JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
    }

    async sendUserForm(formId, data) {
        console.log("sendUserForm", formId, data);
    }
}
