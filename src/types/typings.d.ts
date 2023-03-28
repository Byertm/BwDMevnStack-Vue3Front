export namespace UIkit {
	const modal: Modal;
	const update = (elPorNavWrap: Element, a: string): void => {};

	interface UIkitModalOptions {
		'esc-close'?: boolean | undefined;
		'bg-close'?: boolean | undefined;
		stack?: boolean | undefined;
		container?: string | boolean | undefined;
		'cls-page'?: string | undefined;
		'cls-panel'?: string | undefined;
		'sel-close'?: string | undefined;
	}

	interface UIkitModalElement {
		show(): void;
		hide(): void;
	}

	interface Modal {
		(element: UIkitElement, options?: UIkitModalOptions): UIkitModalElement;
		alert(message: string, options?: UIkitModalOptions): Promise<void>;
		confirm(message: string, options?: UIkitModalOptions): Promise<void>;
		prompt(content: string, value: string, options?: UIkitModalOptions): Promise<string | null>;
		dialog(content: string, options?: UIkitModalOptions): Promise<void>;
		labels: {
			ok: string;
			cancel: string;
		};
	}
}

export namespace UIkit {
	// const bFuncTest = (s: string): void => {};
	const use = (s: any): void => {};
	const notification = (...args: any[]): void => {};
}

declare module 'uikit' {
	export = UIkit;
}
// export {};