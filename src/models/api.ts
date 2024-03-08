import { IDocument } from '@models/index';

export interface IApiCheck extends IDocument {
	statusCode: number;
	statusMessage: string;
	status: string;
}

export interface IApiHealth extends IDocument {
	uptime: number;
	message: string;
	timestamp: number;
}

export const ApiInjectionKeys = {
	apiKey: Symbol('api'),
	apiWebAddressKey: Symbol('apiWebAddress'),
	ownerKey: Symbol('owner'),
	logoKey: Symbol('logo'),
	sectionKey: Symbol('section'),
	sectionsKey: Symbol('sections')
};

export type TApiCheck = { getCheck: IApiCheck; isApiCheck: boolean };
export type TApiHealth = { getApiHealth: IApiHealth; isApiHealth: boolean };
export type TApi = TApiCheck | TApiHealth;