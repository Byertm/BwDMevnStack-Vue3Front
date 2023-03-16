import { defineStore } from 'pinia';
import service from '@services/section.service';
import { isEmptyObject } from '@helpers/index';
import type { ISection, TSectionType } from '@models/section';

interface SectionState {
	section: { data: ISection | undefined | null; loading: boolean; errors: any[] };
	sections: { data: ISection[] | undefined | null; loading: boolean; errors: any[] };
}

const initialState = {
	section: { data: null, loading: false, errors: [] },
	sections: { data: null, loading: false, errors: [] }
} as SectionState;

export const useSectionStore = defineStore({
	id: 'sections',
	state: () => ({ ...initialState }),
	persist: true,
	actions: {
		async get() {
			this.sections.loading = true;

			await service
				.get()
				.then(async (data) => await data.data)
				.then((data) => (this.sections.data = data))
				.catch((error) => {
					this.sections.data = null;
					this.sections.errors.push(error);
				})
				.finally(() => (this.sections.loading = false));
		},
		async getAll() {
			this.sections.loading = true;

			await service
				.getAll()
				.then(async (data) => await data.data)
				.then((data) => (this.sections.data = data))
				.catch((error) => {
					this.sections.data = null;
					this.sections.errors.push(error);
				})
				.finally(() => (this.sections.loading = false));
		},
		async getAllSectionByType(type: TSectionType) {
			this.section.loading = true;

			await service
				.getSectionsByType(type)
				.then(async (data) => await data.data)
				.then((data) => (this.section.data = data))
				.catch((error) => {
					this.section.data = null;
					this.section.errors.push(error);
				})
				.finally(() => (this.section.loading = false));
		},
		async getSectionByKey(key: string) {
			this.section.loading = true;

			await service
				.getSectionByKey(key)
				.then(async (data) => await data.data)
				.then((data) => (this.section.data = data))
				.catch((error) => {
					this.section.data = null;
					this.section.errors.push(error);
				})
				.finally(() => (this.section.loading = false));
		}
	},
	getters: {
		isSection: (state) => !!state?.section?.data && !isEmptyObject(state.section.data),
		isEmptySection: (state) => !!state?.section?.data && isEmptyObject(state.section.data!),
		isErrorSection: (state) => !!state?.section?.errors?.length,

		getSection: (state) => (!!state?.section?.data ? (state.section.data as ISection) : {} || {}),
		getSectionErrors: (state) => state?.section?.errors || [],

		isSections: (state) => !!state?.sections?.data && !isEmptyObject(state.sections.data),
		isEmptySections: (state) => !!state?.sections?.data && isEmptyObject(state.sections.data!),
		isErrorSections: (state) => !!state?.sections?.errors?.length,

		getSections: (state) => (state?.sections?.data ? (state.sections.data as Array<ISection>) : {} || {}),
		getSectionsErrors: (state) => state?.sections?.errors || []
	}
});