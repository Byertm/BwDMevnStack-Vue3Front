import UIkit from 'uikit';

export type ToastOptions = {
	message?: string | undefined;
	status?: 'primary' | 'success' | 'warning' | 'danger' | undefined;
	timeout?: number | undefined;
	group?: string | undefined;
	pos?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | undefined;
};

export const InitialOptions: Partial<ToastOptions> = {
	message: undefined,
	status: undefined,
	pos: 'top-right',
	group: undefined,
	timeout: 3000
};

const toast = (options: Partial<ToastOptions>) => {
	const { message, ...toastOptions } = Object.assign(InitialOptions, options);
	// `<span uk-icon='icon: check'></span> İsteğiniz başarıyla alındı.`
	if (message) UIkit.notification(message!, toastOptions);
	else UIkit.notification('Lütfen bir mesaj gönderin!', { ...toastOptions, status: 'danger' });
};

export { toast };
export default toast;