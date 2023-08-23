import { defineStore } from 'pinia';
import service from '@services/category.service';
import { isEmptyObject } from '@helpers/index';
import { ICategory } from '@models/category';

interface CategoryState {
	category: { data: ICategory | undefined | null; loading: boolean; errors: any[] };
	categories: { data: ICategory[] | null; loading: boolean; errors: any[] };
	mainCategories: { data: ICategory[] | null; loading: boolean; errors: any[] };
	newOrEditId: number | string | undefined | null;
}

const initialState = {
	category: { data: null, loading: false, errors: [] },
	categories: { data: [], loading: false, errors: [] },
	mainCategories: { data: [], loading: false, errors: [] },
	newOrEditId: null
} as CategoryState;

export const useCategoryStore = defineStore({
	id: 'categories',
	state: () => ({ ...initialState }),
	persist: true,
	actions: {
		async updateEditingId(newValue: string | number | undefined | null) {
			this.newOrEditId = newValue;
		},
		async getAll() {
			this.categories.loading = true;

			await service
				.getAll()
				.then(async (data) => await data.data)
				.then((data) => (this.categories.data = data))
				.catch((error) => {
					this.categories.data = [];
					this.categories.errors.push(error);
				})
				.finally(() => (this.categories.loading = false));
		},
		async getAllTopCategories() {
			this.mainCategories.loading = true;

			await service
				.getAll()
				.then(async (data) => await data.data)
				.then((data) => (this.mainCategories.data = data.filter((category: ICategory) => category.parentId === null)))
				.catch((error) => {
					this.mainCategories.data = [];
					this.mainCategories.errors.push(error);
				})
				.finally(() => (this.mainCategories.loading = false));
		},
		async getById(id: string) {
			this.category.loading = true;
			await this.updateEditingId(id);

			await service
				.getById(id)
				.then(async (data) => await data.data)
				.then((data) => (this.category.data = data))
				.catch((error) => {
					this.category.data = null;
					this.category.errors.push(error);
				})
				.finally(() => {
					this.category.loading = false;
					this.getAll();
				});
		}
	},
	getters: {
		isCategory: (state) => !!state.category.data && !isEmptyObject(state.category.data),
		isCategories: (state) => !!state.categories?.data?.length,
		isMainCategories: (state) => !!state.categories?.data?.length,
		isEmptyCategory: (state) => !!state.category.data && isEmptyObject(state.category.data!),
		isEmptyCategories: (state) => !state.categories?.data || state.categories.data?.length === 0,
		isMainEmptyCategories: (state) => state.categories.data?.length === 0,
		isErrorCategory: (state) => !!state.category.errors?.length,
		isErrorCategories: (state) => !!state.categories.errors?.length,
		isMainErrorCategories: (state) => !!state.categories.errors?.length,

		isEditingCategory: (state) => !!state.newOrEditId && (typeof state.newOrEditId === 'string' || (typeof state.newOrEditId === 'number' && state.newOrEditId > -1)),
		isNewCategory: (state) => !state.newOrEditId,

		getCategory: (state) => state.category.data || {},
		getCategories: (state) => state.categories.data || [],
		getMainCategories: (state) => state.categories.data || [],
		getCategoryErrors: (state) => state.category.errors || {},
		getCategoriesErrors: (state) => state.categories.errors || [],
		getMainCategoriesErrors: (state) => state.categories.errors || []
	}
});