import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_USER_KEY } from '../lib/const';

const storageService = {
	isUserLoggedIn: async (): Promise<boolean> => {
		let isLoggedIn = false;
		let savedUser = await AsyncStorage.getItem(ASYNC_STORAGE_USER_KEY);
		if (savedUser) {
			savedUser = JSON.parse(savedUser);
			// @ts-ignore
			isLoggedIn = savedUser && savedUser.accessToken && savedUser.refreshToken
		}
		return isLoggedIn;
	},
	getCurrentUser: async (): Promise<any> => {
		let currentUser = await AsyncStorage.getItem(ASYNC_STORAGE_USER_KEY);
		if (currentUser) {
			currentUser = JSON.parse(currentUser);
		}
		return currentUser;
	},
	getSavedTokens: async (): Promise<{authToken: string, refreshToken: string} | null> => {
		let currentUser = await AsyncStorage.getItem(ASYNC_STORAGE_USER_KEY);
		if (!currentUser) {
			return null;
		}

		const { authToken, refreshToken } = JSON.parse(currentUser);
		return {authToken, refreshToken};
	},
};

export default storageService;
