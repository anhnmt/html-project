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

    /*---offcanvas menu---*/
    $('.navbar-toggler').on('click', function() {
        $('body').addClass('block');
        $('#header-navbar').addClass('show');
        $('.overlay').show();
    });

    $('.overlay').on('click', function() {
        $('body').removeClass('block');
        $('#header-navbar').removeClass('show');
        $('.overlay').hide();
    });
});