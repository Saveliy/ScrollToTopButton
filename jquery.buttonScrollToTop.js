(function($){
/*minWindowWidth - минимальный размер окна, при котором кнопка должна менять свое поведение
minWidth - минимальный размер окна, при котором кнопка должна скрываться полностью
rightPosition - постоянный отступ кнопки от правого края окна
buttonWidth - ширина кнопки

$('selector').button(params);
params:
	speed: int
	min-scroll: int
	callback: fun()
	click: fun()
	hidden: fun()
	min-width: int
	easing: str
*/
	jQuery.fn.buttonScrollToTop = function(params){
		var params = params || {};

		if (typeof params !== 'object') {
			params.minWindowWidth = 1315;
			params.minWidth = 1215;
			params.rightPosition = 50;
			params.buttonWidth = 100;
			params.speed = 500;
		}

		var item = $(this);
		var divider = params.buttonWidth/(params.rightPosition/2);
		$$.hideScroll = function() {
			$(window).resize(function() {
				$(window).scroll();
				if (($(window).width() < params.minWindowWidth) && ( $(window).width() > params.minWidth)) {
					item.css('right', params.rightPosition/2 - (params.minWindowWidth - $(window).width())/divider + 'px');
				} else if ($(window).width() < params.minWidth) {
					item.addClass('hidden').hide(params.speed);
				}

				if ($(window).width() > params.minWidth) {
					item.removeClass('hidden');
					item.css('right', params.rightPosition/2 - (params.minWindowWidth - $(window).width())/divider + 'px');

					if (item.hasClass('scroll')) {
						item.show(params.speed);
					}
				}

				if ($(window).width() > params.minWindowWidth) {
					item.css('right', params.rightPosition+'px');
				}

			});
			$(window).resize();
		};

		$$.scrollTop = function() {
			item.click(function() {
				$('html, body').animate({
				'scrollTop': 0
				}, params.speed, function() {
					item.stop(true, true);
				});
			return false;
			});

			$(window).scroll(function() {
				if ($(window).scrollTop() > 0 && !item.hasClass('hidden')) {
					item.addClass('scroll');
					item.show(params.speed);
				} else {
					item.removeClass('scroll');
					item.hide(params.speed);
				}
			});
			$(window).scroll();
		};
	};
})(jQuery);
