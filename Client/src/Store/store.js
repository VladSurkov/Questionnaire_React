import axios from 'axios';
import AuthService from '../Services/AuthService';
import { API_URL } from '../Http';

export default class Store {
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
            console.log(response);
            // localStorage.setItem('token', response.data.);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}
