const BASE_URL = 'http://localhost:8000/api';

const alertMessage = 'Что-то пошло не так! Просим связаться с тех. поддержкой';

export const api = {
    getStatusCounters: async () => {
        try {
            const res = await fetch(`${BASE_URL}/status_counters`);
            const data = await res.json();
            return data.data.result;
        } catch (err) {
            alert(alertMessage);
        }
    },
    getTabBooks: async (tab, page, itemsPerPage = 4) => {
        try {
            const res = await fetch(`${BASE_URL}/books?status=${tab}&page=${page}&itemsPerPage=${itemsPerPage}`);
            const data = await res.json();
            return data.data.result;
        } catch (err) {
            alert(alertMessage);
        }
    },
    getFilteredBooks: async () => {},
    changeBookStatus: async () => {},
};
