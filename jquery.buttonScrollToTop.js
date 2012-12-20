(function($){
	jQuery.fn.buttonScrollToTop = function(params){
		var settings = {
			minScroll: 0,
			minWidth: 900,
			speed: 1000,
			easing: 'easeInSine',
			click: function(item) {
				item.click(function() {
					$('html, body').animate({
						'scrollTop': 0
						}, settings.speed, settings.easing, function() {
							item.stop(true, true);
							settings.callback()
						});
					return false;
				})
			},
			hidden: function(item) {
				item.hide(this.speed);
			},
			callback: function() {
				return false
			}
		};

		return this.each(function() {
			if (params) {
				$.extend(settings, params);
			}

			var item = $(this);
			$(window).resize(function() {
				if ($(window).width() > settings.minWidth) {
					item.removeClass('hidden');
					if (item.hasClass('scroll')) {
						item.show(settings.speed);
					}
				} else {
					item.addClass('hidden');
					if (item.hasClass('scroll')) {
						settings.hidden(item);
					}
				}
			});

			settings.click(item);

			$(window).scroll(function() {
				if ($(window).scrollTop() > settings.minScroll && !item.hasClass('hidden')) {
					item.addClass('scroll');
					item.show(settings.speed);
				} else {
					item.removeClass('scroll');
					settings.hidden(item);
				}
			});
		});
	};
})(jQuery);
