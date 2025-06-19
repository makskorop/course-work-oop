import React, { useEffect } from 'react';
import { useAuthStore } from '../../store';
import { api } from '../../services/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const setLoading = useAuthStore((state) => state.setLoading);

	useEffect(() => {
		api.get('/auth/verify');

		setLoading(false);
	}, [setLoading]);

	return <>{children}</>;
};
