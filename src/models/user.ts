import { IDocument, IRole } from '@models/index';

export const emailRegex = RegExp(/^[\w-\._\+%]+@(live|hotmail|outlook|aol|yahoo|rocketmail|gmail|gmx\.com|mail.com|inbox.com|icloud|aim|yandex|zoho)\./);

export interface IUser extends IDocument {
	first_name: string;
	last_name: string;
	name: string;
	email: string;
	// hash_password: string;
	// salt: string;
	roles: Array<Partial<IRole>> | null | undefined;
	isActive: boolean;
}