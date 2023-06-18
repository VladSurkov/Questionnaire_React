import $api from "../http/index";

export default class AuthService {
    static async register (email, password, firstName, secondName, role) {
        return $api.post('/Users/register', {email, password, firstName, secondName, role});
    }

    static async login (email, password, role) {
        return $api.post('/users/login', {email, password, role});
    }

    static async logout() {
        return $api.post('/logout');
    }
}