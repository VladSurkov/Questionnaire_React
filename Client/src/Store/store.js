import AuthService from "../Services/AuthService";

export default class Store {
    async register (email, password, firstName, secondName, role) {
        try {
            const response = await AuthService.register(email, password, firstName, secondName, role);
            console.log(response);

            // localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e);
        }
    }
}