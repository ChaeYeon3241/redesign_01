/* 탑바 */
$('.menu-bar .menu-box').mouseenter(function () {
    $('.menu-bar').addClass('menu-box-1-actived');
});

$('.menu-bar').mouseleave(function () {
    $('.menu-bar').removeClass('menu-box-1-actived');
});

$('.menu-bar .megabox-logo').mouseenter(function () {
    $('.menu-bar').removeClass('menu-box-1-actived');
});

$('.menu-bar .megabox-store').mouseenter(function () {
    $('.menu-bar').removeClass('menu-box-1-actived');
});

/* 왼쪽메뉴 */
$(".sitemap").click(function () {
    $(".total-menu-box").addClass("active");
    $(".total-bg").addClass("active");
});
$(".total-close-btn,.total-bg").click(function () {
    $(".total-menu-box").removeClass("active");
    $(".total-bg").removeClass("active");
});

/* 슬라이더 박스 1*/

var slideWrapper = $(".main-slider"),
    iframes = slideWrapper.find('.embed-player'),
    lazyImages = slideWrapper.find('.slide-image'),
    lazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command) {
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control) {
    var currentSlide, slideType, startTime, player, video;

    currentSlide = slick.find(".slick-current");
    slideType = currentSlide.attr("class").split(" ")[1];
    player = currentSlide.find("iframe").get(0);
    startTime = currentSlide.data("video-start");

    if (slideType === "video") {
        video = currentSlide.children("video").get(0);
        if (video != null) {
            if (control === "play") {
                video.play();
            } else {
                video.pause();
            }
        }
    }
}

// Resize player
function resizePlayer(iframes, ratio) {
    if (!iframes[0]) return;
    var win = $(".main-slider"),
        width = win.width(),
        playerWidth,
        height = win.height(),
        playerHeight,
        ratio = ratio || 16 / 9;

    iframes.each(function () {
        var current = $(this);
        if (width / ratio < height) {
            playerWidth = Math.ceil(height * ratio);
            current.width(playerWidth).height(height).css({
                left: (width - playerWidth) / 2,
                top: 0
            });
        } else {
            playerHeight = Math.ceil(width / ratio);
            current.width(width).height(playerHeight).css({
                left: 0,
                top: (height - playerHeight) / 2
            });
        }
    });
}

// DOM Ready
$(function () {
    // Initialize
    slideWrapper.on("init", function (slick) {
        slick = $(slick.currentTarget);
        setTimeout(function () {
            playPauseVideo(slick, "play");
        }, 1000);
        resizePlayer(iframes, 16 / 9);
    });
    slideWrapper.on("beforeChange", function (event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick, "pause");
    });
    slideWrapper.on("afterChange", function (event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick, "play");
    });
    slideWrapper.on("lazyLoaded", function (event, slick, image, imageSource) {
        lazyCounter++;
        if (lazyCounter === lazyImages.length) {
            lazyImages.addClass('show');
            // slideWrapper.slick("slickPlay");
        }
    });

    //start the slider
    slideWrapper.slick({
        autoplaySpeed: 4000,
        lazyLoad: "progressive",
        speed: 600,
        arrows: false,
        dots: false,
        cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)"
    });
});

// Resize event
$(window).on("resize.slickVideoPlayer", function () {
    resizePlayer(iframes, 16 / 9);
});

/* 슬라이더 박스 2*/

function SliderBox2__init() {
    $('.slider-box-2 > .slick').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
        prevArrow: ".slider-box-2 .slick-btn-prev",
        nextArrow: ".slider-box-2 .slick-btn-next",
        customPaging: function (slick, index) {
            return '<div class="page-btn"></div>';
        }
    });
}

$(function () {
    SliderBox2__init();
});

$(".mv-st").on({
    mouseover: function () {
        $(this).find("img:nth-child(1)").stop().animate({
            opacity: 0
        }, 600);
        $(this).find("img:nth-child(2)").stop().animate({
            opacity: 1
        }, 600);
    },
    mouseout: function () {
        $(this).find("img:nth-child(1)").stop().animate({
            opacity: 1
        }, 600);
        $(this).find("img:nth-child(2)").stop().animate({
            opacity: 0
        }, 600);
    }
});

/*극장찾기*/
$(".footer-one .ft-find").click(function () {
    $(".dt-search").fadeIn();
});
$(".dt-search .dts-btn").click(function () {
    $(".dt-search").fadeOut();
});