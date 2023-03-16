import { useFetch } from '@helpers/index';

const getApiUrl = (...args: any) => {
	let apiUrl: string = 'api/site';
	if (!!args && !!args?.length) return `${apiUrl}/${args[0]}`;
	return apiUrl;
};

const get = async () => {
	return useFetch.get(getApiUrl());
};

const getAll = async () => {
	return useFetch.get(getApiUrl());
};

const getById = async (id: string) => {
	return useFetch.get(getApiUrl(id));
};

export { get, getAll, getById };
export default { get, getAll, getById };