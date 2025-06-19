// store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
	id: string;
	username: string;
	email: string;
	token: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isLoading: true,
			setUser: (user) => set({ user, token: user!.token, isLoading: false }),
			setLoading: (loading) => set({ isLoading: loading }),
			logout: () => set({ user: null, token: null, isLoading: false }),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
