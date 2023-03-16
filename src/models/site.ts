import { IDocument } from '@models/index';

/**
	Anasayfadaki hero
	hakkında kısımlarının db ye alınması.
	Burada;
		+ FirstName,
		+ LastName,
		+ FullName,
		+ Titles [Programmer, Designer],
		About { Short, Full, LonLat },
		Birth Date,
		Info: { Phone, Email, Website, Address }
		Social Media,
		Image
		and
		Video links
*/

export interface IScocialMedia {
	name?: string;
	url?: string;
	icon?: string;
}

export interface IScocialTitle {
	name?: string;
	icon?: string;
}

export interface ISiteOwnerContact {
	address?: {
		short?: string;
		full?: string;
		lonlat?: string;
	};
	email?: string;
	phone?: string;
	website?: string;
}

export interface ISiteOwnerInfo {
	about?: {
		title?: string;
		short?: string;
		full?: string;
		imageUrl?: string;
		videoUrl?: string;
	};
	titles?: Array<IScocialTitle>;
}

export interface ISiteOwner {
	firstName?: string;
	lastName?: string;
	fullName?: string;
	birthDate?: string;
	info?: ISiteOwnerInfo;
	contacts?: ISiteOwnerContact;
	socialMedias?: Array<IScocialMedia>;
}

export interface ISiteSection {
	key: string;
	name: string;
	isVisible: boolean;
}

export interface ISiteLogo {
	imageUrl?: string;
	text?: string;
}

export interface ISite extends IDocument {
	owner?: ISiteOwner;
	logo?: ISiteLogo;
	sections?: Array<ISiteSection>;
}

export const SiteInjectionKeys = { siteKey: Symbol(), ownerKey: Symbol(), logoKey: Symbol(), sectionKey: Symbol(), sectionsKey: Symbol() };

export type TSiteOwner = { getSiteOwner: ISiteOwner; isSiteOwner: boolean };
export type TSiteLogo = { getSiteLogo: ISiteLogo; isSiteLogo: boolean };

//#region Example Using
// const site: ISite = {} as ISite;
// site?.logo?.text;
// site?.logo?.imageUrl;
// site?.owner?.firstName;
// site?.owner?.lastName;
// site?.owner?.fullName;
// site?.owner?.birthDate;
// site?.owner?.info?.about?.title;
// site?.owner?.info?.about?.short;
// site?.owner?.info?.about?.full;
// site?.owner?.info?.about?.imageUrl;
// site?.owner?.info?.about?.videoUrl;
// site?.owner?.info?.titles?.map((t) => t.name);
// site?.owner?.info?.titles?.map((t) => t.icon);
// site?.owner?.contacts?.address?.short;
// site?.owner?.contacts?.address?.full;
// site?.owner?.contacts?.address?.lonlat;
// site?.owner?.contacts?.email;
// site?.owner?.contacts?.phone;
// site?.owner?.contacts?.website;
// site?.owner?.socialMedias?.map((sm) => sm.name);
// site?.owner?.socialMedias?.map((sm) => sm.icon);
// site?.owner?.socialMedias?.map((sm) => sm.url);
// site?.logo?.imageUrl;
// site?.logo?.text;
// site?.sections?.map((sec) => sec.key);
// site?.sections?.map((sec) => sec.name);
// site?.sections?.map((sec) => sec.isVisible);
//#endregion