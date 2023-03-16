import { IDocument } from '@models/index';

export interface IRole extends IDocument {
	name: string;
	isActive: boolean;
}