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
            // console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    async getForm(formId) {
        try {
            const response = await FormService.getForm(formId);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    async sendUserForm(formId, data) {
        const response = await FormService.sendUserForm(formId, data);
    }

    // Reviewer
    async getAllUserForms() {
        try {
            const response = await FormService.getAllUserForms();
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    async getUserForm(userFormId) {
        try {
            const response = await FormService.getUserForm(userFormId);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    async sendReview(userFormId, status, comment) {
        const response = await FormService.sendReview(
            userFormId,
            status,
            comment,
        );
    }

    async logout() {
        localStorage.removeItem('token');
        this.setUser({});
    }
}
