import { IDocument } from '@models/index';

export interface ITag extends IDocument {
	name: string;
	url: string;
	createUserId: number;
	updateUserId: number;
	isActive: boolean;
}