import { useFetch } from '@helpers/index';

const getApiUrl = (apiUrl: string) => {
	return (...args: any) => {
		// let apiUrl: string = 'api/category';
		if (!!args && !!args?.length) return `${apiUrl}/${args[0]}`;
		return apiUrl;
	};
};

const apiMore: string = 'api/category';

const getAll = async () => {
	return useFetch.get(getApiUrl(apiMore)());
};

const getById = async (id: string) => {
	return useFetch.get(getApiUrl(apiMore)(id));
};

export { getAll, getById };
export default { getAll, getById };