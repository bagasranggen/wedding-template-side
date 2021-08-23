// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $(".header-main").outerHeight();

$(window).scroll(function (event) {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $("body").addClass("nav-hide");
        $(".header-main .dropdown-menu.show").click();
        // $('.header-main').removeClass("with-search");
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            $("body").removeClass("nav-hide");
        }
    }

    lastScrollTop = st;
}

$(function () {
    // Keep track on window screen size
    let window_size = $(window).width();
    $(window).resize(() => (window_size = $(window).width()));

    // add active on body on navbar nav open
    $(".navbar-collapse").on("show.bs.collapse", function (e) {
        $("body").addClass("active");
    });

    // add active on body on navbar nav close
    $(".navbar-collapse").on("hide.bs.collapse", function (e) {
        $("body").removeClass("active");
    });

    // toggle header open
    function toggleHeader(target) {
        if (window_size < 992) return; // will only work on desktop

        const check = target.hasClass("show");

        if (check) {
            // target.find(".dropdown-menu").addClass("d-block");
            setTimeout(() => $(".header-main").addClass("header-open"), 300);
        } else {
            $(".header-main").removeClass("header-open");
            // setTimeout(() => target.find(".dropdown-menu").removeClass("d-block"), 300);
        }
    }

    let active = -1;
    $(".header-main .navbar-main .dropdown .nav-link").click(function () {
        if (window_size < 992) return; // will only work on desktop

        const click = $(this).parents(".nav-item").index();

        if (active !== click) {
            $(".header-main.header-open").addClass("header-stay-open");
            $(".dropdown-menu.d-block").removeClass("d-block");
        } else {
            $(".header-main").removeClass("header-stay-open");
        }

        active = click;
    });
    // Toggle navigation when dropdown shown
    $(".header-main .navbar-main .dropdown").on(
        "shown.bs.dropdown",
        function () {
            toggleHeader($(this));
        }
    );
    // Toggle navigation when dropdown hidden
    $(".header-main .navbar-main .dropdown").on(
        "hidden.bs.dropdown",
        function () {
            toggleHeader($(this));
        }
    );

    // Prevent Navigation to show on screen jump up
    $(".scrollspy-leftnav ul a").click(function () {
        const target = $(this).attr("href");
        const target_top = $(target).offset().top;

        $("body").addClass("nav-hidden");

        $("body").animate({ scrollTop: target_top }, 1000, function () {
            $("body").removeClass("nav-hidden").addClass("nav-hide");
        });
    });

    function firstDropdownItem(target) {
        const nav_tab_active = $(`${target} .dropdown-item`)
            .first()
            .addClass("d-none")
            .html();
        $(`${target} [data-bs-toggle="dropdown"] span`).html(nav_tab_active);
    }

    function dropdownClick(target) {
        const current = target.html().split("(")[0];
        const btn_target = target
            .parents(".dropdown")
            .find('[data-bs-toggle="dropdown"]')
            .find("span");

        $(".dropdown-item.d-none").removeClass("d-none");
        $(".dropdown-item.active").removeClass("active");
        target.addClass("d-none");
        btn_target.html(current);
    }

    firstDropdownItem(".dropdown-main");

    $(".dropdown-main .dropdown-item").click(function (e) {
        e.preventDefault();
        dropdownClick($(this));
    });

    //
    firstDropdownItem(".vertical-tabs");
    firstDropdownItem(".horizontal-tabs");
    firstDropdownItem(".glossary-index__nav");
    firstDropdownItem(".side-nav-container");

    $(
        ".vertical-tabs .dropdown-item, .horizontal-tabs .dropdown-item, .glossary-index__nav .dropdown-item, .side-nav-container .dropdown-item"
    ).click(function () {
        dropdownClick($(this));
    });

    // Glossary index offset scroll change active item
    function glossaryScroll(t, type) {
        const target = t.attr("href");
        const target_top = $(target).offset().top - 100;

        $("body").addClass("nav-hidden");

        if (type === "desktop") {
            window.scrollTo({
                top: target_top,
                behavior: "smooth",
            });

            setTimeout(() => {
                $("body").removeClass("nav-hidden").addClass("nav-hide");
            }, 1000);
        } else if (type === "mobile") {
            $("body, html")
                .stop()
                .animate({ scrollTop: target_top }, 500, function () {
                    $("body").removeClass("nav-hidden").addClass("nav-hide");
                });
        }
    }

    // Glossary scroll for desktop
    $(".glossary-index__nav li a").click(function (e) {
        e.preventDefault();
        const active = $(this).html();

        // Change active item
        $(".glossary-index__nav li a.active").removeClass("active");
        $(this).addClass("active");
        $(".glossary-index__nav .dropdown button span").html(active);

        glossaryScroll($(this), "desktop");
    });

    // Glossary scroll for mobile
    $(".glossary-index__nav .dropdown-item").click(function (e) {
        e.preventDefault();
        glossaryScroll($(this), "mobile");
    });

    // Banner
    function addInternalStyle(add_css, id) {
        const check_style = $(`#${id}`).length;
        const head = document.head || document.getElementsByTagName("head")[0];
        const style = document.createElement("style");

        check_style > 0 && $(`#${id}`).remove();

        head.appendChild(style);
        style.setAttribute("id", id);
        style.type = "text/css";

        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = add_css;
        } else {
            style.appendChild(document.createTextNode(add_css));
        }
    }

    function resizeBannerBox(type) {
        const divider = type === "desktop" ? 2 : 1;
        const box_height =
            $(".banner--box .banner__content").outerHeight() / divider;

        const add_css = `
        @media (max-width: 767.98px) {
            .banner--box {
                height: calc(55rem + ${box_height}px);
            }
        }
        @media (min-width: 768px) {
            .banner--box .banner__bg {
                height: calc(100% - ${box_height}px);
            }
        }
        `;
        addInternalStyle(add_css, "banner_box");
    }

    resizeBannerBox(window_size >= 576 ? "desktop" : "mobile");
    $(window).resize(function () {
        window_size >= 576
            ? resizeBannerBox("desktop")
            : resizeBannerBox("mobile");
    });

    // Carousel
    $(".featured-blog-carousel .carousel-main").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
            "<img class='prev slick-prev' src='assets/img/chevron-circle-blue-left.svg'>",
        nextArrow:
            "<img class='next slick-next' src='assets/img/chevron-circle-blue-right.svg'>",
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
        ],
    });

    $(".features-carousel .carousel-main").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
            "<img class='prev slick-prev' src='assets/img/chevron-circle-white-left.svg'>",
        nextArrow:
            "<img class='next slick-next' src='assets/img/chevron-circle-white-right.svg'>",
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
        ],
    });

    $(".homepage-banner-carousel").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
            "<img class='prev slick-prev' src='assets/img/chevron-circle-white-left.svg'>",
        nextArrow:
            "<img class='next slick-next' src='assets/img/chevron-circle-white-right.svg'>",
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
        ],
    });

    $(".features-carousel-simple .carousel-main").slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow:
            "<img class='prev slick-prev' src='assets/img/chevron-circle-blue-left.svg'>",
        nextArrow:
            "<img class='next slick-next' src='assets/img/chevron-circle-blue-right.svg'>",
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                },
            },
        ],
    });

    $(".featured-media-carousel .carousel-main").slick({
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: "linear",
    });

    $(".slide-show").slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    $(".carousel-text").slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    $(".quotes-img-carousel, .upcoming-events-carousel").slick({
        autoplay: true,
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // $('.modal').on('show.bs.modal', function (e) {
    //     $('.modal.show').modal('hide');
    // });

    // $(".modal").on("show.bs.modal", function (e) {
    //     $(".quotes-img-carousel, .upcoming-events-carousel").css("opacity", 0);
    // });

    // $(".modal").on("shown.bs.modal", function (e) {
    //     $(".quotes-img-carousel, .upcoming-events-carousel")
    //         .slick("refresh")
    //         .css("opacity", 1);
    // });

    $('.card--horizontal [data-bs-toggle="modal"]').click(function () {
        const target = $("#modal_location");
        const title = "Lokasi " + $(this).data("title");
        const location = $(this).data("location");
        const current_title = target.find(".modal-title").html();
        const current_location = target
            .find(".modal-map")
            .find("iframe")
            .attr("src");

        // console.log(current_title);

        $(this).parents(".card__item").addClass("active");

        current_title !== title && target.find(".modal-title").html(title);
        current_location !== location &&
            target.find(".modal-map").find("iframe").attr("src", location);
    });

    $("#modal_location").on("hidden.bs.modal", function () {
        $(".card--horizontal .card__item.active").removeClass("active");
    });

    //initiate scroll spy
    if ($(".scrollspy-leftnav__nav").length > 0) {
        $("body").scrollspy({
            target: ".scrollspy-leftnav__nav",
            offset: 100,
        });
    }

    // Keep scroll spy last item to be active
    $(window).on("activate.bs.scrollspy", function (e, obj) {
        const item = $(`[href="${obj.relatedTarget}"]`);

        if (
            item.parents("li").is(":first-child") ||
            item.parents("li").is(":last-child")
        ) {
            item.addClass("stay-active");
        } else {
            $(".nav-link.stay-active").removeClass("stay-active");
        }
    });

    // Prevent scroll spy links' active when click on anchor
    $(".scrollspy-leftnav__nav .nav-link").click(function () {
        const link = $(".scrollspy-leftnav__nav .nav-link");

        link.addClass("nav-disabled");
        $(".header").addClass("nav-hidden");
        $(this).removeClass("nav-disabled");

        setTimeout(() => {
            link.removeClass("nav-disabled");
        }, 1500);
    });

    // Good company image transition
    const max_gc = $(".good-company__item").length;
    let current_gc = Number();

    setInterval(() => {
        const random = Math.floor(Math.random() * max_gc);
        const target = $(
            `.good-company .row-main > [class*="col-"]:nth-child(${
                current_gc + 1
            })`
        );
        const max = target.find("picture").length;
        const current_active = target.find("picture.active");
        const next_active =
            current_active.index() === max - 1
                ? target.find("picture").first()
                : target.find("picture.active").next();

        current_active.removeClass("active");
        next_active.addClass("active");

        current_gc =
            random === current_gc ? Math.floor(Math.random() * max_gc) : random;
    }, 4000);

    $(".select-main, .select-main-lg").change(function () {
        $(this).removeClass("select--trans");
    });
});
