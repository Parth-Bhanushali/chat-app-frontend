import axios from 'axios';
import {SERVER_URL} from '@env';

const api = axios.create({
	baseURL: `${SERVER_URL}/api`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
