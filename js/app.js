require.config({
    deps: ['app'],
    paths: {
        jquery: 'jquery.min',
        slick: 'slick/slick.min',
        lazyload: 'lazyload/lazyload.min',
        bootstrap: 'bootstrap/bootstrap.bundle.min',
        scrollUp: 'scrollUp/jquery.scrollUp.min',
        jqueryValidate: 'jqueryValidate/jquery.validate.min',
        customJS: 'custom',
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
        jqueryValidate: {
            deps: ["jquery"]
        },
        customJS: {
            deps: ["jquery"]
        },
    },
});

define(['jquery', 'bootstrap', 'customJS'], function($) {
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
        if (typeof(Storage) !== 'undefined') {
            localStorage.isLogin = localStorage.isLogin ? localStorage.isLogin : "";

            var user = localStorage.isLogin;
            if (user !== null && user !== '') {
                $('.header-account').html('<i class="fas fa-user"></i> <span>Xin chào: ' + user + '</span> | <a id="btn_logout" data-toggle="tooltip" title="Đăng xuất"><span>Đăng xuất</span></a>');
                $('[data-toggle="tooltip"]').tooltip();

                /*---Click logout---*/
                $('#btn_logout').click(function() {
                    alert('Đăng xuất thành công!');
                    localStorage.removeItem('user');
                    location.replace('index.html');
                });
            }
        }
    });

    /*---jQuery Validate---*/
    require(['jqueryValidate'], function(validate) {
        /*---Validate login---*/
        $("#form_Login").validate({
            rules: {
                login_Email: {
                    required: true,
                    email: true,
                    normalizer: function(value) {
                        return $.trim(value);
                    }
                },
                login_Password: {
                    required: true,
                    minlength: 6,
                    normalizer: function(value) {
                        return $.trim(value);
                    }
                },
            },
            messages: {
                login_Email: {
                    required: "Nhập email của bạn",
                    email: "Vui lòng nhập một địa chỉ email hợp lệ.",
                },
                login_Password: {
                    required: "Nhập mật khẩu của bạn",
                    minlength: "Vui lòng nhập ít nhất 6 ký tự.",
                },
            },
            highlight: function(input) {
                $(input).addClass('is-invalid');
            },
            unhighlight: function(input) {
                $(input).removeClass('is-invalid');
            },
            errorPlacement: function(error, element) {
                $(element).next().append(error);
            },
            submitHandler: function() {
                if (typeof(Storage) !== 'undefined') {
                    localStorage.users = localStorage.users ? localStorage.users : "";

                    var getAllUsers = function() {
                        try {
                            var users = JSON.parse(localStorage.users);
                            return users;
                        } catch (e) {
                            return [];
                        }
                    }
                    var getIndexOfUser = function(username, password) {
                        var userIndex = -1;
                        var users = getAllUsers();
                        $.each(users, function(index, value) {
                            if (value.username === username && value.password === password) {
                                userIndex = index;
                                return;
                            }
                        });
                        return userIndex;
                    }

                    var username = $('.txt_login[type="email"]').val();
                    var password = $('.txt_login[type="password"]').val();
                    var userIndex = getIndexOfUser(username, password);
                    if (userIndex < 0) {
                        alert('Đăng nhập thất bại, vui lòng thử lại!');
                    } else {
                        localStorage.isLogin = username;
                        alert('Đăng nhập thành công!');
                        location.replace('index.html');
                    }
                }
            }
        });

        /*---Validate register---*/
        $("#form_Register").validate({
            rules: {
                register_Email: {
                    required: true,
                    email: true,
                    normalizer: function(value) {
                        return $.trim(value);
                    }
                },
                register_Password: {
                    required: true,
                    minlength: 6,
                    normalizer: function(value) {
                        return $.trim(value);
                    }
                },
            },
            messages: {
                register_Email: {
                    required: "Nhập email của bạn",
                    email: "Vui lòng nhập một địa chỉ email hợp lệ.",
                },
                register_Password: {
                    required: "Nhập mật khẩu của bạn",
                    minlength: "Vui lòng nhập ít nhất 6 ký tự.",
                },
            },
            highlight: function(input) {
                $(input).addClass('is-invalid');
            },
            unhighlight: function(input) {
                $(input).removeClass('is-invalid');
            },
            errorPlacement: function(error, element) {
                $(element).next().append(error);
            },
            submitHandler: function() {
                alert('Đăng ký thành công, vui lòng đăng nhập!');
                if (typeof(Storage) !== 'undefined') {
                    var user = [];
                    user.push({
                        username: $('.txt_register[type="email"]').val(),
                        password: $('.txt_register[type="password"]').val(),
                    });
                    localStorage.users = JSON.stringify(user);
                    location.reload();
                }
            }
        });
    });
});