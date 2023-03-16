import { useFetch } from '@helpers/index';

const getApiUrl = (...args: any) => {
	let apiUrl: string = 'api/section';
	if (!!args && !!args?.length) return `${apiUrl}/${args[0]}`;
	return apiUrl;
};

const get = async () => {
	return useFetch.get(getApiUrl());
};

const getAll = async () => {
	return useFetch.get(getApiUrl());
};

const getSectionsByType = async (type: string) => {
	return useFetch.get(getApiUrl(`type/${type}`));
};

const getById = async (id: string) => {
	return useFetch.get(getApiUrl(`detail/${id}`));
};

const getSectionByKey = async (key: string) => {
	return useFetch.get(getApiUrl(key));
};

export { get, getAll, getById, getSectionsByType, getSectionByKey };
export default { get, getAll, getById, getSectionsByType, getSectionByKey };