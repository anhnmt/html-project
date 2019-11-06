/*---Check login---*/
$('.txt_login').bind('blur keyup', function() {
    check(this);
});

$('#btn_login').on('click', function() {
    $('.txt_login').blur();

    if (!$('.txt_login').hasClass('is-invalid')) {
        alert('Đăng nhập thành công!');
        var user = $('.txt_login[type="email"]').val();
        sessionStorage.setItem('user', user);
        location.replace('index.html');
    }
});

/*---Check register---*/
$('.txt_register').bind('blur keyup', function() {
    check(this);
});

$('#btn_register').on('click', function() {
    $('.txt_register').blur();

    if (!$('.txt_register').hasClass('is-invalid')) {
        alert('Đăng ký thành công!');
        var user = $('.txt_register[type="email"]').val();
        sessionStorage.setItem('user', user);
        location.replace('index.html');
    }
});

function check(arg) {
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