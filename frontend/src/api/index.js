const BASE_URL = 'http://localhost:8000/api';

const alertMessage = 'Что-то пошло не так! Просим связаться с тех. поддержкой';

const fetchWrapper = async cb => {
    try {
        const res = await cb();
        if (!res.ok) {
            throw new Error();
        }
        const data = await res.json();
        return data ? data.data.result : [];
    } catch (err) {
        alert(alertMessage);
    }
};

export const api = {
    getStatusCounters: async () => {
        return await fetchWrapper(() => fetch(`${BASE_URL}/status_counters`));
    },
    getTabBooks: async (tab, page = 1, itemsPerPage = 4) => {
        return await fetchWrapper(() => fetch(`${BASE_URL}/books?status=${tab}&page=${page}&itemsPerPage=${itemsPerPage}`));
    },
    getFilteredBooks: async (tab, tags, page = 1, itemsPerPage = 4) => {
        return await fetchWrapper(() => fetch(`${BASE_URL}/filtered_books?status=${tab}&tags=${tags}&page=${page}&itemsPerPage=${itemsPerPage}`));
    },
    changeBookStatus: async (bookId, status) => {},
};
