jQuery(function($) {
    if (typeof(history.replaceState) !== "undefined") {
        history.replaceState({url:location.pathname+location.search}, null, null);
    }
    window.addEventListener("popstate", function(event) {
        window.location = event.state.url;
    });

    function setLocation(curLoc){
        var state = {url: curLoc};
        history.pushState(state, null, curLoc);
        return false;
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    //Cookie removeCookie
    function removeCookie(cname){
        setCookie(cname, '', { expires: -1, path: '/'});
    }

    function showMessage(popupId,message){
        var popup = $(popupId);
        if(message) popup.find('.text').text(message);
        _functions.openPopup(popupId);
    }

    document.addEventListener( 'wpcf7mailsent', function( e ) {
        var id = '#'+e.detail.id,
            message = $(id).closest('.cf7-wrapper').attr('data-message');
        showMessage('#message-popup',message);
        return false;

    }, false );

    document.addEventListener( 'wpcf7mailfailed', function( e ) {
        var id = '#'+e.detail.id,
            message = $(id).closest('.cf7-wrapper').attr('data-error');
        showMessage('#error-popup',message);

    }, false );
	
	    document.addEventListener( 'wpcf7spam', function( e ) {
        var id = '#'+e.detail.id,
            message = $(id).closest('.cf7-wrapper').attr('data-error');
        showMessage('#error-popup',message);

    }, false );


    $('.cf7-wrapper[data-select]').each(function(){
        var wrapp = $(this), selectVals = wrapp.attr('data-select');
        if(selectVals){
            var select = wrapp.find('select');
            if(!select.length) return;
            selectVals = selectVals.split('|');
            select.html('');
            for(var i=0; i<selectVals.length; i++ ){
                if(!i)
                    select.append('<option value="" selected disabled>'+selectVals[i]+'</option>')
                else
                    select.append('<option value="'+selectVals[i]+'">'+selectVals[i]+'</option>')
            }
            select[0].sumo.reload();
        }
    });

        var ajaxFinish = 0, ajaxUrl = '/wp-admin/admin-ajax.php';


if($('.apartment-swiper.floor-slider').length) {
    $('.apartment-swiper.floor-slider')[0].swiper.on('slideChangeTransitionStart', function () {

        if (ajaxFinish) return false;
        ajaxFinish = 1;

        var thisSwiper = this;

        var activeSlide = $(thisSwiper.slides[thisSwiper.activeIndex]),
            previousSlide = $(thisSwiper.slides[thisSwiper.previousIndex]),
            id = activeSlide.data('id'),
            url = activeSlide.data('url'),
            count = activeSlide.data('count'),
            free = activeSlide.data('count-free'),
            area = activeSlide.data('area').split('|'),
            price = activeSlide.data('price');

        setLocation(url);
        $('.ajax-loader').addClass('active');
        $('.informer-wrapp').fadeOut(500);

        $.ajax({
            type: 'POST',
            async: true,
            url: ajaxUrl,
            data: {action: 'get_floor', id: id},
            success: function (response) {
                $(response).addClass('new').appendTo(activeSlide);
                $('.cur-count').text(count);
                $('.cur-free').text(free);
                $('.cur-min').text(area[0] ? area[0] : '');
                $('.cur-max').text(area[1] ? area[1] : '');
                if(area[1]==area[0]) {
                    $('.hide-text,.cur-max').hide();
                }else{
                    $('.hide-text,.cur-max').show();
                }
                $('.cur-min-price').text(price);
                $('.informer-wrapp').fadeIn(500);
                thisSwiper.update();

                    ajaxFinish = 0;
                    $('.ajax-loader').removeClass('active');
                    previousSlide.html('');

                var loadImage = new Image();
                loadImage.src = activeSlide.find('.apartment-search > img:first-of-type').attr('src');

                loadImage.onload = function() {
                    _functions.resizeFloorImg();
                    $('map').imageMapResize();
                    activeSlide.find('.apartment-search').removeClass('new');

                    $(document).find('.floor-slider map area').each(function() {
                        var $this = $(this),
                            foo = document.createElement('canvas'),
                            bar = $this.parent().parent();

                        foo.width = bar.width();
                        foo.height = bar.height();

                        _functions.drawPoly($this.attr('coords'), foo, 'rgba(205, 179, 147, .52)');

                        foo.classList.add('map-canvas');
                        $(bar).find('.canvas-wrap').append(foo);

                    });
                }

                loadImage = null;

                    // setTimeout(function() {
                    //
                    //
                    // }, 50);

            }
        });

    })
}
    if($('.cur-max').length){
        if($('.cur-min').text()==$('.cur-max').text())
            $('.hide-text,.cur-max').hide();
        else
            $('.hide-text,.cur-max').show();

    }

    if($('.apartment-swiper.commercial-slider').length) {
        $('.apartment-swiper.commercial-slider')[0].swiper.on('slideChangeTransitionStart', function () {

            if (ajaxFinish) return false;
            ajaxFinish = 1;

            var thisSwiper = this;

            var activeSlide = $(thisSwiper.slides[thisSwiper.activeIndex]),
                previousSlide = $(thisSwiper.slides[thisSwiper.previousIndex]),
                id = activeSlide.data('id'),
                url = activeSlide.data('url');

            setLocation(url);
            $('.ajax-loader').addClass('active');

            $.ajax({
                type: 'POST',
                async: true,
                url: ajaxUrl,
                data: {action: 'get_commercial', id: id},
                success: function (response) {
                    $(response).addClass('new').appendTo(activeSlide);
                    thisSwiper.update();

                        ajaxFinish = 0;
                        $('.ajax-loader').removeClass('active');
                        previousSlide.html('');

                    var loadImage = new Image();
                    loadImage.src = activeSlide.find('.apartment-search > img:first-of-type').attr('src');

                    loadImage.onload = function() {
                        _functions.resizeFloorImg();
                        $('map').imageMapResize();
                        activeSlide.find('.apartment-search').removeClass('new');

                        $(document).find('.commercial-slider map area').each(function() {
                            var $this = $(this),
                                foo = document.createElement('canvas'),
                                bar = $this.parent().parent();

                            foo.width = bar.width();
                            foo.height = bar.height();

                            _functions.drawPoly($this.attr('coords'), foo, 'rgba(205, 179, 147, .52)');

                            foo.classList.add('map-canvas');
                            $(bar).find('.canvas-wrap').append(foo);
                        });
                    }
                    loadImage = null;

                    // setTimeout(function() {
                    //
                    // }, 50);
                }
            });

        })
    }

    $('#flat-request'). on('click',function(){
        var popup = $('#flat-popup');
        popup.find('[name="your-complex-name"]').val(popup.find('.complex-name').text());
        popup.find('[name="your-section-num"]').val(popup.find('.section-num').text());
        popup.find('[name="your-floor-num"]').val(popup.find('.floor-num').text());
        popup.find('[name="your-flat-num"]').val(popup.find('.flat-num').text());
        popup.find('[name="your-flat-rooms"]').val(popup.find('.flat-rooms').text());
    })

    $(document).on('click','.commercial-request',function(){
        var popup = $('#commercial-popup'),num = $(this).data('num'), section = $('.swiper-slide-thumb-active .section-num').text() ;

        popup.find('[name="your-complex-name"]').val(popup.find('.complex-name').text());

        popup.find('[name="your-section-num"]').val(section);
        popup.find('.section-num').text(section);

        popup.find('[name="your-flat-num"]').val(num);
        popup.find('.flat-num').text(num);
    })

    $('.parking-request').on('click',function(){
        var popup = $('#parking-popup');

        popup.find('[name="your-complex-name"]').val(popup.find('.complex-name').text());
    })


    $('.search-popup form').on('submit',function () {
        var form = $(this), rooms = '', area = '', price='';
        form.find('.rooms a.active').each(function () {
            rooms += $(this).attr('value')+',';
        })
        if(rooms) form.find('.rooms input').val(rooms.slice(0,-1));

        form.find('.area .ui-slider-handle').each(function () {
            area += $(this).text()+',';
        });

        if(area) form.find('.area input').val(area.slice(0,-1));

        form.find('.price .ui-slider-handle').each(function () {
            price += $(this).text()+',';
        });

        if(price) form.find('.price input').val(price.slice(0,-1));

        return true;
    })

   /* $('select[name="compl"]').on('change',function () {
        var select = $(this), form = select.closest('form');
        $.ajax({
            type: 'POST',
            async: true,
            url: ajaxUrl,
            data: {action: 'get_section', id: select.val()},
            success: function (response) {
                form.find('.SelectBox.section').html('').append(response)[0].sumo.reload();
            }
        });
    })*/

    $('.cf7-wrapper[data-complex]').each(function(){
        var wrapp = $(this), complex = wrapp.attr('data-complex');
        if(complex){
            wrapp.find('[name="your-complex-name"]').val(complex);
        }
    });

    $('.cf7-wrapper[data-times]').each(function(){
        var wrapp = $(this), selectVals = wrapp.attr('data-times');
        if(selectVals){
            var select = wrapp.find('select[name="your-time"]');
            if(!select.length) return;
            selectVals = selectVals.split('|');
            select.html('').attr('data-up','1');
            for(var i=0; i<selectVals.length; i++ ){
                /*if(!i)
                    select.append('<option value="" selected disabled>'+selectVals[i]+'</option>')
                else*/
                    select.append('<option value="'+selectVals[i]+'">'+selectVals[i]+'</option>')
            }
            select[0].sumo.reload();
			select.parent().find('.optWrapper').addClass('up');
        }
    });

    $('.cf7-wrapper[data-addreses]').each(function(){
        var wrapp = $(this), selectVals = wrapp.attr('data-addreses');
        if(selectVals){
            var select = wrapp.find('select[name="your-address"]');
            if(!select.length) return;
            selectVals = selectVals.split('|');
            select.html('');
            for(var i=0; i<selectVals.length; i++ ){
                if(!i)
                    select.append('<option value="" selected disabled>'+selectVals[i]+'</option>')
                else
                    select.append('<option value="'+selectVals[i]+'">'+selectVals[i]+'</option>')
            }
            select[0].sumo.reload();
        }
    });
    if($('#enter-popup').length && getCookie('not_show_popup')=='0' ) {
        setTimeout("_functions.openPopup('#enter-popup');", 1000);
        setCookie('not_show_popup',1,1);
    }

    $('input[name="your-phone"]').on('focus', function(){
        // $(this).inputmask({"mask": "+38(099)999-99-99"});
        $(this).inputmask({
            mask: "+38(0x9)999-99-99",
            definitions: {
                'x': {
                    validator: "[1-9]"
                },
                '9': {
                    validator: "[0-9]"
                }
            }
        });
    });
    $('.next-lightbox').on('click',function(){
        $(this).closest('.lightbox-wrapper').find('.lightbox').eq(0).click();
        return false;
    });


    $(document).on('click','.wrapper_header_phone_mobile', function(e) {
        e.preventDefault();
        $('.wrapper_header_phone').toggleClass('active');
    });
});