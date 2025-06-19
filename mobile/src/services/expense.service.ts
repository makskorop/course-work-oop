import { api } from './api';
import { Expense } from '../types';
import { TimePeriod } from '../enums';
import { Messages } from '../constants';

export const ExpenseService = {
	async getAll(userId: string): Promise<Expense[]> {
		try {
			const response = await api.get(`/expenses/${userId}`);
			return response.data;
		} catch (error: any) {
			throw new Error(Messages.FETCH_EXPENSES_FAILED);
		}
	},

	async getById(id: string): Promise<Expense | null> {
		try {
			const response = await api.get(`/expenses/detail/${id}`);
			return response.data;
		} catch (error: any) {
			if (error.response?.status === 404) return null;
			throw new Error(Messages.FETCH_EXPENSE_FAILED);
		}
	},

	async getByTimePeriod(userId: string, period: TimePeriod): Promise<Expense[]> {
		try {
			const response = await api.get(`/expenses/${userId}/period`, {
				params: { period },
			});
			return response.data;
		} catch (error: any) {
			throw new Error(Messages.FETCH_EXPENSES_FAILED);
		}
	},

	async create(expense: Omit<Expense, 'id'>): Promise<void> {
		try {
			await api.post('/expenses/', expense);
		} catch (error: any) {
			throw new Error(Messages.CREATE_EXPENSE_FAILED);
		}
	},

	async update(id: string, updates: Partial<Omit<Expense, 'id'>>): Promise<void> {
		try {
			await api.put(`/expenses/${id}`, updates);
		} catch (error: any) {
			throw new Error(Messages.UPDATE_EXPENSE_FAILED);
		}
	},

	async delete(id: string): Promise<void> {
		try {
			await api.delete(`/expenses/${id}`);
		} catch (error: any) {
			throw new Error(Messages.DELETE_EXPENSE_FAILED);
		}
	},
};
