import { IDocument } from '@models/index';

export interface IEducation extends IDocument {
	title: string;
	scholl: string;
	section: string;
	description: string;
	startDate: Date;
	finishDate: Date | string;
	isActive: boolean;
}