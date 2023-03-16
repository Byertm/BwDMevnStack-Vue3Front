
import { IComment, ICategory, IDocument, IUser, ITag } from '@models/index';

export interface IPost extends IDocument {
	title: string;
	slug: string;
	preTitle: string;
	content: string;
	imageUrl: string;
	createUserId: number;
	updateUserId: number;
	author: Partial<IUser> | null | undefined;
	category: Partial<ICategory> | null | undefined;
	tags: Array<Partial<ITag>> | null | undefined;
	comments: Array<Partial<IComment>> | null | undefined;
	isActive: boolean;
}

type TPostRequest = Omit<IPost, 'author' | 'category'>;

export interface IPostRequest extends TPostRequest {
	author: Partial<IUser> | string | null | undefined;
	category: Partial<ICategory> | null | undefined;
}