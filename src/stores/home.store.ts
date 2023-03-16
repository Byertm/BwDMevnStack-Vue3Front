import { defineStore } from 'pinia';

// import { fetchWrapper } from '@/helpers';

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useHomeStore = defineStore({
	id: 'home',
	state: () => ({
		home: {}
	}),
	persist: true,
	actions: {
		async getAll() {
			this.home = { loading: true };
			// fetchWrapper.get(baseUrl)
			// .then(users => this.users = users)
			// .catch(error => this.users = { error })
		}
	}
});