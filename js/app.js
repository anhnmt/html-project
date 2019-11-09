require.config({
    deps: ['app'],
    paths: {
        jquery: 'jquery.min',
        slick: 'slick/slick.min',
        lazyload: 'lazyload/lazyload.min',
        bootstrap: 'bootstrap/bootstrap.bundle.min',
        scrollUp: 'scrollUp/jquery.scrollUp.min',
    },
    shim: {
        slick: {
            deps: ["jquery"]
        },
        bootstrap: {
            deps: ["jquery"]
        },
        scrollUp: {
            deps: ["jquery"]
        },
    },
});

define(['jquery', 'bootstrap'], function($) {
    'use strict'

    /*---Lazyload---*/
    require(['lazyload'], function(LazyLoad) {
        window.ll = new LazyLoad({
            elements_selector: ".lazy",
        });
    });

    /*---Slick-slider JS---*/
    require(['slick'], function(slick) {
        $('.hero-slider').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 9000,
            fade: true,
        });
    });

    /*---ScrollUp JS---*/
    require(['scrollUp'], function(scrollUp) {
        $.scrollUp({
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade',
            scrollText: '<i class="fas fa-arrow-up"></i>',
        });
    });

    /*---Tooltip---*/
    $('[data-toggle="tooltip"]').tooltip();

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

    /*---Check login---*/
    $(function() {
        if (('sessionStorage') in window) {
            var user = sessionStorage.getItem('user');
            if (user !== null && user !== '') {
                $('.header-account').html('<a id="btn_logout" data-toggle="tooltip" title="Đăng xuất"><i class="fas fa-user"></i> <span>Xin chào: ' + user + '</span></a>');
                $('[data-toggle="tooltip"]').tooltip();
            }
        }
    });

    /*---Click login---*/
    $('.txt_login').bind('blur keyup', function() {
        validate(this);
    });

    $('#btn_login').on('click', function() {
        $('.txt_login').blur();

        if (!$('.txt_login').hasClass('is-invalid')) {
            alert('Đăng nhập thành công!');
            if (('sessionStorage') in window) {
                var user = $('.txt_login[type="email"]').val();
                sessionStorage.setItem('user', user);
                location.replace('index.html');
            }
        }
    });

    /*---Click register---*/
    $('.txt_register').bind('blur keyup', function() {
        validate(this);
    });

    $('#btn_register').on('click', function() {
        $('.txt_register').blur();

        if (!$('.txt_register').hasClass('is-invalid')) {
            alert('Đăng ký thành công!');
            if (('sessionStorage') in window) {
                var user = $('.txt_register[type="email"]').val();
                sessionStorage.setItem('user', user);
                location.replace('index.html');
            }
        }
    });

    /*---Click logout---*/
    $('#btn_logout').on('click', function() {
        alert('Đăng xuất thành công!');
        if (('sessionStorage') in window) {
            sessionStorage.removeItem('user');
            location.replace('index.html');
        }
    });

    function validate(arg) {
        var el = $(arg);
        var value = el.val().trim();
        var id = el.attr('type');

        if (value === '') {
            el.addClass('is-invalid');
            return false;
        } else {
            const email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (id === 'email' && !email.test(value)) {
                el.addClass('is-invalid');
                return false;
            } else if (id === 'password' && value.length < 5) {
                el.addClass('is-invalid');
                return false;
            }
        }

        el.removeClass('is-invalid').addClass('is-valid');
        return true;
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    function tongCong() {
        var tong = 0;

        $("tbody .product-total").each(function(index) {
            tong += parseFloat($(this).attr('data-price'));
        });

        $('.cart-price, .cart-total').html(formatNumber(tong) + 'đ');
        return tong;
    }

    $('.product-quantity input').bind('change', function() {
        var parent = $(this).parent('td').parent('tr');
        var val = parseFloat($(this).val());
        var data_price = parseFloat(parent.data('product-price'));
        var price = parseFloat(data_price * val);
        parent.children('.product-total').attr('data-price', price).html(formatNumber(price) + 'đ');
        tongCong();
    });

    $("tbody .product-remove").click(function(event) {
        event.preventDefault();
        if ($("tbody .product-remove").length === 1) {
            $("tbody").html('<tr><td colspan="6">Không có gì cả...</td></tr>');
        }

        $(this).parent('tr').remove();
        tongCong();
    });

    $('.product-quantity input').change();
    tongCong();

    $("tbody .product-add, .add-cart").click(function(event) {
        event.preventDefault();
        var count = parseFloat($('.cart-quantity').html());
        $('.cart-quantity').html(count + 1);
    });

    $(".add-wishlist").click(function(event) {
        event.preventDefault();
        var count = parseFloat($('.wishlist-quantity').html());
        $('.wishlist-quantity').html(count + 1);
    });
});