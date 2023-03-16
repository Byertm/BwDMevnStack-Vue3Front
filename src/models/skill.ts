import { IDocument } from '@models/index';

export interface ISkill extends IDocument {
	name: string;
	url: string;
	imgUrl: string;
	ratio: number;
	isSpecial: boolean;
	isLanguage: boolean;
	isActive: boolean;
}