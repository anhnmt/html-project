function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function tongCong() {
    var tong = 0;

    $("tbody .product-total").each(function( index ) {
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