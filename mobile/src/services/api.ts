// services/api.ts
import axios from 'axios';
import { API_URL } from '../constants';
import { useAuthStore } from '../store';

const api = axios.create({
	baseURL: API_URL,
});

api.interceptors.request.use(
	async (config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export { api };
