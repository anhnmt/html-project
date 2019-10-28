$(document).ready(function() {
    'use strict'

    /*---Tooltip---*/
    $('[data-toggle="tooltip"]').tooltip();

    /*---Stickey Menu---*/
    var navbarSticky = $(".header-bottom");
    var stickyTop = navbarSticky.offset().top;

    $(window).on('scroll', function() {
        var windowTop = $(window).scrollTop();

        if (stickyTop < windowTop) {
            navbarSticky.addClass("fixed-top");
        } else {
            navbarSticky.removeClass("fixed-top");
        }
    });

    /*---Offcanvas Menu---*/
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

    /*---Slider Pro---*/
    $('.slider-pro').sliderPro({
        width: "100%",
        height: "80vh",
        arrows: true,
        fade: true,
        autoplay: true,
        buttons: true,
        autoScaleLayers: false,
        responsive: true,
        thumbnailTouchSwipe: true
    });
});