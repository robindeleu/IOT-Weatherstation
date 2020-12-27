import api from './api';

export default {
    resource: 'sensors',

    index() {
        return api().get(`/${this.resource}`);
    },

    get(id) {
        return api().get(`/${this.resource}/${id}`);
    }
}