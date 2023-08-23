import { defineStore } from 'pinia';
import service from '@services/site.service';
import { isEmptyObject } from '@helpers/index';
import type { ISite, ISiteOwner, ISiteLogo, ISiteSection } from '@models/site';

interface SiteState {
	site: { data: ISite | undefined | null; loading: boolean; errors: any[] };
	siteWebAddress: string;
}

const initialState = { site: { data: null, loading: false, errors: [] }, siteWebAddress: '' } as SiteState;

export const useSiteStore = defineStore({
	id: 'siteOptions',
	state: () => ({ ...initialState }),
	persist: true,
	actions: {
		async get() {
			this.site.loading = true;

			await service
				.get()
				.then(async (data) => await data.data)
				.then((data) => (this.site.data = data))
				.catch((error) => {
					this.site.data = null;
					this.site.errors.push(error);
				})
				.finally(() => {
					this.site.loading = false;
				});
		},
		async setSiteWebAddress() {
			this.siteWebAddress = location.origin;
		}
	},
	getters: {
		isSiteWebAddress: (state) => !!state?.siteWebAddress,

		isSite: (state) => !!state?.site?.data && !isEmptyObject(state.site.data),
		isEmptySite: (state) => !!state?.site?.data && isEmptyObject(state.site.data!),
		isErrorSite: (state) => !!state?.site?.errors?.length,

		isSiteOwner: (state) => !!state?.site?.data?.owner && !isEmptyObject(state.site.data?.owner),
		isEmptySiteOwner: (state) => !!state?.site?.data?.owner && isEmptyObject(state.site.data?.owner),
		isErrorSiteOwner: (state) => !!state?.site?.errors?.length,

		isSiteLogo: (state) => !!state?.site?.data?.logo && !isEmptyObject(state.site.data?.logo),
		isEmptySiteLogo: (state) => !!state?.site?.data?.logo && isEmptyObject(state.site.data?.logo),
		isErrorSiteLogo: (state) => !!state?.site?.errors?.length,

		getSiteWebAddress: (state) => state.siteWebAddress,

		getSite: (state) => (!!state?.site?.data ? (state.site.data as ISite) : {} || {}),
		getSiteErrors: (state) => state?.site?.errors || [],

		getSiteOwner: (state) => (!!state?.site?.data?.owner ? (state.site.data.owner as ISiteOwner) : {} || {}),
		getSiteLogo: (state) => (!!state?.site?.data?.logo ? (state.site.data.logo as ISiteLogo) : {} || {})
		// getSiteSections: (state) => (!!state?.site?.data?.sections?.length ? (state.site.data.sections as Array<ISiteSection>) : [] || [])
	}
});