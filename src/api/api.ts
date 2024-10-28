import axios from 'axios';
import {SERVER_URL} from '@env';
import storageService from '../services/storageService';
import apiService from '../services/apiService';

let authToken;

const api = axios.create({
	baseURL: `${SERVER_URL}/api`,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Intercept requests to add accessToken in every requests.
api.interceptors.request.use(
	async (config) => {
		const tokens = await storageService.getSavedTokens();
		if (tokens) {
			authToken = tokens.accessToken;
			config.headers.Authorization = authToken;
		}
		return config;
	},
	(error) => {
		console.error('Error occurred while intercepting request ', error);
	}
);

// Intercept responses to handle token refresh requirement.
api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response.status === 401) {
			// Generate new token and retry the request
			try {
				const newToken = await apiService.getNewAuthToken();
				error.config.headers.Authorization = newToken;
				return await api.request(error.config);
			} catch (e) {
				return console.error(e);
			}
		} else {
			return Promise.reject(error?.response?.data);
		}
	}
);

export default api;
