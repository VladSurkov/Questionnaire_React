import $api from '../Http';

export default class FormService {
    static getAllForms() {
        return $api.get('/Form/getAllForms');
    }

    static async login(email, password, role) {
        return $api.post('/Users/login', {
            Email: email,
            Password: password,
            Role: role,
        });
    }

    static async logout() {
        return $api.post('/logout');
    }
}
