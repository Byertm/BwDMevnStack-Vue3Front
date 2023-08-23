import UIkit from 'uikit';
import Typed from 'typed.js';
import Icons from 'uikit/dist/js/uikit-icons';
import { getApiImageByImageUrl } from '@plugins/mixins';
import { IProject } from '@models/project';
// import '@plugins/circlePlugin.js';

UIkit.use(Icons);

export let is_scroll: boolean = false;
export let is_resize: boolean = false;
export let my_scroll: number;
export let my_resize: number;

//============================================
//initial functions
//============================================

export function init_chart_circle() {
	document.querySelectorAll('.circle-progress').forEach((el: Element) => {
		// if (!!el && $.isFunction($.fn.circleProgress)) $(el).circleProgress({ value: el.getAttribute('data-value') });
		if (!!el) {
			let elData: number = !!el.getAttribute('data-value') ? parseFloat(<string>el.getAttribute('data-value')) : 0;
		}
	});
}

export function init_update_uikit() {
	//sometimes sticky nav overflow
	if (!is_scroll) {
		const elResNavWrap = document.querySelector('#resume-nav-wrapper');
		const elPorNavWrap = document.querySelector('#portfolio-nav-wrapper');
		if (elResNavWrap) UIkit.update(elResNavWrap, 'update');
		if (!!elPorNavWrap) UIkit.update(elPorNavWrap, 'update');
	}
}

export function init_menu_toggle() {
	document.querySelector('.eb-menu-toggle')?.addEventListener('click', function () {
		document.querySelector('#app')?.classList.toggle('eb-menu-open');
	});

	document.querySelector('#btn-menu-toggle')?.addEventListener('click', function (event: Event) {
		event?.preventDefault?.();
		const mainMenu: HTMLDivElement | null = document.querySelector('#main-menu');
		const menuCollapse: HTMLDivElement | null = document.querySelector('#menuCollapse');
		mainMenu?.classList.toggle('open-menu');

		if (mainMenu?.classList?.contains?.('open-menu') && menuCollapse && menuCollapse?.offsetTop !== window?.scrollY) //window?.pageYOffset
			menuCollapse.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
	});

	document.querySelectorAll('#menuCollapse .uk-navbar-nav a')?.forEach((el: Element) => {
		if (!!el)
			el?.addEventListener('click', function (event: Event) {
				event?.preventDefault?.();
				document.querySelector('#main-menu')?.classList.toggle('open-menu');
			});
	});
}

export function init_scroll() {
	if (!is_resize) {
		let mainHeader = document.querySelector('#main-header');
		let mainMenu = document.querySelector('#main-menu');
		let window_height = mainHeader?.clientHeight ?? 0 - (mainMenu?.clientHeight ?? 0 + 1);
		let current_scroll = Math.round(window?.scrollY ?? 0);
		if (current_scroll >= window_height) mainMenu?.classList.add('fixed');
		else mainMenu?.classList.remove('fixed');
	}
}

export function init_full_height() {
	if (!is_resize) {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');
	}
}

export function init_page_loader() {
	let pageLoader = document.querySelector('#pageLoader');
	setTimeout(function () {
		pageLoader?.classList.add('uk-transition-fade');
		setTimeout(function () {
			pageLoader?.classList.add('page-is-loaded');
			init_check_hash_url();
		}, 400);
	}, 300);
}

export function init_scroll_to(el: string | undefined, speed: number, offset: number) {
	if (el) {
		let rect = document?.querySelector(el)?.getBoundingClientRect?.();
		if (rect) {
			let elOffset = { top: rect?.top + window?.scrollY ?? 0, left: rect?.left + window?.scrollX ?? 0 };
			document?.querySelector?.('html, body')?.animate({ scrollTop: elOffset.top - offset }, { duration: speed, easing: 'ease' }); //easeInOutExpo
		}
	}
}

export function init_inner_link() {
	function onClickInnerLink(pElement: Element) {
		let el = pElement?.getAttribute('href');
		let stringOffset = pElement?.getAttribute('data-offset') ?? '0';
		let offset: number = parseInt(stringOffset, 10);
		let el2 = !!el && el.charAt(0) === '/' ? el.replace('/', '') : el;
		if (!!el2 && el2.charAt(0) === '#' && document.querySelectorAll(el2).length) {
			offset = offset > 0 ? offset : 79;
			init_scroll_to(el2, 1500, offset);
			return false;
		}
	}

	document.querySelectorAll('.eb-inner-link')?.forEach((el: Element) => {
		if (!!el)
			el.addEventListener('click', () => {
				onClickInnerLink(el);
			});
	});
}

export function init_check_hash_url() {
	if (window.location.hash && window.location.hash !== '' && !!document?.querySelectorAll?.(window.location.hash)?.length) {
		let speed = window.location.hash === '#home' ? 0 : 700;
		init_scroll_to(window.location.hash, speed, 79);
	}
}

export function init_typed(typedData: string[] = ['Developer', 'Designer', 'Marketer', 'Programmer']) {
	const typedEl = document?.querySelector?.('#typed');
	if (!!Typed && !!typedEl) {
		const newTypedEl = new Typed('#typed', {
			strings: typedData,
			typeSpeed: 70,
			loop: true
		});

		return newTypedEl;
	}
	return null;
}

export function init_alert(id: string, msg: string, className: string, icon: string): string {
	let alert = `<div id="${id}" data-uk-alert class="${className} uk-border-rounded"><a data-uk-close class="uk-alert-close"></a><div class="uk-flex uk-flex-middle"><div><span data-uk-icon="${icon}" class="uk-margin-small-right"></span></div>'<div>${msg}</div></div></div>`;
	return alert;
}

export function init_btn_loading(btn: Element | null, is_loading: boolean) {
	if (btn) {
		let btnInnerTextWrap = btn?.querySelector?.('.btn-text-wrap');
		let btnInnerUkIcon = btn?.querySelector?.('.uk-icon');
		let divUkSpinner = document.createElement('div');
		divUkSpinner.setAttribute('uk-spinner', '');
		if (is_loading) {
			btn.setAttribute('disabled', 'disabled');
			if (btnInnerTextWrap) btnInnerTextWrap.textContent = 'Please Wait...';
			if (btnInnerUkIcon) btnInnerUkIcon.setAttribute('hidden', 'hidden');
			btn.appendChild(divUkSpinner);
		} else {
			btn.removeAttribute('disabled');
			if (btnInnerTextWrap && btn.getAttribute('data-text-reset')) btnInnerTextWrap.textContent = btn.getAttribute('data-text-reset');
			if (btnInnerUkIcon) btnInnerUkIcon.setAttribute('hidden', 'hidden');
			let btnInnerUKSpinner = btn?.querySelector?.('div[uk-spinner]');
			if (btnInnerUKSpinner) btnInnerUKSpinner.remove();
		}
	}
}

export const formSerialize = (pForm: HTMLFormElement | undefined | null) => {
	let queryString: string = '';
	// Get the form and control
	if (pForm) {
		const form: HTMLFormElement = pForm;
		if (form) {
			// Get all field data from the form
			let data: FormData = new FormData(form);
			// Convert to a query string
			let dataEntries = Object.fromEntries(<any>data);
			// Convert to a query string
			queryString = new URLSearchParams(dataEntries).toString();
		}
	}
	return queryString;
};

export function init_contact_form() {
	let el = document?.querySelector?.('#contact-form');
	let alert_wrap = document?.querySelector?.('#contact-form-alert');

	if (!!el && !!alert_wrap) {
		function contactFormSubmit(e: Event) {
			let btn = document?.querySelector?.('#btn-contact-form');
			e?.preventDefault?.();
			let params: string = formSerialize(<HTMLFormElement | undefined | null>el);

			init_btn_loading(btn, true);

			function fnErrorEach(key: string, value: string) {
				let keyEl = document.querySelector('#' + key);
				let keyErrEl = document.querySelector('#' + key + '_error');
				if (value == '') keyEl?.classList.remove('uk-form-danger');
				else keyEl?.classList.add('uk-form-danger');

				if (keyErrEl) keyErrEl.innerHTML = value;
			}

			function fnDataParse(data: string) {
				let dt = JSON.parse(data);
				let alert: string = '';
				if (dt.status === 'error') alert = init_alert('contact-alert-err', dt.status_desc, 'uk-alert-danger', 'warning');
				else {
					alert = init_alert('contact-alert-success', dt.status_desc, 'uk-alert-primary', 'info');
					(<HTMLFormElement>el).reset();
				}

				(<Array<any>>dt.error_msg).forEach((error, _) => {
					error.forEach((val: string, key: string) => {
						fnErrorEach(key, val);
					});
				});

				if (!!alert_wrap) alert_wrap.innerHTML = alert;

				init_btn_loading(btn, false);
			}

			// let uri: string = `${window.location.origin}/php/sendmail.php`;
			// fetch(uri, { method: 'POST', body: params, headers: { 'Content-type': 'application/json; charset=UTF-8' } })
			// 	.then(function (response) {
			// 		if (response.ok) return response.json();
			// 		return Promise.reject(response);
			// 	})
			// 	.then(function (data) {
			// 		debugger;
			// 		fnDataParse(data);
			// 		console.log(data);
			// 	})
			// 	.catch(function (error) {
			// 		if (typeof error === 'object') error = JSON.stringify(error);
			// 		console.warn(error);
			// 	})
			// 	.finally(() => init_btn_loading(btn, false));

			return false;
		}

		el.addEventListener('submit', contactFormSubmit);
	}
}

export function init_portfolio_details() {
	const initShowPortfolio = (el: Element) => {
		let thisEl = el;
		let elShowDetail = document.querySelector('#show-portfolio-details');
		let wrapEl = document.querySelector('#portfolio-details');
		wrapEl?.classList.add('uk-animation-toggle');

		// Show loading first
		if (wrapEl) wrapEl.innerHTML = `<div class="uk-position-center uk-text-center"><div data-uk-spinner></div></div>`;

		let uri: string = thisEl?.getAttribute?.('href') ? `${window.location.origin}${thisEl?.getAttribute?.('href')}` : ``;

		if (!!uri)
			fetch(uri)
				.then((res: Response) => res.text())
				.then((data: string) => {
					if (!!data && wrapEl) {
						wrapEl.innerHTML = data;
						wrapEl?.classList.remove('uk-animation-toggle');
						if (elShowDetail) UIkit.modal(elShowDetail).show();
					}
				})
				.catch(() => {
					console.log('Ah hata!!!');
				});

		return false;
	};

	document.querySelectorAll('.show-portfolio').forEach((el: Element) => {
		if (!!el)
			el.addEventListener('click', (e: Event) => {
				e.preventDefault();
				initShowPortfolio(el);
			});
	});
}

export const portfolio_detail_string = ({ name, description, imageUrl }: Partial<IProject>) => {
	// <div data-uk-img data-src="imageUrl" class="uk-background-cover uk-width-2-5@m eb-full-height"></div>
	let template = `<div data-uk-grid class="uk-grid-collapse uk-child-width-1-1 uk-animation-scale-down">
	<div class="uk-width-2-5@m eb-full-height"><img src="{{imageUrl}}" crossorigin="anonymous" /></div>

		<div class="uk-padding-large uk-width-expand@m eb-full-height eb-full-height-fixed eb-work-content">
			<p><span class="eb-label uk-label uk-border-rounded">Completed</span> </p>

			<h1 class="eb-section-title">{{name}}</h1>

			<h5>Web Design, 13 May 2015</h5>

			<hr />

			<p>{{description}}</p>

			<div data-uk-grid class="uk-child-width-1-2 uk-grid-medium">
				<div>
					<img src="/assets/img/work/03.jpg" class="uk-border-rounded" alt="">
				</div>
				<div>
					<img src="/assets/img/work/02.jpg" class="uk-border-rounded" alt="">
				</div>
			</div>

			<p>Limited to only 50 units, the 2020 R8 Decennium edition features a Mythos black exterior, matte bronze 20-inch
				milled-cut wheels and matte bronze intake manifold, along with a gloss black front spoiler, side sills and rear
				diffuser. Coupled with an interior finished entirely in black, inlays in gloss carbon fiber and quilted rhombus
				stitching in a copper tone, the R8 V10 Decennium edition pays tribute to its V10 heritage.
			</p>

			<h4 class="eb-section-title uk-heading-line"><span>Client</span></h4>

			<div class="eb-testi-item">
				<div class="eb-testi-item-desc">
					<h4>Nice Work</h4>
					For the first time I see such high-quality work, everything is just fine. The design is incredible, a lot of features and ready-made solutions.
				</div>

				<div class="eb-testi-item-img">
					<div data-uk-grid class="uk-flex-middle uk-grid-small">
						<div>
							<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/people/01.jpg" alt="" data-uk-img>
						</div>

						<div class="uk-text-bold uk-text-small">
							<span>Ben</span>
							<span data-uk-icon="minus"></span>
							<span>Envato User</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;

	if (name) template = template.replaceAll('{{name}}', name);
	if (description) template = template.replaceAll('{{description}}', description);
	if (imageUrl) template = template.replaceAll('{{imageUrl}}', getApiImageByImageUrl(imageUrl));
	return template;
};