import { IUser } from '@models/user';
import { IDocument } from '@models/index';

export interface IComment extends IDocument {
	author?: IUser | null;
	comment: string;
	postId: string;
	parentId: string | null | undefined;
	createUserId: number;
	updateUserId: number;
	isBanned: boolean;
	isHidden: boolean;
	isActive: boolean;
	children?: Array<IComment> | null;
}