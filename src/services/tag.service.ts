import { useFetch } from '@helpers/index';

const getApiUrl = (...args: any) => {
	let apiUrl: string = 'api/tag';
	if (!!args && !!args?.length) return `${apiUrl}/${args[0]}`;
	return apiUrl;
};

const getAll = async () => {
	return useFetch.get(getApiUrl());
};

const getById = async (id: string) => {
	return useFetch.get(getApiUrl(id));
};

export { getAll, getById };
export default { getAll, getById };