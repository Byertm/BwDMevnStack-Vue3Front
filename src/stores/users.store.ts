import { defineStore } from 'pinia';
import { isEmptyObject } from '@helpers/index';
import service from '@services/user.service';
import { me } from '@services/auth.service';
import { IUser } from '@models/user';

interface UserState {
	me: { data: IUser | undefined | null; loading: boolean; errors: any[] };
	user: { data: IUser | undefined | null; loading: boolean; errors: any[] };
	users: { data: IUser[] | null; loading: boolean; errors: any[] };
	mainUsers: { data: IUser[] | null; loading: boolean; errors: any[] };
	newOrEditId: number | string | undefined | null;
}

const initialState = {
	me: { data: null, loading: false, errors: [] },
	user: { data: null, loading: false, errors: [] },
	users: { data: [], loading: false, errors: [] },
	mainUsers: { data: [], loading: false, errors: [] },
	newOrEditId: null
} as UserState;

export const useUserStore = defineStore({
	id: 'users',
	state: () => ({ ...initialState }),
	persist: true,
	actions: {
		async updateEditingId(newValue: string | number | undefined | null) {
			this.newOrEditId = newValue;
		},
		async getMeData() {
			this.me.loading = true;
			try {
				const res = await me();
				if (!!res.data) this.me.data = await res.data;
			} catch (error: any) {
				this.me.errors = error;
			} finally {
				this.me.loading = false;
			}
		},
		async getAll() {
			this.users.loading = true;

			await service
				.getAll()
				.then(async (data) => await data.data)
				.then((data) => (this.users.data = data))
				.catch((error) => {
					this.users.data = [];
					this.users.errors.push(error);
				})
				.finally(() => (this.users.loading = false));
		},
		async getById(id: string) {
			this.user.loading = true;
			await this.updateEditingId(id);

			await service
				.getById(id)
				.then(async (data) => await data.data)
				.then((data) => (this.user.data = data))
				.catch((error) => {
					this.user.data = null;
					this.user.errors.push(error);
				})
				.finally(() => {
					this.user.loading = false;
					this.getAll();
				});
		},
		async newUser(user: Partial<IUser>): Promise<boolean> {
			this.user.loading = true;

			let returnVal: Promise<boolean> = Promise.resolve(false);

			await service
				.newUser(user)
				.then(async (data) => await data.data)
				.then((data) => {
					returnVal = Promise.resolve(true);
					this.user.data = data;
				})
				.catch((error) => {
					this.user.data = null;
					this.user.errors.push(error);
					returnVal = Promise.reject(false);
				})
				.finally(() => ((this.user.loading = false), this.getAll()));

			return returnVal;
		},
		async updateUser(user: Partial<IUser>) {
			this.user.loading = true;
			await this.updateEditingId(null);

			let returnVal: Promise<boolean> = Promise.resolve(false);

			await service
				.updateUser(user)
				.then(async (data) => await data.data)
				.then((data) => {
					returnVal = Promise.resolve(true);
					this.user.data = data;
				})
				.catch((error) => {
					this.user.data = null;
					this.user.errors.push(error);
					returnVal = Promise.reject(false);
				})
				.finally(() => ((this.user.loading = false), this.getAll()));

			return returnVal;
		}
		// async delete(id: string) {
		// 	this.user.loading = true;

		// 	let returnVal: Promise<boolean> = Promise.resolve(false);

		// 	await service
		// 		.deleteUser(id)
		// 		.then(async (data) => await data.data)
		// 		.then(() => {
		// 			returnVal = Promise.resolve(true);
		// 			this.getAll();
		// 		})
		// 		.catch((error) => {
		// 			this.user.errors.push(error);
		// 			returnVal = Promise.reject(false);
		// 		})
		// 		.finally(() => ((this.user.loading = false), this.getAll()));

		// 	return returnVal;
		// }
	},
	getters: {
		isMe: (state) => !!state.me,
		isUser: (state) => !!state.user.data && !isEmptyObject(state.user.data),
		isUsers: (state) => !!state.users?.data?.length,
		isEmptyMe: (state) => !!state.me.data && isEmptyObject(state.me.data!),
		isEmptyUser: (state) => !!state.user.data && isEmptyObject(state.user.data!),
		isEmptyUsers: (state) => !state.users?.data || state.users.data?.length === 0,
		isErrorMe: (state) => !!state.me.errors?.length,
		isErrorUser: (state) => !!state.user.errors?.length,
		isErrorUsers: (state) => !!state.users.errors?.length,

		isEditingUser: (state) => !!state.newOrEditId && (typeof state.newOrEditId === 'string' || (typeof state.newOrEditId === 'number' && state.newOrEditId > -1)),
		isNewUser: (state) => !state.newOrEditId,

		getMe: (state) => (state.me.data as IUser) || ({} as IUser),
		getUser: (state) => state.user.data || {},
		getUsers: (state) => state.users.data || [],
		getUserErrors: (state) => state.user.errors || {},
		getUsersErrors: (state) => state.users.errors || []
	}
});