jQuery(function ($) {
    'use strict';

    //custom cursor
    // if (!isTouchScreen) {
    //     function customCursor($el, easing) {
    //         var pos = {x: 0, y: 0},
    //             $innerEl = $el.find('.inner'),
    //             $outerEl = $el.find('.outer');
    //
    //         //hide default cursor after custom cursor showed
    //         $(window).one('mousemove', function () {
    //             $el.fadeIn(1000, function () {
    //                 $('html').addClass('no-cursor');
    //             });
    //         });
    //
    //         //find mouse position
    //         $(window).on('mousemove', function (e) {
    //             pos.x += (e.clientX - pos.x);
    //             pos.y += (e.clientY - pos.y);
    //
    //             customPointerPosition(pos.x, pos.y);
    //         });
    //
    //         if ($('.swiper-entry .swiper-container').length) {
    //             $('.swiper-entry .swiper-container').each(function() {
    //                 $(this)[0].swiper.on('touchMove', function(e) {
    //                     pos.x += (e.clientX - pos.x);
    //                     pos.y += (e.clientY - pos.y);
    //
    //                     customPointerPosition(pos.x, pos.y);
    //                 });
    //             })
    //         }
    //
    //         //custom cursor position
    //         function customPointerPosition(pX, pY) {
    //             TweenLite.to($innerEl, 0.05, {y: pY, x: pX, ease: Power2.easeOut});
    //             TweenLite.to($outerEl, easing, {y: pY, x: pX, ease: Power2.easeOut});
    //         }
    //
    //         function enterCursorHandler() {
    //             TweenMax.to($outerEl, .3, {scale: 0.75});
    //             TweenMax.to($innerEl, .3, {scale: 2.5});
    //         }
    //
    //         function leaveCursorHandler() {
    //             TweenMax.to($outerEl, .3, {scale: 1});
    //             TweenMax.to($innerEl, .3, {scale: 1});
    //         }
    //
    //         //array with selectors on which we are changing cursor style
    //         var chekElementsArr = ['a', 'button', '.btn', '.SumoSelect', '.ui-slider-handle', '.ui-slider-range', '.drop-list li', '.menu-open', '.search-btn', '.round-btn', '.additional-marker', '.swiper-pagination-bullet', 'li.opt', '.select-all', '.checkbox-entry', '.btn-close', '.play-btn-wrap', '.swiper-button-prev', '.swiper-button-next', 'input[type="file"]', '.remove-file', '.arrow-link', 'map area', '.map-wrapper img', '.btn-image', '.parking-request'];
    //         for (var i = 0; i < chekElementsArr.length; i++) {
    //             $(document).on('mouseenter', chekElementsArr[i], enterCursorHandler)
    //                 .on('mouseleave', chekElementsArr[i], leaveCursorHandler);
    //
    //         }
    //
    //         //change cursor style on click
    //         $(document).on('mousedown', function () {
    //             TweenMax.to($outerEl, .3, {scale: .5});
    //             TweenMax.to($innerEl, .3, {scale: 1.5});
    //
    //         }).on('mouseup', function () {
    //             leaveCursorHandler();
    //         });
    //     }
    //
    //     customCursor($('#c-cursor'), .5);
    // }

    //text move effect
    $('.lettering span:not(.t-move-to-copy)').each(function () {
        var $this = $(this);
        $this.lettering('lines');
        // $this.find('span').lettering('words');
    });

    $('.t-move-to-copy').each(function () {
        var $this = $(this),
            content = $this.text(),
            insertContent = (!isIE) ? '<span class="t-move-el">' + content + '</span>' : '';

        $this.html('<span>' + content + '</span>' + insertContent + insertContent);
    });

    // var $mouseMoveWrap = $('.t-move-wrap'),
    //     $moveElements = $mouseMoveWrap.find('.t-move-el'),
    //     $moveElementFirst,
    //     $moveElementSecond;
    //
    // TweenMax.set($moveElements, {y: -5, x: 5, transformStyle: 'preserve-3d'});
    // TweenMax.set($moveElements.filter(':even'), {y: -10, x: 10});
    // TweenMax.set($('header').find('.t-move-el'), {y: 0, x: 0});
    //
    // if (!isTouchScreen && !isIE && winW > 991) {
    //
    //     var rect, sxPosMain, syPosMain, xMid, yMid;
    //
    //     $mouseMoveWrap.on('mousemove', function (e) {
    //         $moveElementFirst = $(this).find('.t-move-el').eq(0),
    //             $moveElementSecond = $(this).find('.t-move-el').eq(1);
    //
    //         rect = e.currentTarget.getBoundingClientRect();
    //
    //         sxPosMain = e.clientX - rect.left; //x position within the element.
    //         syPosMain = e.clientY - rect.top; //y position within the element.
    //
    //         xMid = -(sxPosMain - rect.width / 2) / 2,
    //             yMid = -(syPosMain - rect.height / 2) / 2;
    //
    //         TweenMax.to($moveElementFirst, 1.5, {
    //             y: 0.075 * yMid,
    //             x: 0.075 * xMid,
    //             // autoAlpha: 1,
    //             ease: Power2.easeOut
    //         }).delay(.1);
    //         TweenMax.to($moveElementSecond, 1.5, {
    //             y: 0.15 * yMid,
    //             x: 0.15 * xMid,
    //             // autoAlpha: 1,
    //             ease: Power2.easeOut
    //         }).delay(.1);
    //     }).on('mouseleave', function (e) {
    //         if ($(this).closest('nav').length) {
    //             TweenMax.to($moveElementFirst, 1.2, {y: 0, x: 0, ease: Power2.easeOut}).delay(.1);
    //             TweenMax.to($moveElementSecond, 1.2, {y: 0, x: 0, ease: Power2.easeOut}).delay(.1);
    //         } else {
    //             TweenMax.to($moveElementFirst, 1.2, {y: -5, x: 5, ease: Power2.easeOut}).delay(.1);
    //             TweenMax.to($moveElementSecond, 1.2, {y: -10, x: 10, ease: Power2.easeOut}).delay(.1);
    //         }
    //     })
    // }

    /* skew-scroll */
    // if (!isTouchScreen && !isIE) {
    //     window.addEventListener("wheel", skewOnWheel, {passive:true});
    //
    //     var delta, oldDelta = 0, count = 0,
    //         skewElemens = $('.skew-scroll');
    //
    //     TweenLite.set(skewElemens, {transformStyle: 'preserve-3d'});
    //
    //     function skewOnWheel(event) {
    //         if(winScr == 0) return false;
    //         delta = (event.deltaY || event.detail || event.wheelDelta) > 0 ? 1 : -1;
    //
    //         count +=delta;
    //
    //         oldDelta = 1.5 * delta;
    //
    //         TweenLite.to(skewElemens, .5, {skewY:oldDelta, onComplete: returnSkew});
    //
    //         // oldDelta += delta;
    //         // oldDelta = (Math.abs(oldDelta) > 15) ? 15 * delta : oldDelta;
    //         //
    //         // TweenLite.to(skewElemens, .5, {skewY:-oldDelta*0.15, onComplete: returnSkew});
    //
    //     }
    //
    //     function returnSkew() {
    //         TweenLite.to(skewElemens, .35, {skewY:0});
    //         // oldDelta = 0;
    //     }
    // }

    /* end of skew-scroll */

    /* round-btn 'magnet' hover */
    if (!isTouchScreen) {
        $('.round-btn').on('mousemove', function (e) {
            var $this = $(this),
                $tTarget = $this.find('.circle'),
                $tTargetText = $this.find('.desc'),
                $tW = $this.width(),
                $tH = $this.height(),
                btnRect = e.currentTarget.getBoundingClientRect(),
                btnRectX = e.clientX - btnRect.left,
                btnRectY = e.clientY - btnRect.top;

            TweenLite.to($tTarget, 1, {x: btnRectX - $tW / 2, y: btnRectY - $tH / 2});
            TweenLite.to($tTargetText, 1.5, {x: btnRectX - $tW / 2, y: btnRectY - $tH / 2});
        }).on('mouseleave', function () {
            TweenLite.to($(this).find('.circle'), .5, {x: 0, y: 0});
            TweenLite.to($(this).find('.desc'), .5, {x: 0, y: 0});
        });
    }
    /* end of round-btn 'magnet' hover */

    //scroll from first banner
    if (!isTouchScreen && $('.main-section').length) {
        $('.main-section')[0].addEventListener("wheel", scrollFromBanner, {passive: false});

        var mainDelta, mainScrollStop = 0;

        function scrollFromBanner(event) {
            if (mainScrollStop) {
                event.preventDefault();
                return false;
            }

            mainDelta = (event.deltaY || event.detail || event.wheelDelta) > 0 ? 1 : -1;
            if (mainDelta === 1 && winScr == 0) {

                event.preventDefault();
                mainScrollStop = 1;

                $('html, body').animate({
                    scrollTop: $(event.target).closest('section').next().offset().top
                }, 700, function () {
                    mainScrollStop = 0;
                });

            } else if (mainDelta === -1 && winScr !== 0) {
                mainScrollStop = 1;
                $('html, body').animate({
                    scrollTop: 0
                }, 700, function () {
                    mainScrollStop = 0;
                });
            }
        }

    }

    if (!isTouchScreen && $('.map-section:not(.projects-map-section)').length) {
        $('.map-section')[0].addEventListener("wheel", scrollToBanner, {passive: false});

        var mainDelta1, mainScrollStop1 = 0;

        function scrollToBanner(event) {
            if (mainScrollStop1) {
                event.preventDefault();
                return false;
            }

            mainDelta1 = (event.deltaY || event.detail || event.wheelDelta) > 0 ? 1 : -1;
            if (mainDelta1 === -1 && winScr <= $('.map-section').offset().top) {
                mainScrollStop1 = 1;
                $('html, body').animate({
                    scrollTop: 0
                }, 700, function () {
                    mainScrollStop1 = 0;
                });
            }
        }
    }

    //custom slide-image change

    if ($('.main-section').length && $('.main-section').find('.swiper-slide').length > 1) {

        function customSlideChange(swiper, $imageWrap) {

            var $cSlides = $imageWrap.find('.slide-image');
            TweenMax.set($cSlides, {transformStyle: 'preserve-3d'});

            $imageWrap.find('video').each(function () {
                $(this)[0].addEventListener('ended', endVideoCallback, false);
            });

            function endVideoCallback() {
                if (swiper.activeIndex === swiper.slides.length - 1) {
                    swiper.slideTo(0);
                } else {
                    swiper.slideNext();
                }
            }

            swiper.on('slideNextTransitionStart', function () {
                customSlide(swiper, $cSlides, 'clip-right');
            });
            swiper.on('slidePrevTransitionStart', function () {
                customSlide(swiper, $cSlides, 'clip-left');
            });
        }

        function customSlide(swiperObj, $customSlides, cssClassName) {
            var slideTo = $customSlides.eq(swiperObj.activeIndex),
                slideFrom = $customSlides.eq(swiperObj.previousIndex);

            var prevSlideVideo = slideFrom.find('video'),
                activeSlideVideo = slideTo.find('video');

            if (prevSlideVideo.length) prevSlideVideo[0].pause();
            if (activeSlideVideo.length) activeSlideVideo[0].play();

            slideFrom.addClass(cssClassName).css({'z-index': 3});
            slideTo.css({'z-index': 2});
            TweenMax.set(slideTo, {scale: 1.1});
            TweenMax.to(slideTo, .8, {scale: 1});
            setTimeout(function () {
                slideFrom.removeClass(cssClassName).css({'z-index': 1});
            }, 800);
        }

        customSlideChange($('.main-swiper')[0].swiper, $('.slide-images-wrap'));

    }

});