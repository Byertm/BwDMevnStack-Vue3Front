import { IPost } from '@models/post';
import { useFetch } from '@helpers/index';

// Todo: Axios Instance a arabir api pathler için instance oluştur.
// Todo: Axios için signal (AbortController) ve cancelToken kullanımını düşün.
const getApiUrl = (apiUrl: string) => {
	return (...args: any): string => {
		// let apiUrl: string = 'api/post';
		if (!!args && !!args?.length) return `${apiUrl}/${args[0]}`;
		return apiUrl;
	};
};

const apiMore: string = 'api/post';

const getAll = async () => {
	return useFetch.get(getApiUrl(apiMore)());
};

const getById = async (id: string) => {
	return useFetch.get(getApiUrl(apiMore)(id));
};

const getBySlug = async (slug: string) => {
	return useFetch.get(getApiUrl(`${apiMore}/detail`)(slug));
};

const getAllByTag = async (tagSlug: string) => {
	return useFetch.get(getApiUrl(`${apiMore}/tag`)(tagSlug));
};

const getAllByCategory = async (categorySlug: string) => {
	return useFetch.get(getApiUrl(`${apiMore}/category`)(categorySlug));
};

const newPost = async (post: Partial<IPost>) => {
	const { id, updateUserId, createUserId, createdAt, updatedAt, ...data } = post;
	return useFetch.post(getApiUrl(apiMore)(), { data: data });
};

const updatePost = async (post: Partial<IPost>) => {
	const { id, createUserId, createdAt, updatedAt, ...data } = post;
	return useFetch.patch(getApiUrl(apiMore)(post.id), { data: data });
};

const deletePost = async (id: string) => {
	return useFetch.delete(getApiUrl(apiMore)(id));
};

export { getAll, getById, getBySlug, getAllByTag, getAllByCategory, newPost, updatePost, deletePost };
export default { getAll, getById, getBySlug, getAllByTag, getAllByCategory, newPost, updatePost, deletePost };