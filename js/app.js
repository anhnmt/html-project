$(document).ready(function() {
    // jQuery('.main-menu .mega-menu-tree').parent('ul').addClass('mega-menu three-column');

    $('[data-toggle="tooltip"]').tooltip();

    /*---stickey menu---*/
    $(window).on('scroll',function() {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $(".header-bottom").removeClass("fixed-top");
        } else {
            $(".header-bottom").addClass("fixed-top");
        }
    });
});