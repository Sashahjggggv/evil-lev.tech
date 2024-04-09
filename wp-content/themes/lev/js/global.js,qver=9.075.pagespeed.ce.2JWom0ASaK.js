
var _functions = {},
    winScr, winW, winH, isTouchScreen, is_Mac, isIE, winMob;

jQuery(function ($) {

    "use strict";

    /* function on page ready */
    isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent);

    var banner_height;

    $('body').addClass('loaded');
    if (isTouchScreen) $('html').addClass('touch-screen');
    if (is_Mac) $('body').addClass('mac');
    if (navigator.userAgent.indexOf('Safari') >= 0 && navigator.userAgent.indexOf('Chrome') < 0) {
        $('body').addClass('safari');
    }

    _functions.pageCalculations = function () {
        winW = $(window).width();
        winH = $(window).height();
        winMob = (winW < 768) ? 1 : 0;

        // Added new script
        if (winW > 991) {
            if (winW / winH > 16 / 9) {
                var thisW = parseInt($('.apartment-search-wrap .apartment-search').last().parent().width(), 10);
                var thisH = parseInt(9 * $('.apartment-search-wrap .apartment-search').last().parent().width() / 16, 10);
                var thisM = (-thisH / 2 + winH / 2) + 'px 0 0 0';

                $('.informers-wrap').css({'right':0});
            } else {
                var thisW = parseInt(16 * $('.apartment-search-wrap .apartment-search').last().parent().height() / 9, 10);
                var thisH = parseInt($('.apartment-search-wrap .apartment-search').last().parent().height(), 10);
                var thisM = '0 '+ (-thisW / 4 + winW / 4) + 'px 0 ' + (-thisW / 4 + winW / 4) + 'px';

                $('.informers-wrap').css({'right':-(-thisW / 4 + winW / 4)});
            }
            $('.apartment-search-wrap .apartment-search').css({'width': thisW, 'height': thisH, 'margin': thisM});

        }

        if ($('.js-t-height').length ) {
            $('.js-t-margin').css({'margin-top' : $('.js-t-height').height()}).addClass('calculated');
        }
    };

    _functions.resizeFloorImg = function() {
        if ( $('.apartment-swiper .apartment-search').length && winW > 991 ) {

            $(document).find('map').imageMapResize();

            $('.apartment-swiper .apartment-search').each(function() {
                $(this).find(' > img:first-of-type').css({'height': 'auto'});
                var imgH = $(this).outerHeight();
                $(this).find(' > img:first-of-type').css({'height': imgH});
            });

        }
    }

    _functions.pageCalculations();

    //images load
    if (winW > 1199) {
        $('[data-bg-xl]').each(function (i, el) {
            $(el).css({'background-image': 'url(' + $(el).data('bg-xl') + ')'});
        });

        //dont need this images early, so loading them asynchronously
        setTimeout(function () {
            $('[data-bg-xl-late]').each(function (i, el) {
                $(el).css({'background-image': 'url(' + $(el).data('bg-xl-late') + ')'});
            });
        });
    }

    if (winW > 767) {
        $('[data-sm-bg]').each(function (i, el) {
            $(el).css({'background-image': 'url(' + $(el).data('sm-bg') + ')'});
        });
    }

    $('[data-bg]').each(function (i, el) {
        $(el).css({'background-image': 'url(' + $(el).data('bg') + ')'});
    });
    $('img[data-src], iframe[data-src]').each(function (i, el) {
        $(el).attr({'src': $(el).data('src')}).addClass('imgLoaded');
    });

    $('.video').each(function () {
        var video = '<video ' + ($(this).is('[data-autoplay]') ? 'autoplay' : '') + ' muted playsinline loop><source src="' + $(this).data('src') + '" type="video/mp4" /></video>';
        $(this).prepend(video);
        $(this).find('video')[0].oncanplay = function () {
            $(this).addClass('active');
        };
    });

    if ($('.SelectBox').length) {
        $('.SelectBox').each(function () {
            var $this = $(this),
                dataAll = $this.data('all') ? $this.data('all') : 'Select All',
                dataMultipleSelected = $this.data('multiple-selected') ? $this.data('multiple-selected') : 'Selected',
                dataAllSelected = $this.data('all-selected') ? $this.data('all-selected') : 'all selected',
                dataUp = $this.data('up') ? $this.data('up') : 0;

            $this.SumoSelect({
                csvDispCount: 4,
                selectAll: true,
                floatWidth: 0,
                locale: ['OK', 'Cancel', dataAll],
                captionFormat: '{0} ' + dataMultipleSelected,
                captionFormatAllSelected: '{0} ' + dataAllSelected,
                up: dataUp
            });
        });
    }

    //hide mobile drop-down if there is no elements inside
    if ( $('.object-content-wrap .mob-drop-wrap').find('.btn-list').is(':empty') ) {
        $('.object-content-wrap .mob-drop-wrap').addClass('d-none');
    }



    /* function on page scroll */
    $(window).scroll(function () {
        _functions.scrollCall();
    });

    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();
        if (winScr > 5) {
            $('header').addClass('scrolled');
            $(".search-btn.open-popup").addClass("scrolled");
        } else {
            $('header').removeClass('scrolled');
            $(".search-btn.open-popup").removeClass("scrolled");
        }
        _functions.customAnimation();

        if ($('.fade-scroll').length){
            banner_height = $('.js-fade-height').height()/2;
            $('.fade-scroll').css('opacity', 1 - winScr / banner_height);
        }
    }

    setTimeout(function() {
        _functions.resizeFloorImg();
        _functions.scrollCall();
    });

    /* function on page resize */
    _functions.resizeCall = function () {
        setTimeout(function () {
            _functions.pageCalculations();
            _functions.resizeFloorImg();

            if ($('map').length) {
                $('map').imageMapResize();
                _functions.reinitMapCanvas($('.apartment-swiper .apartment-search'));
            }
        }, 100);
    };

    if (!isTouchScreen) {
        $(window).resize(function () {
            _functions.resizeCall();
        });
    } else {
        window.addEventListener("orientationchange", function () {
            _functions.resizeCall();
        }, false);
    }

    /* swiper sliders */
    _functions.getSwOptions = function (swiper) {
        var options = swiper.data('options'),
            initialSlideNum = swiper.data('initial-slide'),
            initialLast = swiper.data('initial-last'),
            slidesLength = swiper.find('.swiper-slide').length;

        options = (!options || typeof options !== 'object') ? {} : options;
        var $p = swiper.closest('.swiper-entry');
        if (!options.pagination) options.pagination = {
            el: $p.find('.swiper-pagination')[0],
            clickable: true,
            dynamicBullets: options.dynamicBullets ? true : false
        };
        if (!options.navigation) options.navigation = {
            nextEl: $p.find('.swiper-button-next')[0],
            prevEl: $p.find('.swiper-button-prev')[0]
        };
        options.preloadImages = false;
        options.lazy = {loadPrevNext: true};
        options.observer = true;
        options.observeParents = true;
        options.watchOverflow = true;
        options.watchOverflow = true;
        options.centerInsufficientSlides = true;
        if (initialSlideNum) options.initialSlide = initialSlideNum;
        if (initialLast) options.initialSlide = slidesLength-1;
        if (options.noSwipingXs = true && winW < 768) options.noSwiping = false;
        if (!options.speed) options.speed = 500;
        options.roundLengths = true;
        if (winW < 992) options.direction = "horizontal";
        if (options.loop && slidesLength == 1) options.loop = false;
        if (options.customFraction) {
            $p.addClass('custom-fraction-swiper');
            if (slidesLength > 1 && slidesLength < 10) {
                $p.find('.custom-current').text('01');
                $p.find('.custom-total').text('0' + slidesLength);
            } else if (slidesLength > 1) {
                $p.find('.custom-current').text('01');
                $p.find('.custom-total').text(slidesLength);
            }
        }
        return options;
    };
    _functions.initSwiper = function (el) {
        var swiper = new Swiper(el[0], _functions.getSwOptions(el));
    };

    $('.swiper-entry .swiper-container').each(function () {
        _functions.initSwiper($(this));
    });
    $('.swiper-thumbs').each(function () {
        var top = $(this).find('.swiper-container.swiper-thumbs-top')[0].swiper,
            bottom = $(this).find('.swiper-container.swiper-thumbs-bottom')[0].swiper;
        top.thumbs.swiper = bottom;
        top.thumbs.init();
        top.thumbs.update();
    });
    $('.swiper-control').each(function () {
        var top = $(this).find('.swiper-container')[0].swiper,
            bottom = $(this).find('.swiper-container')[1].swiper;
        top.controller.control = bottom;
        bottom.controller.control = top;
    });

    //custom fraction
    $('.custom-fraction-swiper').each(function() {
        var $this = $(this),
            $thisSwiper = $this.find('.swiper-container')[0].swiper;

        $thisSwiper.on('slideChange', function() {
            $this.find('.custom-current').text(
                function() {
                    if ($thisSwiper.activeIndex < 9) {
                        return '0' + ($thisSwiper.activeIndex + 1)
                    } else {
                        return $thisSwiper.activeIndex + 1
                    }
                }
            )
        });
    });

    //popup
    var popupTop = 0;
    _functions.removeScroll = function () {
        if ($('html').hasClass('scroll-removed')) return false;

        popupTop = winScr;
        $('html').css({
            "position": "fixed",
            "top": -winScr,
            "width": "100%"
        }).addClass('scroll-removed');
    }
    _functions.addScroll = function () {
        $('html').css({
            "position": "static"
        }).removeClass('scroll-removed');
        window.scroll(0, popupTop);
    }
    _functions.openPopup = function (popup) {
        $('.popup-content').removeClass('active');
        $(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function () {
        $('.popup-wrapper, .popup-content').removeClass('active');

        $('.popup-iframe').html('');
        $('#video-popup iframe').remove();

        _functions.addScroll();
    };

    _functions.videoPopup = function (src) {
        $('#video-popup .embed-responsive').html('<iframe src="' + src + '"></iframe>');
        _functions.openPopup('#video-popup');
    };

    $(document).on('click', '.video-popup', function (e) {
        e.preventDefault();
        _functions.videoPopup($(this).data('src'));
    });

    $(document).on('click', '.open-popup', function (e) {
        e.preventDefault();
        _functions.openPopup('.popup-content[data-rel="' + $(this).data('rel') + '"]');
    });

    $(document).on('click', '.popup-wrapper .btn-close, .popup-wrapper .layer-close', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });

    $('.mob-drop-title').on('click', function () {
        var $this = $(this);

        $('.mob-drop-wrap.active').each(function () {
            if ($this.closest('.mob-drop-wrap').is($(this))) return;
            $(this).removeClass('active');
        });

        $this.closest('.mob-drop-wrap').toggleClass('active');
        if ($this.closest('.mob-drop-wrap').hasClass('active') && !$this.closest('.projects-map-section')) {
            $('html, body').animate({
                scrollTop: $this.offset().top - $('header').outerHeight() - 30
            }, 800);
        }
    });
    $('.drop-list li').on('click', function () {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        $this.closest('.mob-drop-wrap').removeClass('active').find('.mob-drop-title').text($this.text());
    });

    //simulate click on enter keypress on focused element
    $('*[tabindex="0"]').on('keydown', function (event) {
        if ((event.keyCode == 13) || (event.keyCode == 32)) {
            $(this).click();
        }
    });

    $('.pagin.filter-type a').on('click', function () {
        $(this).toggleClass('active');
    });

    /*slider range*/
    $(".slider-range").each(function (index) {
        var $this = $(this),
            from = parseInt($this.data('from'), 10),
            to = parseInt($this.data('to'), 10),
            min = parseInt($this.data('min'), 10),
            max = parseInt($this.data('max'), 10),
            step = $this.data('step') ? parseInt($this.data('step'), 10) : 1;

        $this.find(".range").attr("id", "slider-range-" + index);
        $this.find(".amount-start").attr("id", "amount-start-" + index).text(from);
        $this.find(".amount-end").attr("id", "amount-end-" + index).text(to);
        $this.find(".count-start").attr("data-slider", "#slider-range-" + index);
        $this.find(".count-end").attr("data-slider", "#slider-range-" + index);

        var options,
            optionsDouble = {
                range: true,
                min: min,
                max: max,
                value: from,
                values: [from, to],
                step: step,
                slide: function (event, ui) {
                    $("#slider-range-" + index + " .ui-slider-handle").eq(0).text(ui.value);
                    $("#slider-range-" + index + " .ui-slider-handle").eq(1).text(ui.values[1]);
                }
            },
            optionsSingle = {
                range: 'max',
                min: min,
                max: max,
                value: from,
                step: step,
                slide: function (event, ui) {
                    $("#slider-range-" + index + " .ui-slider-handle").eq(0).text(ui.value);
                }
            };

        options = $this.data('single') ? optionsSingle : optionsDouble;

        $("#slider-range-" + index).slider(options);
        $("#slider-range-" + index + " .ui-slider-handle").eq(0).text(from);
        $("#slider-range-" + index + " .ui-slider-handle").eq(1).text(to);
    });

    $('.menu-open').on('click', function () {
        $(this).hasClass('active') ? _functions.addScroll() : _functions.removeScroll();

        $(this).toggleClass('active');
        $('header').toggleClass('active');
    });

    $('.scroll-top').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1300);
    });

    //scroll from
    $('.scroll-to').on('click', function () {
        $('body, html').animate({
            'scrollTop': $('.scroll-to-block[data-rel="' + $(this).data('rel') + '"]').offset().top
        }, 800);
    });

    //search-btn
    // $(document).on('click', '.search-btn, .search-open', function (e) {
    //     e.preventDefault();
    //     $('.search-popup-wrapper').addClass('active');
    //     _functions.removeScroll();
    // });

    // $('.search-popup-wrapper .bg-layer, .search-popup .btn-close').on('click', function () {
    //     $(this).closest('.search-popup-wrapper').removeClass('active');
    //     setTimeout(_functions.addScroll, 600);
    // });

    //animation
    _functions.customAnimation = function () {
        if ($('.anime').length) {
            $('.anime').not('.animated').each(function () {
                if (winScr >= $(this).offset().top - ($(window).height() * 0.9)) {
                    $(this).addClass('animated');
                    setTimeout(function() {
                        $(this).addClass('animated-delay');
                    }.bind(this), 1600);
                }
            });
        }
    }

    // slide toogle btn
    $('.slide-toggle-btn').on('click', function () {
        var $this = $(this),
            $toText = $this.find('.slt-text'),
            origText = $this.data('orig-text'),
            toogleText = $this.data('toggled-text');
        $this.toggleClass('active');
        $this.closest('.slide-toggle-wrap').find('.slide-toggle-item').slideToggle(700);
        if ($this.hasClass('active')) {
            $toText.text(toogleText);
        } else {
            $toText.text(origText);
        }
    });

    //show enter popup after full load
/*
    $(window).on('load', function () {
        if (sessionStorage.getItem('popState') != 'shown') {
            _functions.openPopup('#enter-popup');
            sessionStorage.setItem('popState', 'shown');
        }
    });
*/

    $(document).on('click', '.page-type-buttons .btn:not(.active)', function () {
        var $this = $(this),
            mainWrapper = $('.projects-map-section');

        $this.addClass('active').siblings().removeClass('active');

        if (mainWrapper.hasClass('page-map')) {
            mainWrapper.removeClass('page-map');
            setTimeout(function () {
                $('html').removeClass('t-overflow');
            }, 1000);
        } else {
            $('html').addClass('t-overflow');
            mainWrapper.addClass('page-map');
        }

        if (winW < 768) $this.closest('.map-section').find('.filters-container').css({'z-index': 3});

    });

    //day/night image switch
    $('.js-image-switch').on('click', function (e) {
        var $this = $(this),
            $imageSwitch = $this.closest('.project-top-banner').find('.img-enter .bg-full').eq(1);

        $this.addClass('active').siblings().removeClass('active');

        if ($this.index() === 1) {
            $imageSwitch.addClass('active');
        } else {
            $imageSwitch.removeClass('active');
        }
    });

    $('.infrustructure-tabs ul li').on('click', function () {
        if ($(this).hasClass('show-inf')) {
            $(this).closest('.infrustructure-map-wrap').addClass('show-infrustructure');
        } else {
            $(this).closest('.infrustructure-map-wrap').removeClass('show-infrustructure');
        }
    });

    //tabs
    $('.tab-menu').on('click', function () {
        var $this = $(this),
            tab = $this.closest('.tabs').find('.tab'),
            i = $this.index();

        $this.addClass('active').siblings().removeClass('active');
        tab.eq(i).siblings('.tab:visible').fadeOut(function () {
            tab.eq(i).fadeIn();
        });
    });

    //input
    $(".input").focus(function () {
        $(this).closest("label").addClass("activeInput")
    });

    $(".input").blur(function () {
        $(this).closest("label").removeClass("activeInput")
    });

    //esc click - close menu, close popup
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key == "Escape" || evt.key == "Esc");
        } else {
            isEscape = (evt.keyCode == 27);
        }
        if (isEscape && $('header.active').length) {
            $('.menu-open').trigger('click');
        } else if (isEscape && $('.popup-wrapper.active').length) {
            // _functions.closePopup();
            $('.popup-content.active .layer-close').trigger('click');
        } else if ($('.search-popup-wrapper.active').length) {
            $('.search-popup .btn-close').trigger('click');
        }

    };

    //upload
    $('.upload-wrapper .file-name').on('click', function() {
        $(this).siblings('input').click();
    });

    $('.upload-wrapper input').on('change', function () {
        var fileName = $(this).val().substring($(this).val().lastIndexOf("\\") + 1);
        if (!fileName) {
            $(this).siblings('.remove-file').click();
        } else {
            $(this).parent().addClass('active');
            $(this).siblings('.file-name').text(fileName);
        }
    });

    $('.remove-file').on('click', function() {
        $(this).parent().removeClass('active');
        $(this).siblings('.file-name').text($(this).parent().data('placeholder'));
        $(this).siblings('input').val('');
    });

    $('.open-map-popup').on('click', function() {
        $('.map-popup').addClass('active');
        _functions.removeScroll();
    });

    $('.map-popup .btn-close').on('click', function() {
        $('.map-popup').removeClass('active');
        _functions.addScroll();
    });

    //
    $('a.search-item .swiper-entry .swiper-button-next, a.search-item .swiper-entry .swiper-button-prev').on('click', function(e) {
        e.preventDefault();
    });

    // datepicker
    if ($('#datepicker').length) {
        $('#datepicker').datepicker({
            firstDay: 1,
            minDate: 0
        });
    }

    if (!isIE && $('.rellax').length && !isTouchScreen) {
        var rellax = new Rellax('.rellax', {
            center: true
        });
    }

        //credit calculator
    function credit_calculator(){
        /* getting input values */
        var new_price_m,cost,square2,square3,debt, debt_m;

        var $calculator = $('#calculator'),
            first_pay = $("#credit-frist-pay").find('.range').slider("option", "value"),
            term = $("#credit-term").find('.range').slider("option", "value"),
            price = parseFloat($calculator.data('total-price')),
            price_m = parseFloat($calculator.data('meter-price')),
            square = parseFloat($calculator.data('square'));

        new_price_m = price_m + $calculator.data('additional-price-'+term);

        cost = price*first_pay/100; //how much have paid
        square2 = cost/price_m; // what part was paid by default price
        square3 = square - square2 // square - left to pay
        debt = square3 * new_price_m; // price - left to pay
        debt_m = Math.round(debt/term);

        $("#credit-sum").text(debt_m);
    }

    $('#calculator .slider-range').on('slidechange', function(event, ui) {
        credit_calculator();
    });

    if ($('#calculator').length) {
        credit_calculator();
    }
    // end of credit calculator

    /* accordeon */
    $('.accordeon-title').on('click', function() {
         var $this = $(this),
             $wrapper = $this.closest('.accordeon-wrap');

         if (!$this.siblings('.accordeon-toggle:visible').length) {
             $wrapper.find('.accordeon-title').removeClass('active');
             $wrapper.find('.accordeon-toggle:visible').slideUp();
         }

        $this.toggleClass('active');
        $this.siblings('.accordeon-toggle').slideToggle();
    });
    /* end of accordeon */
    // Flutrisbutton
    $(document).on('click', '.flatrisbutton', function (e) {
        e.preventDefault();
        var $this = $(this);       
        if($this.data('flatris-id')){
            create_chess($this.data('flatris-id'));
        }
        else{
            return false;
        }
        
    });
    $('.projects-wrap .project-item-filter').addClass('active-city');
    $(document).on('click','.select_coplex_city', function(e){
        e.preventDefault();
        var active_complex = $(this).attr('data-filter-city');
        var active_complex_array = active_complex.split(',');
        $('.drop-list-complex li').removeClass('complex_visible');
        $('.drop-list-complex li').css('display', 'none');
        $.each( active_complex_array, function( key, value ) {
            $('.drop-list-complex li[data-filter="'+value+'"]').addClass('complex_visible');
        });


        $('.projects-wrap .project-item-filter').removeClass('active-city');
        let cityName = $(this).attr('data-city-key');
        let cityWithCategory = $('.drop-list-complex').find('.active').attr('data-filter');

        $('.projects-wrap .project-item-filter').each(function(){
            let complexLocation = $(this).attr('data-filter-city');
            let complexCategory = $(this).attr('data-filter1');
            if(cityName == 0){
                $(this).fadeIn(400);
                $(this).addClass('active-city');
            }
            else if(cityName != 0){
                // if((cityName == complexLocation) && (complexCategory.includes(cityWithCategory) || cityWithCategory == 0) ){
                if(cityName == complexLocation){
                    $(this).fadeIn(200);
                    $(this).addClass('active-city');
                }
                else{
                    $(this).hide(0);
                }    
            }
        });
        _functions.customAnimation();

    });
});