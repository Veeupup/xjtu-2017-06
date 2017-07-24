(function () {
    var $sidebar = $('.sidebar');

    function showSidebar() {
        $sidebar.show();
        setTimeout(function () {
            $sidebar.addClass('active');
        }, 0);
    }

    function hideSidebar() {
        $sidebar.removeClass('active');
        setTimeout(function () {
            if (!$sidebar.hasClass('active')) {
                $sidebar.hide();
            }
        }, 500);
    }

    $('.header-right').click(function () {
        showSidebar();
    });
    $('.sidebar-bg').click(function () {
        hideSidebar();
    });

    $(document).pjax('a[data-pjax]', '.main');
    $(document).on('pjax:clicked', function () {
        hideSidebar();
    });
    $(document).on('pjax:end', function () {
        $("img[data-original]").lazyload();
    });

    $("body").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            var $sidebar = $('.sidebar');
            if (direction === 'left' && !$sidebar.hasClass('active')) {
                showSidebar();
            } else if (direction === 'right' && $sidebar.hasClass('active')) {
                hideSidebar();
            }
        },
        threshold: 50,
        fingers: 'all'
    });

    /* only for index */
    (function () {
        var listener = function () {
            if ($('.main-content-index').length) {
                $('.main-content-index-swiper').height(window.innerHeight - $('.header').height());
                var swiper = new Swiper('.main-content-index-swiper', {
                    pagination: '.main-content-index-swiper .swiper-pagination',
                    paginationClickable: true,
                    direction: 'vertical'
                });
                $('.footer').hide();
            } else {
                $('.footer').show();
            }
        };
        $(document).on('pjax:end', listener);
        listener();
    })();
})();
