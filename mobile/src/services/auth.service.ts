
import { RegisterData, UserCredentials } from '../types';
import { Messages } from '../constants';
import { useAuthStore } from '../store';
import { api } from './api';

export const AuthService = {
	async register({ username, email, password }: RegisterData): Promise<void> {
		try {
			const response = await api.post('/auth/register', {
				username,
				email,
				password,
			});
			const user = response.data;
			useAuthStore.getState().setUser(user);
		} catch (error: any) {
			throw new Error(Messages.REGISTRATION_FAILED);
		}
	},

	async login({ email, password }: UserCredentials): Promise<void> {
		try {
			console.log('Logging in with:', { email, password });

			const response = await api.post('/auth/login', {
				email,
				password,
			});

			console.log('Login response:', response.data);	
			const user = response.data;
			useAuthStore.getState().setUser(user);
		} catch (error: any) {
			console.error('Login error:', error);
			throw new Error(Messages.LOGIN_FAILED);
		}
	},

	async logout(): Promise<void> {
		try {
			useAuthStore.getState().logout();
		} catch (error: any) {
			throw new Error(Messages.LOGOUT_FAILED);
		}
	},
};
