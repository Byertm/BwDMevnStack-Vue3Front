(function ($) {
	'use strict';
	let is_scroll = false;
	let is_resize = false;
	let myscroll, myresize;

	//Run function when document ready
	$(document).ready(function () {
		setTimeout(() => {
			init_full_height();
			// init_page_loader();
			// init_typed();
			init_menu_toggle();
			init_inner_link();
			init_chart_circle();
			init_contact_form();
			init_portfolio_details();
		}, 500);
	});

	//Run function when window on scroll
	$(window).on('scroll', function () {
		init_scroll();
		is_scroll = true;
		clearTimeout(myscroll);
		myscroll = setTimeout(function () {
			is_scroll = false;
			init_update_uikit();
		}, 300);
	});

	//Run function when window on resize
	$(window).on('resize', function () {
		is_resize = true;
		clearTimeout(myresize);
		myresize = setTimeout(function () {
			is_resize = false;
			init_full_height();
			init_scroll();
		}, 300);
	});

	//============================================
	//initial functions
	//============================================

	function init_chart_circle() {
		$('.circle-progress').each(function (i, el) {
			let $el = $(el);
			$($el).circleProgress({
				value: $el.data('value')
			});
		});
	}

	function init_update_uikit() {
		//sometimes sticky nav oveflow
		if (!is_scroll) {
			if ($('#resume-nav-wrapper').length) UIkit.update($('#resume-nav-wrapper'), 'update');

			if ($('#portfolio-nav-wrapper').length) UIkit.update($('#portfolio-nav-wrapper'), 'update');
		}
	}

	function init_menu_toggle() {
		$('.eb-menu-toggle').on('click', function () {
			$('#app').toggleClass('eb-menu-open');
		});

		$('#btn-menu-toggle').on('click', function () {
			$('#main-menu').toggleClass('open-menu');
			return false;
		});

		$('#menuCollapse .uk-navbar-nav a').on('click', function () {
			$('#main-menu').toggleClass('open-menu');
		});
	}

	function init_scroll() {
		if (!is_resize) {
			let window_height = $('#main-header').height() - ($('#main-menu').height() + 1);
			let current_scroll = Math.round($(window).scrollTop());
			if (current_scroll >= window_height) $('#main-menu').addClass('fixed');
			else $('#main-menu').removeClass('fixed');
		}
	}

	function init_full_height() {
		if (!is_resize) {
			let vh = window.innerHeight * 0.01;
			$(':root').css('--vh', vh + 'px');
		}
	}

	function init_page_loader() {
		let $pageLoader = $('#pageLoader');
		setTimeout(function () {
			$pageLoader.addClass('uk-transition-fade');
			setTimeout(function () {
				$pageLoader.addClass('page-is-loaded');
				init_check_hash_url();
			}, 400);
		}, 300);
	}

	function init_inner_link() {
		$('.eb-inner-link').on('click', function () {
			let $el = $(this).attr('href');
			let ofsset = parseInt($(this).attr('data-offset'));
			let $el2 = $el.charAt(0) === '/' ? $el.replace('/', '') : $el;
			if ($($el2).length) {
				ofsset = ofsset > 0 ? ofsset : 79;
				init_scroll_to($($el2), 1500, ofsset);
				return false;
			}
		});
	}

	function init_check_hash_url() {
		if (window.location.hash && window.location.hash != '' && $(window.location.hash).length) {
			let speed = window.location.hash == '#home' ? 0 : 700;
			console.log(window.location.hash);
			init_scroll_to($(window.location.hash), speed, 79);
		}
	}

	function init_scroll_to($el, speed, offset) {
		$('html, body').animate({ scrollTop: $el.offset().top - offset }, { duration: speed, easing: 'easeInOutExpo' });
	}

	function init_typed() {
		let $typed = $('#typed');
		if ($typed.length) {
			let typed = new Typed('#typed', { strings: ['developer', 'freelancer', 'marketer', 'photographer'], loop: true, typeSpeed: 70 });
		}
	}

	function init_contact_form() {
		let $el = $('#contact-form');
		let $alert_wrap = $('#contact-form-alert');

		if ($el.length && $alert_wrap.length) {
			$el.on('submit', function () {
				let $btn = $('#btn-contact-form');
				let params = $el.serialize();

				init_btn_loading($btn, true);

				$.post('src/php/sendmail.php', params, function (data) {
					let dt = JSON.parse(data);
					if (dt.status == 'error') {
						let alert = init_alert('contact-alert-err', dt.status_desc, 'uk-alert-danger', 'warning');
					} else {
						let alert = init_alert('contact-alert-success', dt.status_desc, 'uk-alert-primary', 'info');
						$el.trigger('reset');
					}

					$.each(dt.error_msg, function (key, value) {
						if (value == '') {
							$('#' + key).removeClass('uk-form-danger');
						} else {
							$('#' + key).addClass('uk-form-danger');
						}
						$('#' + key + '_error').html(value);
					});
					$alert_wrap.html(alert);
					init_btn_loading($btn, false);
				});

				return false;
			});
		}
	}

	function init_btn_loading($btn, is_loading) {
		if (is_loading) {
			$btn.attr('disabled', 'disabled');
			$btn.find('.btn-text-wrap').text('Please Wait . . .');
			$btn.find('.uk-icon').attr('hidden', 'hidden');
			$btn.append('<div uk-spinner></div>');
		} else {
			$btn.removeAttr('disabled');
			$btn.find('.btn-text-wrap').text($btn.attr('data-text-reset'));
			$btn.find('.uk-icon').removeAttr('hidden');
			$btn.find('div[uk-spinner]').remove();
		}
	}

	function init_alert(id, msg, classname, icon) {
		let alert = '<div id="' + id + '" class="' + classname + '  uk-border-rounded" data-uk-alert>' + '<a class="uk-alert-close" data-uk-close></a>' + '<div class="uk-flex uk-flex-middle">' + '<div><span data-uk-icon="' + icon + '" class="uk-margin-small-right"></span></div>' + '<div>' + msg + '</div>' + '</div>' + '</div>';
		return alert;
	}

	function init_portfolio_details() {
		$('.show-portfolio').on('click', function () {
			let $this = $(this);
			let $el = $('#show-portfolio-details');
			let $wrap = $('#portfolio-details');
			$wrap.addClass('uk-animation-toggle');
			UIkit.modal($el).show();

			//show loading first
			$wrap.html('<div class="uk-position-center  uk-text-center">' + '<div data-uk-spinner></div> ' + '</div>');

			$.post($this.attr('href'), function (data) {
				$wrap.html(data);
				$wrap.removeClass('uk-animation-toggle');
			});
			return false;
		});
	}
})(jQuery);