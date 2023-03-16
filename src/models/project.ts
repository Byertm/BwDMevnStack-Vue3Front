import { IDocument } from '@models/index';

export interface IProject extends IDocument {
	name: string;
	description: string;
	demoPreviewUrl: string;
	imageUrl: string;
	deployUrl: string;
	categoryId: string;
	startDate: Date;
	finishDate: Date;
	createUserId: number;
	updateUserId: number;
	isActive: boolean;
}