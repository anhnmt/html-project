$(document).ready(function() {
    'use strict'

    /*---tooltip---*/
    $('[data-toggle="tooltip"]').tooltip();

    /*---stickey menu---*/
    var navbarSticky = $(".header-bottom");
    var stickyTop = navbarSticky.offset().top;

    $(window).on('scroll',function() {
        var windowTop = $(window).scrollTop();

        if (stickyTop < windowTop) {
            navbarSticky.addClass("fixed-top");
        } else {
            navbarSticky.removeClass("fixed-top");
        }
    });

    /*---Sự kiện click ra ngoài---*/
    $(document).click(function (e) {
        var target = $(e.target);
        /*---offcanvas menu---*/
        if(!target.is('.collapse') && $('.collapse').hasClass('show') === true) {
            $('.collapse').collapse('toggle');
        }
    });
});