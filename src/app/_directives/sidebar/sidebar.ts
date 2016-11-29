import { Component, AfterViewInit } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
declare var $: any;

@Component({
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarDirective implements AfterViewInit {
	jwtHelper: JwtHelper = new JwtHelper();
	profile: any = {};

	constructor() {
		this.profile = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
		if (this.profile.avatar.indexOf('http') < 0) {
			this.profile.avatar = 'http://static2.fastcard.vn/account/' + this.profile.avatar;
		}
	}

	ngAfterViewInit() {
		var CURRENT_URL = window.location.href.split('#')[1].split('?')[0],
			$BODY = $('#nav'),
			$MENU_TOGGLE = $('#menu_toggle'),
			$SIDEBAR_MENU = $('#sidebar-menu'),
			$SIDEBAR_FOOTER = $('.sidebar-footer'),
			$LEFT_COL = $('.left_col'),
			$RIGHT_COL = $('.right_col'),
			$NAV_MENU = $('.nav_menu'),
			$FOOTER = $('footer');

		$(document).ready(function() {
			var setContentHeight = function () {
				// reset height
				$RIGHT_COL.css('min-height', $(window).height());

				var bodyHeight = $BODY.outerHeight(),
					footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
					leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
					contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

				// normalize content
				contentHeight -= $NAV_MENU.height() + footerHeight;

				$RIGHT_COL.css('min-height', contentHeight);
			};

			$SIDEBAR_MENU.find('a').on('click', function(ev) {
				var $li = $(this).parent();

				if ($li.is('.active')) {
					$li.removeClass('active active-sm');
					$('ul:first', $li).slideUp(function() {
						setContentHeight();
					});
				} else {
					$li.parent('ul').find('li').removeClass('current-page active active-sm');

					// prevent closing menu if we are on child menu
					if (!$li.parent().is('.child_menu')) {
						$SIDEBAR_MENU.find('li').removeClass('active active-sm');
						$SIDEBAR_MENU.find('li ul').slideUp();
					}

					$li.addClass('active');

					$('ul:first', $li).slideDown(function() {
						setContentHeight();
					});
				}
			});

			// toggle small or large menu
			$MENU_TOGGLE.on('click', function() {
				if ($BODY.hasClass('nav-md')) {
					$SIDEBAR_MENU.find('li.active ul').hide();
					$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
				} else {
					$SIDEBAR_MENU.find('li.active-sm ul').show();
					$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
				}

				$BODY.toggleClass('nav-md nav-sm');

				setContentHeight();
			});

			// check active menu
			$SIDEBAR_MENU.find('a[href="#' + CURRENT_URL + '"]').parent('li').addClass('current-page')
				.parent('ul').show()
				.parent('li').addClass('active');

			$SIDEBAR_MENU.find('a').filter(function () {
				return this.href == CURRENT_URL;
			}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
				setContentHeight();
			}).parent().addClass('active');

			// recompute content when resizing
			$(window).smartresize(function(){
				setContentHeight();
			});

			setContentHeight();

			// fixed sidebar
			if ($.fn.mCustomScrollbar) {
				$('.menu_fixed').mCustomScrollbar({
					autoHideScrollbar: true,
					theme: 'minimal',
					mouseWheel:{ preventDefault: true }
				});
			}
		});
	}
}
