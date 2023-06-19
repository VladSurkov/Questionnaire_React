import $api from '../Http';

export default class FormService {
    static createNewForm(title, questions) {
        return $api.post('/Form/createForm', {
            FormTitle: title,
            Questions: questions,
        });
    }

    static getAllForms() {
        return $api.get('/Form/getAllForms');
    }
}
