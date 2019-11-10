require.config({
    deps: ['app'],
    paths: {
        jquery: 'jquery.min',
        slick: 'slick/slick.min',
        lazyload: 'lazyload/lazyload.min',
        bootstrap: 'bootstrap/bootstrap.bundle.min',
        scrollUp: 'scrollUp/jquery.scrollUp.min',
        jqueryValidate: 'jqueryValidate/jquery.validate.min',
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
                $('.header-account').html('<i class="fas fa-user"></i> <span>Xin chào: ' + user + '</span> | <a id="btn_logout" data-toggle="tooltip" title="Đăng xuất"><span>Đăng xuất</span></a>');
                $('[data-toggle="tooltip"]').tooltip();

                /*---Click logout---*/
                $('#btn_logout').click(function() {
                    alert('Đăng xuất thành công!');
                    if (('sessionStorage') in window) {
                        sessionStorage.removeItem('user');
                        location.replace('index.html');
                    }
                });
            }
        }
    });

    $(".item-product").each(function(index) {
        var id = $(this).data('id') ? $(this).data('id') : '';
        var name = $(this).data('name') ? $(this).data('name') : '';
        var cat = $(this).data('cat') ? $(this).data('cat') : '';
        var img = $(this).data('img') ? $(this).data('img') : '';
        var price = formatNumber($(this).data('price') ? $(this).data('price') : 0);
        var old_price = $(this).data('old-price') ? formatNumber($(this).data('old-price')) : '';
        var quantity = $(this).data('quantity') ? $(this).data('quantity') : 1;
        // console.log(id, name, img, price, quantity);
        $(this).html(`
        <div class="item-image">
            <a href="product.html" title="${name}">
                <img class="lazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="${img}" alt="${name}">
            </a>

            <div class="item-wishlist">
                <a class="add-wishlist" data-toggle="tooltip" title="Thích sản phẩm"><i class="far fa-heart"></i></a>
                <a class="add-cart" data-toggle="tooltip" title="Thêm vào giỏ hàng"><i class="far fa-shopping-cart"></i></a>
            </div>
        </div>

        <div class="item-content">
            <div class="item-title">
                <a href="product.html" title="${name}">
                    <span class="cat">${cat}</span>
                    <h5 class="title">${name}</h5>
                </a>
            </div>
            <div class="item-price">
                <h5 class="price">
                    <span class="new">
                        <span class="money">${price}</span>
                    </span>
                    <span class="old">
                        <span class="money">${old_price}</span>
                    </span>
                </h5>
            </div>
        </div>`);
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
                alert('Đăng nhập thành công!');
                if (('sessionStorage') in window) {
                    var user = $('.txt_login[type="email"]').val();
                    sessionStorage.setItem('user', user);
                    location.replace('index.html');
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
                alert('Đăng ký thành công!');
                if (('sessionStorage') in window) {
                    var user = $('.txt_register[type="email"]').val();
                    sessionStorage.setItem('user', user);
                    location.replace('index.html');
                }
            }
        });
    });

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
    }

    // localStorage.products = localStorage.products ? localStorage.products : "";
    // localStorage.wishlists = localStorage.wishlists ? localStorage.wishlists : "";


    var WishlistManager = (function() {
        var objToReturn = {};

        /*
        PRIVATE
        */
        localStorage.wishlists = localStorage.wishlists ? localStorage.wishlists : "";
        var getIndexOfWishlist = function(id) {
            var wishlistIndex = -1;
            var wishlists = getAllWishlists();
            $.each(wishlists, function(index, value) {
                if (value.id == id) {
                    wishlistIndex = index;
                    return;
                }
            });
            return wishlistIndex;
        }
        var setAllWishlists = function(wishlists) {
            localStorage.wishlists = JSON.stringify(wishlists);
        }
        var addWishlist = function(id, name, cat, price, image) {
            var wishlists = getAllWishlists();
            wishlists.push({
                id: id,
                name: name,
                cat: cat,
                price: price,
                image: image
            });
            setAllWishlists(wishlists);
        }

        /*
        PUBLIC
        */
        var getAllWishlists = function() {
            try {
                var wishlists = JSON.parse(localStorage.wishlists);
                return wishlists;
            } catch (e) {
                return [];
            }
        }
        var setWishlist = function(id, name, cat, price, image) {
            if (typeof id === "undefined") {
                console.error("id required")
                return false;
            }
            if (typeof name === "undefined") {
                console.error("name required")
                return false;
            }
            if (typeof image === "undefined") {
                console.error("image required")
                return false;
            }
            if (!$.isNumeric(price)) {
                console.error("price is not a number")
                return false;
            }
            cat = typeof cat === "undefined" ? "" : cat;

            if (!updateWishlist(id)) {
                addWishlist(id, name, cat, price, image);
            }
        }
        var clearWishlist = function() {
            setAllWishlists([]);
        }
        var removeWishlist = function(id) {
            var wishlists = getAllWishlists();
            wishlists = $.grep(wishlists, function(value, index) {
                return value.id != id;
            });
            setAllWishlists(wishlists);
        }
        var getTotalWishlist = function() {
            var total = 0;
            var wishlists = getAllWishlists();
            $.each(wishlists, function(index, value) {
                total += 1;
            });
            return total;
        }

        objToReturn.getAllWishlists = getAllWishlists;
        objToReturn.setWishlist = setWishlist;
        objToReturn.clearWishlist = clearWishlist;
        objToReturn.removeWishlist = removeWishlist;
        objToReturn.getTotalWishlist = getTotalWishlist;
        return objToReturn;
    }());

    var ProductManager = (function() {
        var objToReturn = {};

        /*
        PRIVATE
        */
        localStorage.products = localStorage.products ? localStorage.products : "";
        var getIndexOfProduct = function(id) {
            var productIndex = -1;
            var products = getAllProducts();
            $.each(products, function(index, value) {
                if (value.id == id) {
                    productIndex = index;
                    return;
                }
            });
            return productIndex;
        }
        var setAllProducts = function(products) {
            localStorage.products = JSON.stringify(products);
        }
        var addProduct = function(id, name, cat, price, quantity, image) {
            var products = getAllProducts();
            products.push({
                id: id,
                name: name,
                cat: cat,
                price: price,
                quantity: quantity,
                image: image
            });
            setAllProducts(products);
        }

        /*
        PUBLIC
        */
        var getAllProducts = function() {
            try {
                var products = JSON.parse(localStorage.products);
                return products;
            } catch (e) {
                return [];
            }
        }
        var updatePoduct = function(id, quantity) {
            var productIndex = getIndexOfProduct(id);
            if (productIndex < 0) {
                return false;
            }
            var products = getAllProducts();
            products[productIndex].quantity = typeof quantity === "undefined" ? products[productIndex].quantity * 1 + 1 : quantity;
            setAllProducts(products);
            return true;
        }
        var setProduct = function(id, name, cat, price, quantity, image) {
            if (typeof id === "undefined") {
                console.error("id required")
                return false;
            }
            if (typeof name === "undefined") {
                console.error("name required")
                return false;
            }
            if (typeof image === "undefined") {
                console.error("image required")
                return false;
            }
            if (!$.isNumeric(price)) {
                console.error("price is not a number")
                return false;
            }
            if (!$.isNumeric(quantity)) {
                console.error("quantity is not a number");
                return false;
            }
            cat = typeof cat === "undefined" ? "" : cat;

            if (!updatePoduct(id)) {
                addProduct(id, name, cat, price, quantity, image);
            }
        }
        var clearProduct = function() {
            setAllProducts([]);
        }
        var removeProduct = function(id) {
            var products = getAllProducts();
            products = $.grep(products, function(value, index) {
                return value.id != id;
            });
            setAllProducts(products);
        }
        var getTotalQuantityOfProduct = function() {
            var total = 0;
            var products = getAllProducts();
            $.each(products, function(index, value) {
                total += value.quantity * 1;
            });
            return total;
        }

        objToReturn.getAllProducts = getAllProducts;
        objToReturn.updatePoduct = updatePoduct;
        objToReturn.setProduct = setProduct;
        objToReturn.clearProduct = clearProduct;
        objToReturn.removeProduct = removeProduct;
        objToReturn.getTotalQuantityOfProduct = getTotalQuantityOfProduct;
        return objToReturn;
    }());

    $(".add-cart").click(function(event) {
        event.preventDefault();
        var $target = $(this).closest('.item-product');
        var id = $target.data('id');
        var name = $target.data('name');
        var cat = $target.data('cat');
        var price = $target.data('price');
        var quantity = $target.data('quantity');
        var image = $target.data('img');

        ProductManager.setProduct(id, name, cat, price, quantity, image);
        $('.cart-quantity').text(ProductManager.getTotalQuantityOfProduct());
    });

    $(".product-add").click(function(event) {
        event.preventDefault();
        var $target = $(this).closest('tr');
        var id = $target.data('id');
        var name = $target.data('name');
        var cat = $target.data('cat');
        var price = $target.data('price');
        var quantity = $target.data('quantity');
        var image = $target.data('img');

        ProductManager.setProduct(id, name, cat, price, quantity, image);
        $('.cart-quantity').text(ProductManager.getTotalQuantityOfProduct());
    });

    var drawTable = function() {
        $('.table-cart tbody').empty();
        var products = ProductManager.getAllProducts();
        products.length ?
            $.each(products, function() {
                var total = formatNumber(this.quantity * this.price);
                $('.table-cart tbody').append(`
                <tr data-id="${this.id}" data-price="${this.price}">
                    <td class="product-thumb">
                        <a href="#"><img src="${this.image}" alt="${this.name}"></a>
                    </td>
                    <td class="product-name"><a href="#">${this.name}</a></td>
                    <td class="product-price">${formatNumber(this.price)}</td>
                    <td class="product-quantity"><input min="1" max="100" value="${this.quantity}" type="number"></td>
                    <td class="product-total">${total}</td>
                    <td class="product-remove"><a href="#"><i class="far fa-trash"></i></a></td>
                </tr>`);
            }) :
            $('.table-cart tbody').append('<tr><td colspan="6">Không có gì cả ...</td></tr>');
    }

    $(document).on("input", ".product-quantity input", function() {
        var $target = $(this).closest('tr');
        var price = $target.data("price");
        var id = $target.data("id");
        var quantity = $(this).val();
        var total = formatNumber(price * quantity);

        $(this).parent("td").next(".product-total").text(total);
        ProductManager.updatePoduct(id, quantity);
        $('.cart-quantity').text(ProductManager.getTotalQuantityOfProduct());
        var products = ProductManager.getAllProducts();
        showGrandTotal(products);
    });

    $(document).on('click', "tbody .product-remove", function() {
        var $target = $(this).closest('tr');
        var id = $target.data("id");
        $target.hide(500, function() {
            ProductManager.removeProduct(id);
            drawTable();
            $('.cart-quantity').text(ProductManager.getTotalQuantityOfProduct());
        });
    });

    var showGrandTotal = function(products) {
        var total = 0;
        $.each(products, function() {
            total += this.quantity * this.price;
        });
        $(".cart-price, .cart-total").text(formatNumber(total));
    }

    var products = ProductManager.getAllProducts();
    showGrandTotal(products);
    $('.cart-quantity').text(ProductManager.getTotalQuantityOfProduct());
    drawTable();

    // $(".add-wishlist").click(function(event) {
    //     event.preventDefault();
    //     var count = parseFloat($('.wishlist-quantity').html());
    //     $('.wishlist-quantity').html(count + 1);
    // });
});