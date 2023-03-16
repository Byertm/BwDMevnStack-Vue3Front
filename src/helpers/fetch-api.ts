import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAxios } from '@vueuse/integrations/useAxios';
import { computed, reactive, shallowRef } from 'vue';
import { getLS, getLSWithParse, setLSWithModel, setLSWithStringfyForData } from '@plugins/index';
import { API_URL } from '@plugins/mixins';

export enum EFetchTypes {
	ALL = 'ALL',
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	UPDATE = 'UPDATE',
	OPTIONS = 'OPTIONS',
	DELETE = 'DELETE'
}

export type TFetchTypes = `${EFetchTypes}`;

// baseURL: '/api'
const instance = axios.create({ baseURL: API_URL, headers: { 'Content-type': 'application/json' } });

function refreshToken() {
	const user = getLSWithParse('user');
	// ! Todo: Buradaki email kalkacak başba bir yol düşünülecek.
	const userEmail = !!user?.email ? user.email : 'ersin@mail.com';
	return instance.post('refreshToken', { email: userEmail, refreshToken: getLS('refreshToken') });
}

instance.interceptors.request.use(
	(config) => {
		const token = getLS('accessToken');
		if (token) config.headers['Authorization'] = `Bearer ${token}`;
		config.headers['x-access-url'] = 'BwDWeb';

		return config;
	},
	(error) => Promise.reject(error)
);

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const originalConfig = err.config;

		if (err.response) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;

				try {
					const rs = await refreshToken();
					const { user, token: accessToken } = rs.data;

					if (user) {
						setLSWithStringfyForData({ key: 'user', value: user });
						setLSWithModel({ key: 'accessToken', value: accessToken });
						setLSWithModel({ key: 'refreshToken', value: user.refresh_token });
						instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
						instance.defaults.headers.common['x-access-url'] = 'BwDWeb';
						// instance.defaults.headers.common['x-access-token'] = accessToken;
					} else delete instance.defaults.headers.common['Authorization'];

					return instance(originalConfig);
				} catch (_error: any) {
					if (_error.response && _error.response.data) {
						return Promise.reject(_error.response.data);
					}

					return Promise.reject(_error);
				}
			}

			if (err.response.status === 403 && err.response.data) {
				return Promise.reject(err.response.data);
			}
		}

		return Promise.reject(err);
	}
);

type CustomConfig = { skip?: boolean };
type CustomAxiosRequestConfig = AxiosRequestConfig & CustomConfig;

export const useFetch = async (url: string, config: CustomAxiosRequestConfig = {}) => {
	type TFetchData = { data: any; error: unknown | null; loading: boolean; response: AxiosResponse | null };
	const fetchData: TFetchData = reactive({ data: null, error: null, loading: false, response: null });

	const fetch = async () => {
		fetchData.loading = true;

		try {
			const options: AxiosRequestConfig = { url, ...config };
			const result = await instance.request(options);
			fetchData.response = result;
			fetchData.data = result.data;
		} catch (ex: unknown) {
			fetchData.error = ex;
		} finally {
			fetchData.loading = false;
		}
	};

	!config.skip && (await fetch());

	const { response, error, data, loading } = fetchData;

	return { response, error, data, loading, fetch };
};

const cacheMap = reactive(new Map());

export const useFetchCache = async (key: string | Symbol, url: string, config: CustomAxiosRequestConfig = {}) => {
	let info = await useFetch(url, { skip: true, ...config });

	const update = () => cacheMap.set(key, info?.response);
	const clear = () => cacheMap.set(key, undefined);

	const fetch = async () => {
		try {
			info = await useFetch(url, { skip: false, ...config });
			update();
		} catch {
			clear();
		}
	};

	const response = computed(() => cacheMap.get(key));
	const data = computed(() => response.value?.data);

	if (response.value === null || response.value === undefined) fetch();

	return { ...info, data, response, clear, fetch };
};

export const useAxiosFetch = async (url: string, config: CustomAxiosRequestConfig = {}) => {
	if (config.skip) {
		const response = shallowRef(null);
		const isLoading = shallowRef(false);
		const isFinished = shallowRef(true);
		return { response, isLoading, isFinished };
	} else {
		const { data, error, isAborted, isCanceled, isFinished, isLoading, response, abort, cancel, execute } = await useAxios(url, config, instance);
		return { data, error, isAborted, isCanceled, isFinished, isLoading, response, abort, cancel, execute };
	}
};

const cacheUseAxiosMap = reactive(new Map());

export const useAxiosFetchCache = async (key: string | Symbol, url: string, config: CustomAxiosRequestConfig = {}) => {
	let useAxiosInfo = await useAxiosFetch(url, { skip: true, ...config });

	const update = () => cacheUseAxiosMap.set(key, useAxiosInfo?.response?.value);
	const clear = () => cacheUseAxiosMap.set(key, undefined);

	const fetch = async () => {
		try {
			useAxiosInfo = await useAxiosFetch(url, { skip: false, ...config });
			update();
		} catch {
			clear();
		}
	};

	const response = computed(() => cacheUseAxiosMap.get(key));
	const data = computed(() => response.value?.data);

	if (response.value === null || response.value === undefined) await fetch();

	return { ...useAxiosInfo, data, response, clear, fetch };
};

function requestFetch(method: TFetchTypes) {
	return (url: string, config: CustomAxiosRequestConfig = {}) => {
		return useFetch(url, { ...config, method });
	};
}

function requestFetchCache(method: TFetchTypes) {
	return (key: string | Symbol, url: string, config: CustomAxiosRequestConfig = {}) => {
		return useFetchCache(key, url, { ...config, method });
	};
}

function requestAxiosFetch(method: TFetchTypes) {
	return (url: string, config: CustomAxiosRequestConfig = {}) => {
		return useFetch(url, { ...config, method });
	};
}

function requestAxiosFetchCache(method: TFetchTypes) {
	return (key: string | Symbol, url: string, config: CustomAxiosRequestConfig = {}) => {
		return useFetchCache(key, url, { ...config, method });
	};
}

export const customFetch = {
	delete: requestFetch('DELETE'),
	get: requestFetch('GET'),
	patch: requestFetch('PATCH'),
	post: requestFetch('POST'),
	put: requestFetch('PUT')
};

export const customFetchCache = {
	delete: requestFetchCache('DELETE'),
	get: requestFetchCache('GET'),
	patch: requestFetchCache('PATCH'),
	post: requestFetchCache('POST'),
	put: requestFetchCache('PUT')
};

export const customAxiosFetch = {
	delete: requestAxiosFetch('DELETE'),
	get: requestAxiosFetch('GET'),
	patch: requestAxiosFetch('PATCH'),
	post: requestAxiosFetch('POST'),
	put: requestAxiosFetch('PUT')
};

export const customAxiosFetchCache = {
	delete: requestAxiosFetchCache('DELETE'),
	get: requestAxiosFetchCache('GET'),
	patch: requestAxiosFetchCache('PATCH'),
	post: requestAxiosFetchCache('POST'),
	put: requestAxiosFetchCache('PUT')
};

export default customFetchCache;