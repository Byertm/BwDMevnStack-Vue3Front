import { IDocument } from '@models/index';

export interface ITestimonial extends IDocument {
	title: string;
	content: string;
	author: string;
	authorImage: string;
	createUserId: number;
	updateUserId: number;
	isActive: boolean;
}