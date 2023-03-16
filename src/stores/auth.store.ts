import { defineStore } from 'pinia';
import { getLS, setLSWithModel, setLSWithStringfyForData, removeLS } from '@helpers/local-storage';
import { authLogin, authRegister, authRefreshToken, authRecoveryPassword } from '@services/auth.service';
import router from '@router/index';

interface AuthState {
	user: any;
	refreshTokenTimeout: any;
	returnUrl: string | null;
}

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({ user: null, refreshTokenTimeout: null, returnUrl: null } as AuthState),
	persist: true,
	actions: {
		setTokens() {
			if (!!this.user) {
				setLSWithStringfyForData({ key: 'user', value: this.user });
				setLSWithModel({ key: 'accessToken', value: this.user.token });
				setLSWithModel({ key: 'refreshToken', value: this.user.refresh_token });
			} else {
				removeLS('accessToken');
				removeLS('refreshToken');
				removeLS('user');
			}
		},
		async login(username: string, password: string) {
			// this.user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }, { credentials: 'include' });
			this.user = await (await authLogin(username, password)).data;

			this.setTokens();

			this.startRefreshTokenTimer();

			router.push(this.returnUrl || '/');
		},
		async register(email: string, username: string, first_name: string, last_name: string, password: string) {
			// this.user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }, { credentials: 'include' });
			this.user = await (await authRegister(email, username, first_name, last_name, password)).data;

			this.setTokens();

			this.startRefreshTokenTimer();

			router.push(this.returnUrl || '/');
		},
		async recoveryPassword(email: string) {
			this.user = await (await authRecoveryPassword(email)).data;
		},
		logout() {
			// fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
			this.stopRefreshTokenTimer();
			this.user = null;

			this.setTokens();

			router.push('/login');
		},
		async refreshToken() {
			// this.user = await fetchWrapper.post(`${baseUrl}/refresh-token`, {}, { credentials: 'include' });
			this.user = (await authRefreshToken()).data;
			this.startRefreshTokenTimer();
		},
		startRefreshTokenTimer() {
			// parse json object from base64 encoded jwt token
			// const jwtBase64 = this.user.jwtToken.split('.')[1];
			const jwtBase64 = getLS('accessToken')?.split('.')?.[1] || ''; // this.user?.access_token?.split?.('.')?.[1] || '';
			const jwtToken = JSON.parse(atob(jwtBase64));

			// set a timeout to refresh the token a minute before it expires
			const expires = new Date(jwtToken.exp * 1000);
			const timeout = expires.getTime() - Date.now() - 60 * 1000;
			this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
		},
		stopRefreshTokenTimer() {
			clearTimeout(this.refreshTokenTimeout);
		}
	},
	getters: {
		isLogged: (state) => !!state.user,
		isNotAuth: (state) => !state.user
	}
});