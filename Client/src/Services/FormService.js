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

    static getForm(formId) {
        return $api.get('/Form/getForm', {
            params: {
                id: formId,
            },
        });
    }

    static sendUserForm(formId, data) {
        return $api.post('/Form/fillForm', data, {
            params: {
                FormId: formId,
            },
        });
    }

    static getAllUserForms() {
        return $api.get('/Form/getUserForms');
    }

    static getUserForm(userFormId) {
        return $api.get('/Form/getUserForm', {
            params: {
                id: userFormId,
            },
        });
    }

    static sendReview(userFormId, status, comment) {
        return $api.put(
            '/Form/reviewerResponse',
            {
                Status: status,
                Comment: comment,
            },
            {
                params: {
                    formId: userFormId,
                },
            },
        );
    }
}
