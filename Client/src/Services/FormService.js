import $api from '../Http';

export default class FormService {
    static getAllForms() {
        return $api.get('/Form/getAllForms');
    }
}
