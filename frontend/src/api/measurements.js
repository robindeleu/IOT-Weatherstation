import api from './api';

export default {
    resource: 'measurements',

    index() {
        return api().get(`/${this.resource}`);
    },

    get(id) {
        return api().get(`/${this.resource}/${id}`);
    },

    getPeriod(id, period) {
        return api().get(`/${this.resource}/${id}?period=${period}`);
    }
}