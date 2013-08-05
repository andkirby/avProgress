var AV_PROGRESS = AV_PROGRESS || {};
(function ($) {
    'use strict';
    AV_PROGRESS.App = {
        htmlOverlay: '<span class="avProgressOverlay"></span><span class=".avProgressOverlay avProgressOverlayLoader"></span>',
        init: function (el, options) {
            var overlay;
            overlay = $(this.htmlOverlay);
            el.addClass('avProgressBox').append(overlay);
            el.addClass('avProgressColor_' + options.color.replace('#', '')).append(overlay);
            overlay.css('background-color', options.color);
        },
        show: function (el) {
            el.removeClass('avProgressDisabled');
            el.find('.avProgressOverlay').show('fast');
        },
        hide: function (el) {
            if (el.hasClass('avProgressBox')) {
                el.addClass('avProgressDisabled');
                el.find('.avProgressOverlay').hide('fast');
            }
        },
        process: function (command, el) {
            var options = {
                overlayColor: '#ffffff',
                status: false
            };
            if (typeof command === 'object') {
                $.extend(options, command);
                command = options.status;
                el.data('avProgress', options);
                this.init(el, options);
            } else if (!el.data('avProgress')) {
                el.data('avProgress', options);
                this.init(el, options);
            } else {
                options = null;
            }
            if ('show' === command || true === command ||
                    (((!command && !el.hasClass('avProgressBox')) ||
                    (!command && el.hasClass('avProgressDisabled'))) && command !== false)
                    ) {
                this.show(el, options);
            } else {
                this.hide(el);
            }
        }
    };
    $.fn.avProgress = function (command) {
        this.each(function () {
            AV_PROGRESS.App.process(command, $(this));
        });
    };
}(jQuery));

