import { IDocument } from '@models/index';

export interface IExperience extends IDocument {
	title: string;
	company: string;
	section: string;
	description: string;
	startDate: Date;
	finishDate: Date | string;
	isActive: boolean;
}