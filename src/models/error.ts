export interface IHttpClientCheck {
	statusCode: number;
	statusMessage: string;
	status: string;
}

export interface IHttpClientHealth {
	uptime: number;
	status: string;
	timestamp: number;
}

export interface IErrorPageBackButton {
	text: string;
	urlHash: string;
	isVisible: boolean;
}

export interface IErrorPage {
	title: string;
	subTitle: string;
	imageUrl: string;
	backButton: IErrorPageBackButton;
}