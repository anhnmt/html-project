$(document).ready(function() {
    'use strict'

    /*---Slick-slider JS---*/
    require(["../js/slick-slider/slick.min.js"], function(slick) {
        $('.hero-slider').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 9000,
            fade: true,
            lazyLoad: 'ondemand',
        });
    });
    
    /*---Lazyload---*/
    require(["../js/lazyload/lazyload.min.js"], function(LazyLoad) {
        window.ll = new LazyLoad({
            elements_selector: ".lazy",
        });
    });

    /*---Bootstrap JS---*/
    require(["../js/bootstrap/bootstrap.bundle.min.js"], function() {
        /*---Tooltip---*/
        $('[data-toggle="tooltip"]').tooltip();
    });

    /*---ScrollUp JS---*/
    require(["../js/scrollUp/jquery.scrollUp.min.js"], function(scrollUp) {
        $.scrollUp({
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade',
            scrollText: '<i class="fas fa-arrow-up"></i>',
        });
    });

    /*---Stickey Menu---*/
    var navbarSticky = $(".header-bottom");
    var stickyTop = navbarSticky.offset().top;
    
    /*---Scroll JS---*/
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
});