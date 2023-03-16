import { IUser } from '@models/user';
import { useFetch } from '@helpers/index';

// Todo: Axios Instance a arabir api pathler için instance oluştur.
// Todo: Axios için signal (AbortController) ve cancelToken kullanımını düşün.
const getApiUrl = (...args: any) => {
	let apiUrl: string = 'api/user';
	if (!!args && !!args?.length) return `${apiUrl}/${args[0]}`;
	return apiUrl;
};

const getAll = async () => {
	return useFetch.get(getApiUrl());
};

const getById = async (id: string) => {
	return useFetch.get(getApiUrl(id));
};

const newUser = async (user: Partial<IUser>) => {
	const { id, ...data } = user;
	return useFetch.post(getApiUrl(), { data: data });
};

const updateUser = async (user: Partial<IUser>) => {
	const { id, ...data } = user;
	return useFetch.patch(getApiUrl(user.id), { data: data });
};

// const deleteUser = async (id: string) => {
// 	return useFetch.delete(getApiUrl(id));
// };

export { getAll, getById, newUser, updateUser };
export default { getAll, getById, newUser, updateUser };