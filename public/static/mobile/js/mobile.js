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

    
})();
