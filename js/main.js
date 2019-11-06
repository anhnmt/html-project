require.config({
    deps: ['app'],
    paths: {
        jquery: 'jquery.min',
        slick: 'slick/slick.min',
        lazyload: 'lazyload/lazyload.min',
        bootstrap: 'bootstrap/bootstrap.bundle.min',
        scrollUp: 'scrollUp/jquery.scrollUp.min',
        loginJS: 'myjs/login',
        productJS: 'myjs/product',
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
        loginJS: {
            deps: ["jquery"]
        },
    },
});