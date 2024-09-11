import axios from 'axios';

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
});

export const getDataToday = async () => {
    const { data } = await api.get('/api/limit/400');
    console.log(data)
    return data;
};

export const getDataByMinute = async (minute) => {
    try {
        const res = await api.get(`/api/minutes/${minute}`);
        return res.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const getDataByRange = async ({ start, end }) => {
    const res = await api.get(`/api/range?start=${start}&end=${end}`)
    return res.data;
}

export default api;