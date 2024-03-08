import { useFetch } from '@helpers/index';

const getApiUrl = (...args: any) => {
	let apiUrl: string = '';
	if (!!args && !!args?.length) return `${apiUrl}/${args[0]}`;
	return apiUrl;
};

const check = async () => {
	return useFetch.get(getApiUrl('check'));
};

const health = async () => {
	return useFetch.get(getApiUrl('health'));
};

export { check, health };
export default { check, health };