export default {
    state: {
        httpError: {
            hasError: false,
            status: '',
            statusText: ''
        }
    },
    mutations: {
        ON_HTTP_ERROR(state, payload) {
            state.httpError = payload
        },
        CLEAR_HTTP_ERROR(state) {
            state.httpError = false;
            state.status = '';
            state.statusText = ''
        }
    }
}
