import { IDocument } from '@models/index';

export enum ESectionType {
	Page = 'page',
	Section = 'section',
	Post = 'post',
	Sidebar = 'sidebar'
}

export type TSectionType = `${ESectionType}`;

export interface ISection extends IDocument {
	key: string;
	name: string;
	type: string;
	isActive: boolean;
	subSections?: Array<ISection>;
}