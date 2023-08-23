import { defineStore } from 'pinia';
import service from '@services/experience.service';
import { isEmptyObject } from '@helpers/index';
import { IExperience } from '@models/experience';

interface ExperienceState {
	experience: { data: IExperience | undefined | null; loading: boolean; errors: any[] };
	experiences: { data: IExperience[] | null; loading: boolean; errors: any[] };
	newOrEditId: number | string | undefined | null;
}

const initialState = {
	experience: { data: null, loading: false, errors: [] },
	experiences: { data: [], loading: false, errors: [] },
	newOrEditId: null
} as ExperienceState;

export const useExperienceStore = defineStore({
	id: 'experiences',
	state: () => ({ ...initialState }),
	persist: true,
	actions: {
		async updateEditingId(newValue: string | number | undefined | null) {
			this.newOrEditId = newValue;
		},
		async getAll() {
			this.experiences.loading = true;

			await service
				.getAll()
				.then(async (data) => await data.data)
				.then((data) => (this.experiences.data = data))
				.catch((error) => {
					this.experiences.data = [];
					this.experiences.errors.push(error);
				})
				.finally(() => (this.experiences.loading = false));
		},
		async getById(id: string) {
			this.experience.loading = true;
			await this.updateEditingId(id);

			await service
				.getById(id)
				.then(async (data) => await data.data)
				.then((data) => (this.experience.data = data))
				.catch((error) => {
					this.experience.data = null;
					this.experience.errors.push(error);
				})
				.finally(() => {
					this.experience.loading = false;
					this.getAll();
				});
		}
	},
	getters: {
		isExperience: (state) => !!state.experience.data && !isEmptyObject(state.experience.data),
		isExperiences: (state) => !!state.experiences?.data?.length,
		isEmptyExperience: (state) => !!state.experience.data && isEmptyObject(state.experience.data!),
		isEmptyExperiences: (state) => !state.experiences?.data || state.experiences.data?.length === 0,
		isErrorExperience: (state) => !!state.experience.errors?.length,
		isErrorExperiences: (state) => !!state.experiences.errors?.length,

		isEditingExperience: (state) => !!state.newOrEditId && (typeof state.newOrEditId === 'string' || (typeof state.newOrEditId === 'number' && state.newOrEditId > -1)),
		isNewExperience: (state) => !state.newOrEditId,

		getExperience: (state) => state.experience.data || {},
		getExperiences: (state) => state.experiences.data || [],
		getExperienceErrors: (state) => state.experience.errors || {},
		getExperiencesErrors: (state) => state.experiences.errors || []
	}
});