import { defineStore } from 'pinia';
import service from '@services/post.service';
import { isEmptyObject } from '@helpers/index';
import { IPost } from '@models/post';

interface PostState {
	post: { data: IPost | undefined | null; loading: boolean; errors: any[] };
	posts: { data: IPost[] | null; loading: boolean; errors: any[] };
	recommendedPosts: { data: IPost[] | null; loading: boolean; errors: any[] };
	tagPosts: { data: IPost[] | null; loading: boolean; errors: any[] };
	categoryPosts: { data: IPost[] | null; loading: boolean; errors: any[] };
	newOrEditId: number | string | undefined | null;
}

const initialState = {
	post: { data: null, loading: false, errors: [] },
	posts: { data: [], loading: false, errors: [] },
	recommendedPosts: { data: [], loading: false, errors: [] },
	tagPosts: { data: [], loading: false, errors: [] },
	categoryPosts: { data: [], loading: false, errors: [] },
	newOrEditId: null
} as PostState;

export const usePostStore = defineStore({
	id: 'posts',
	state: () => ({ ...initialState }),
	persist: true,
	actions: {
		async updateEditingId(newValue: string | number | undefined | null) {
			this.newOrEditId = newValue;
		},
		async setDefaultPost() {
			this.post = initialState.post;
		},
		async setAllRecommendedPosts() {
			this.recommendedPosts.loading = true;
			try {
				this.recommendedPosts.data = this.isPosts
					? this.posts.data!.filter((post: IPost) => !this.isPost || (this.isPost && post.id !== this.post.data!.id)).slice(0, 2)
					: [];
			} catch (error) {
				this.recommendedPosts.errors.push(error);
			}
			this.recommendedPosts.loading = false;
		},
		async getAll() {
			this.posts.loading = true;

			await service
				.getAll()
				.then(async (data) => await data.data)
				.then((data) => (this.posts.data = data))
				.catch((error) => {
					this.posts.data = [];
					this.posts.errors.push(error);
				})
				.finally(() => (this.posts.loading = false));
		},
		async getAllByTag(tagSlug: string) {
			this.tagPosts.loading = true;

			await service
				.getAllByTag(tagSlug)
				.then(async (data) => await data.data)
				.then((data) => {
					this.tagPosts.data = data;
				})
				.catch((error) => {
					this.tagPosts.data = null;
					this.tagPosts.errors.push(error);
				})
				.finally(() => {
					this.tagPosts.loading = false;
				});
		},
		async getAllByCategory(categorySlug: string) {
			this.categoryPosts.loading = true;

			await service
				.getAllByCategory(categorySlug)
				.then(async (data) => await data.data)
				.then((data) => {
					this.categoryPosts.data = data;
				})
				.catch((error) => {
					this.categoryPosts.data = null;
					this.categoryPosts.errors.push(error);
				})
				.finally(() => {
					this.categoryPosts.loading = false;
				});
		},
		async getAllRecommendedPosts() {
			this.recommendedPosts.loading = true;

			await service
				.getAll()
				.then(async (data) => await data.data)
				.then((data) => (this.recommendedPosts.data = data.filter((post: IPost) => !this.isPost || (this.isPost && post.id !== this.post.data!.id)).slice(0, 2) || []))
				.catch((error) => {
					this.recommendedPosts.data = [];
					this.recommendedPosts.errors.push(error);
				})
				.finally(() => (this.recommendedPosts.loading = false));
		},
		async getById(id: string) {
			this.post.loading = true;
			await this.setDefaultPost();
			await this.updateEditingId(id);

			await service
				.getById(id)
				.then(async (data) => await data.data)
				.then((data) => {
					this.post.data = data;
					this.setAllRecommendedPosts();
				})
				.catch((error) => {
					this.post.data = null;
					this.post.errors.push(error);
				})
				.finally(() => {
					this.post.loading = false;
					this.getAll();
				});
		},
		async getBySlug(slug: string) {
			this.post.loading = true;
			// await this.updateEditingId(slug);
			await this.setDefaultPost();

			await service
				.getBySlug(slug)
				.then(async (data) => await data.data)
				.then((data) => {
					this.post.data = data;
					this.setAllRecommendedPosts();
				})
				.catch((error) => {
					this.post.data = null;
					this.post.errors.push(error);
				})
				.finally(() => {
					this.post.loading = false;
					// this.getAll();
				});
		},
		async newPost(post: Partial<IPost>): Promise<boolean> {
			this.post.loading = true;

			let returnVal: Promise<boolean> = Promise.resolve(false);

			await service
				.newPost(post)
				.then(async (data) => await data.data)
				.then((data) => {
					returnVal = Promise.resolve(true);
					this.post.data = data;
				})
				.catch((error) => {
					this.post.data = null;
					this.post.errors.push(error);
					returnVal = Promise.reject(false);
				})
				.finally(() => ((this.post.loading = false), this.getAll()));

			return returnVal;
		},
		async updatePost(post: Partial<IPost>) {
			this.post.loading = true;
			await this.updateEditingId(null);

			let returnVal: Promise<boolean> = Promise.resolve(false);

			await service
				.updatePost(post)
				.then(async (data) => await data.data)
				.then((data) => {
					returnVal = Promise.resolve(true);
					this.post.data = data;
				})
				.catch((error) => {
					this.post.data = null;
					this.post.errors.push(error);
					returnVal = Promise.reject(false);
				})
				.finally(() => ((this.post.loading = false), this.getAll()));

			return returnVal;
		},
		async delete(id: string) {
			this.post.loading = true;

			let returnVal: Promise<boolean> = Promise.resolve(false);

			await service
				.deletePost(id)
				.then(async (data) => await data.data)
				.then(() => {
					returnVal = Promise.resolve(true);
					this.getAll();
				})
				.catch((error) => {
					this.post.errors.push(error);
					returnVal = Promise.reject(false);
				})
				.finally(() => ((this.post.loading = false), this.getAll()));

			return returnVal;
		}
	},
	getters: {
		isPost: (state) => !!state.post.data && !isEmptyObject(state.post.data),
		isPosts: (state) => !!state.posts?.data?.length,
		isTagPosts: (state) => !!state.tagPosts?.data?.length,
		isCategoryPosts: (state) => !!state.categoryPosts?.data?.length,
		isRecommendedPosts: (state) => !!state.recommendedPosts?.data?.length,
		isEmptyPost: (state) => !!state.post.data && isEmptyObject(state.post.data!),
		isEmptyPosts: (state) => state.posts.data?.length === 0,
		isEmptyTagPosts: (state) => state.tagPosts.data?.length === 0,
		isEmptyCategoryPosts: (state) => state.categoryPosts.data?.length === 0,
		isRecommendedEmptyPosts: (state) => state.recommendedPosts.data?.length === 0,
		isErrorPost: (state) => !!state.post.errors?.length,
		isErrorPosts: (state) => !!state.posts.errors?.length,
		isErrorTagPosts: (state) => !!state.tagPosts.errors?.length,
		isErrorCategoryPosts: (state) => !!state.categoryPosts.errors?.length,
		isRecommendedErrorPosts: (state) => !!state.recommendedPosts.errors?.length,

		isEditingPost: (state) => !!state.newOrEditId && (typeof state.newOrEditId === 'string' || (typeof state.newOrEditId === 'number' && state.newOrEditId > -1)),
		isNewPost: (state) => !state.newOrEditId,

		getPost: (state) => (state.post.data ? state.post.data : {} || {}),
		getPosts: (state) => state.posts.data || [],
		getTagPosts: (state) => state.tagPosts.data || [],
		getCategoryPosts: (state) => state.categoryPosts.data || [],
		getRecommendedPosts: (state) => state.recommendedPosts.data || [],
		getPostErrors: (state) => state.post.errors || {},
		getPostsErrors: (state) => state.posts.errors || [],
		getTagPostsErrors: (state) => state.tagPosts.errors || [],
		getCategoryPostsErrors: (state) => state.categoryPosts.errors || [],
		getRecommendedPostsErrors: (state) => state.recommendedPosts.errors || [],

		getPostId: (state) => (state.post.data && state.post.data.id ? state.post.data.id : undefined || undefined)
	}
});