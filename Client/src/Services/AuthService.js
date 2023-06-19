import $api from '../Http';

export default class AuthService {
    static async register(email, password, firstName, secondName, role) {
        return $api.post('/Users/register', {
            Email: email,
            Password: password,
            FirstName: firstName,
            SecondName: secondName,
            Role: role,
        });
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
