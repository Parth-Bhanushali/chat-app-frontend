import api from '../api/api';
import storageService from './storageService';

const apiService = {
	getNewAuthToken: async (): Promise<string> => {
		const savedTokens = await storageService.getSavedTokens();
		const refreshToken = savedTokens?.refreshToken;
		const request = await api.post('/auth/refreshToken', {
			refreshToken: refreshToken,
		});
		const data = request.data;
		if (!data) {
			throw new Error('Failed to fetch new access token from server.');
		}

		await storageService.updateAcessTokenLocally(data.accessToken);
		return data.accessToken as string;
	},
};

export default apiService;
