import { defineStore } from 'pinia';
import service from '@services/comment.service';
import { isEmptyObject } from '@helpers/index';
import { IComment } from '@models/comment';

interface CommentState {
	comment: { data: IComment | undefined | null; loading: boolean; errors: any[] };
	comments: { data: IComment[] | null; loading: boolean; errors: any[] };
	newOrEditId: number | string | undefined | null;
}

const initialState = {
	comment: { data: null, loading: false, errors: [] },
	comments: { data: [], loading: false, errors: [] },
	newOrEditId: null
} as CommentState;

export const useCommentStore = defineStore({
	id: 'comments',
	state: () => ({ ...initialState }),
	persist: true,
	actions: {
		async updateEditingId(newValue: string | number | undefined | null) {
			this.newOrEditId = newValue;
		},
		async getAll() {
			this.comments.loading = true;

			await service
				.getAll()
				.then(async (data) => await data.data)
				.then((data) => (this.comments.data = data))
				.catch((error) => {
					this.comments.data = [];
					this.comments.errors.push(error);
				})
				.finally(() => (this.comments.loading = false));
		},
		async getAllByPostId(postId: string) {
			this.comments.loading = true;

			await service
				.getAllByPostId(postId)
				.then(async (data) => await data.data)
				.then((data) => (this.comments.data = data))
				.catch((error) => {
					this.comments.data = [];
					this.comments.errors.push(error);
				})
				.finally(() => (this.comments.loading = false));
		},
		async getById(id: string) {
			this.comment.loading = true;
			await this.updateEditingId(id);

			await service
				.getById(id)
				.then(async (data) => await data.data)
				.then((data) => (this.comment.data = data))
				.catch((error) => {
					this.comment.data = null;
					this.comment.errors.push(error);
				})
				.finally(() => {
					this.comment.loading = false;
					this.getAll();
				});
		},
		async newComment(comment: Partial<IComment>): Promise<boolean> {
			this.comment.loading = true;

			let returnVal: Promise<boolean> = Promise.resolve(false);

			await service
				.newComment(comment)
				.then(async (data) => await data.data)
				.then((data) => {
					returnVal = Promise.resolve(true);
					this.comment.data = data;
				})
				.catch((error) => {
					this.comment.data = null;
					this.comment.errors.push(error);
					returnVal = Promise.reject(false);
				})
				.finally(() => ((this.comment.loading = false)));

			return returnVal;
		},
		async updateComment(comment: Partial<IComment>) {
			this.comment.loading = true;
			await this.updateEditingId(null);

			let returnVal: Promise<boolean> = Promise.resolve(false);

			await service
				.updateComment(comment)
				.then(async (data) => await data.data)
				.then((data) => {
					returnVal = Promise.resolve(true);
					this.comment.data = data;
				})
				.catch((error) => {
					this.comment.data = null;
					this.comment.errors.push(error);
					returnVal = Promise.reject(false);
				})
				.finally(() => ((this.comment.loading = false)));

			return returnVal;
		},
		async delete(id: string) {
			this.comment.loading = true;

			let returnVal: Promise<boolean> = Promise.resolve(false);

			await service
				.deleteComment(id)
				.then(async (data) => await data.data)
				.then((data) => {
					returnVal = Promise.resolve(true);
					// this.datas.push(data);
					this.getAll();
				})
				.catch((error) => {
					this.comment.errors.push(error);
					returnVal = Promise.reject(false);
				})
				.finally(() => ((this.comment.loading = false)));

			return returnVal;
		}
	},
	getters: {
		isComment: (state) => !!state.comment.data && !isEmptyObject(state.comment.data),
		isComments: (state) => !!state.comments?.data?.length,
		isEmptyComment: (state) => !!state.comment.data && isEmptyObject(state.comment.data!),
		isEmptyComments: (state) => state.comments.data?.length === 0,
		isErrorComment: (state) => !!state.comment.errors?.length,
		isErrorComments: (state) => !!state.comments.errors?.length,

		isEditingComment: (state) => !!state.newOrEditId && (typeof state.newOrEditId === 'string' || (typeof state.newOrEditId === 'number' && state.newOrEditId > -1)),
		isNewComment: (state) => !state.newOrEditId,

		getComment: (state) => state.comment.data || {},
		getComments: (state) => state.comments.data || [],
		getCommentErrors: (state) => state.comment.errors || {},
		getCommentsErrors: (state) => state.comments.errors || []
	}
});