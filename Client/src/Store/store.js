import axios from 'axios';
import AuthService from '../Services/AuthService';
import { API_URL } from '../Http';
import { observable, action, makeAutoObservable } from 'mobx';

export default class Store {
    user = {};

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

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
}
