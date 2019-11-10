function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + 'đ';
}


var WishlistManager = (function() {
    var objToReturn = {};

    /*
    PRIVATE
    */
    if (typeof(Storage) !== "undefined") {
        localStorage.wishlists = localStorage.wishlists ? localStorage.wishlists : "";
    }
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
    var updatePoduct = function(id) {
        var wishlistIndex = getIndexOfWishlist(id);
        if (wishlistIndex < 0) {
            return false;
        }
        var wishlists = getAllWishlists();
        setAllWishlists(wishlists);
        return true;
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

        if (!updatePoduct(id)) {
            addWishlist(id, name, cat, price, image);
        } else {
            removeWishlist(id);
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
    var getTotalQuantityOfWishlist = function() {
        var total = 0;
        var wishlists = getAllWishlists();
        $.each(wishlists, function(index, value) {
            total += 1;
        });
        return total;
    }

    objToReturn.getIndexOfWishlist = getIndexOfWishlist;
    objToReturn.getAllWishlists = getAllWishlists;
    objToReturn.updatePoduct = updatePoduct;
    objToReturn.setWishlist = setWishlist;
    objToReturn.clearWishlist = clearWishlist;
    objToReturn.removeWishlist = removeWishlist;
    objToReturn.getTotalQuantityOfWishlist = getTotalQuantityOfWishlist;
    return objToReturn;
}());

$(".add-wishlist").each(function(index) {
    var $target = $(this).closest('.item-product');
    var id = $target.data('id');
    var wishlistIndex = WishlistManager.getIndexOfWishlist(id);
    if (wishlistIndex < 0) {
        $(this).removeClass('wishlist-added');
    } else {
        $(this).addClass('wishlist-added');
    }
    // console.log(id, name, img, price, quantity);
});

$(".add-wishlist").click(function(event) {
    event.preventDefault();
    $(this).toggleClass('wishlist-added');
    var $target = $(this).closest('.item-product');
    var id = $target.data('id');
    var name = $target.data('name');
    var cat = $target.data('cat');
    var price = $target.data('price');
    var image = $target.data('img');

    WishlistManager.setWishlist(id, name, cat, price, image);
    $('.wishlist-quantity').text(WishlistManager.getTotalQuantityOfWishlist());
});

var wishlistTable = function() {
    $('.table-wishlist tbody').empty();
    var wishlists = WishlistManager.getAllWishlists();
    wishlists.length ?
        $.each(wishlists, function() {
            $('.table-wishlist tbody').append(`
            <tr data-id="${this.id}" data-name="${this.name}" data-cat="${this.cat}" data-price="${this.price}", data-quantity="1", data-img="${this.image}">
                <td class="product-thumb">
                    <a href="#"><img src="${this.image}" alt="${this.name}"></a>
                </td>
                <td class="product-name"><a href="#">${this.name}</a></td>
                <td class="product-price">${formatNumber(this.price)}</td>
                <td class="product-add"><a href="#">Thêm vào giỏ</a></td>
                <td class="product-remove"><a href="#"><i class="far fa-trash"></i></a></td>
            </tr>`);
        }) :
        $('.table-wishlist tbody').append('<tr><td colspan="6">Không có gì cả ...</td></tr>');
}

$(document).on('click', ".table-wishlist tbody .product-remove a", function() {
    var $target = $(this).closest('tr');
    var id = $target.data("id");
    $target.hide(300, function() {
        WishlistManager.removeWishlist(id);
        wishlistTable();
        $('.wishlist-quantity').text(WishlistManager.getTotalQuantityOfWishlist());
    });
});

$('.wishlist-quantity').text(WishlistManager.getTotalQuantityOfWishlist());
wishlistTable();

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

$(".product-add a").click(function(event) {
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

var productTable = function() {
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

var checkoutTable = function() {
    $('.table-checkout tbody').empty();
    var products = ProductManager.getAllProducts();
    products.length ?
        $.each(products, function() {
            var total = formatNumber(this.quantity * this.price);
            $('.table-checkout tbody').append(`
            <tr>
                <td>${this.name} <strong> × ${this.quantity}</strong></td>
                <td>${total}</td>
            </tr>`);
        }) :
        $('.table-checkout tbody').append('<tr><td colspan="6">Không có gì cả ...</td></tr>');
}

$(document).on("input", ".table-cart .product-quantity input", function() {
    var $target = $(this).closest('tr');
    var price = $target.data("price");
    var id = $target.data("id");
    var quantity = $(this).val();
    var total = formatNumber(price * quantity);

    $(this).parent("td").next(".product-total").text(total);
    ProductManager.updatePoduct(id, quantity);
    $('.cart-quantity').text(ProductManager.getTotalQuantityOfProduct());
    productTotal(ProductManager.getAllProducts());
});

$(document).on('click', ".table-cart tbody .product-remove a", function() {
    var $target = $(this).closest('tr');
    var id = $target.data("id");
    $target.hide(300, function() {
        ProductManager.removeProduct(id);
        productTable();
        $('.cart-quantity').text(ProductManager.getTotalQuantityOfProduct());
    });
});

var productTotal = function(products) {
    var total = 0;
    $.each(products, function() {
        total += this.quantity * this.price;
    });
    $(".cart-price, .cart-total").text(formatNumber(total));
}

$('.cart-quantity').text(ProductManager.getTotalQuantityOfProduct());
productTable();
checkoutTable();
productTotal(ProductManager.getAllProducts());