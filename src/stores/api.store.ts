import { defineStore } from 'pinia';
import api from '@services/api.service';
import { isEmptyObject } from '@helpers/index';
import type { TApi, IApiCheck, IApiHealth } from '@models/api';

type StateApiType<TypeApi> = { data: Partial<TypeApi> | undefined | null; loading: boolean; errors: any[] };

interface ApiState {
	api: StateApiType<TApi>; //{ data: Partial<TApi> | undefined | null; loading: boolean; errors: any[] };
	apiCheck: StateApiType<IApiCheck>; //{ data: Partial<IApiCheck> | undefined | null; loading: boolean; errors: any[] };
	apiHealth: StateApiType<IApiHealth>; // { data: Partial<IApiHealth> | undefined | null; loading: boolean; errors: any[] };
}

const initialState = {
	api: { data: null, loading: false, errors: [] },
	apiCheck: { data: null, loading: false, errors: [] },
	apiHealth: { data: null, loading: false, errors: [] }
} as ApiState;

export const useApiStore = defineStore({
	id: 'apiOptions',
	state: () => ({ ...initialState }),
	persist: true,
	actions: {
		async setApi(pApi: StateApiType<TApi>) {
			const { data, errors, loading } = pApi;

			this.api.data = data;
			this.api.errors = errors;
			this.api.loading = loading;
		},
		async check() {
			this.apiCheck.loading = true;

			await api
				.check()
				.then(async (data) => await data.data)
				.then((data) => (this.apiCheck.data = data))
				.catch((error) => {
					this.apiCheck.data = null;
					this.apiCheck.errors.push(error);
				})
				.finally(() => {
					this.apiCheck.loading = false;
					this.setApi(this.apiCheck as StateApiType<TApi>);
				});
		},
		async health() {
			this.apiHealth.loading = true;

			await api
				.health()
				.then(async (data) => await data.data)
				.then((data) => (this.apiHealth.data = data))
				.catch((error) => {
					this.apiHealth.data = null;
					this.apiHealth.errors.push(error);
				})
				.finally(() => {
					this.apiHealth.loading = false;
					this.setApi(this.apiHealth as StateApiType<TApi>);
				});
		},
		async checkOrHealth(pType: 'check' | 'health') {
			this.api.loading = true;

			if (pType === 'check') {
				await this.check();

				this.api.data = this.apiCheck.data as TApi;
				this.api.errors = this.apiCheck.errors;
			} else {
				await this.health();

				this.api.data = this.apiHealth.data as TApi;
				this.api.errors = this.apiHealth.errors;
			}

			this.api.loading = false;
		}
	},
	getters: {
		isApi: (state) => !!state?.api?.data && !isEmptyObject(state.api.data),
		isEmptyApi: (state) => !!state?.api?.data && isEmptyObject(state.api.data!),
		isErrorApi: (state) => !!state?.api?.errors?.length,

		isApiCheck: (state) => !!state?.apiCheck?.data?.statusCode && !isEmptyObject(state.apiCheck.data?.statusCode),
		isEmptyApiCheck: (state) => !!state?.apiCheck?.data?.statusCode && isEmptyObject(state.apiCheck.data?.statusCode),
		isErrorApiCheck: (state) => !!state?.apiCheck?.errors?.length,

		isApiHealth: (state) => !!state?.apiHealth?.data?.message && !isEmptyObject(state.apiHealth.data?.message),
		isEmptyApiHealth: (state) => !!state?.apiHealth?.data?.message && isEmptyObject(state.apiHealth.data?.message),
		isErrorApiHealth: (state) => !!state?.apiHealth?.errors?.length,

		getApi: (state) => (!!state?.api?.data ? (state.api.data as Partial<TApi>) : {} || {}),
		getApiErrors: (state) => state?.api?.errors || [],

		getApiCheck: (state) => (!!state?.apiCheck?.data ? (state.apiCheck.data as Partial<IApiCheck>) : {} || {}),
		getApiCheckErrors: (state) => state?.apiCheck?.errors || [],
		getApiHealth: (state) => (!!state?.apiHealth?.data ? (state.apiHealth.data as Partial<IApiHealth>) : {} || {}),
		getApiHealthErrors: (state) => state?.apiHealth?.errors || []
	}
});