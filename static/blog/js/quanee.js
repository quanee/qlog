var curid = 10;
var offs = 5;
var codemirror;
var md;
var isGet = true;
var toggleNavMenu = true;

function backTop() {
    let scrolltop = [];
    let i = 0;
    scrolltop[0] = 0;
    console.log("out")
    $(document).scroll(function () {
        i++;
        console.log("hello")
        scrolltop[i] = $(document).scrollTop();
        if ($(window).width() > 1111) {
            if (scrolltop[i] > scrolltop[i - 1]) {
                $('#backtop').fadeOut(200)
            } else {
                $('#backtop').fadeIn(200)
            }
        }
    });

    $('#backtop').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500, easeInOutQuint());
    });

    function easeInOutQuint(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
}

$('#nav-menu').on('click', function () {
    $('body.nav')
});

$('#search-btn').click(function () {
    fetch("/search/" + $('#search-input').val(), {
            method: 'POST',
        }
    ).then(
        (res) => {
            return res.text()
        }
    ).then(
        (res) => {
            window.history.pushState("", "", "/search?w=" + $('#search-input').val());
            $("#content").html(res);
        }
    );
});


function getartic(cid, offset) {
    isGet = false;
    $('#loadmore').removeClass('hidden').addClass('show');
    fetch('/article?' + 'id=' + cid + '&offset=' + offset, {
        method: 'GET',
    }).then(
        (res) => {
            return res.text()
        }
    ).then(
        (res) => {
            if (res === "done") {
                isGet = false;
            } else {
                $(document).ready(function () {
                    $('#index-article').html($('#index-article').html() + res);
                });
                isGet = true;
            }

            $('#loadmore').removeClass('show').addClass('hidden');
        }
    );
}


$.fn.isOnViewport = function () {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).scroll(function () {
    if (window.location.pathname.substring(0, 6) === '/post/') {
        /* 下滑导航转标题 */
        // 初始话可视区域距离页面顶端的距离
        let windowTop = 0;
        // 获取当前可视区域距离页面顶端的距离
        let scrolls = $(this).scrollTop();
        // console.log(scrolls);
        // 当scrolls>windowTop时，表示页面在向下滑动
        if ((scrolls >= windowTop) && (scrolls > 110)) {
            //需要执行隐藏导航的操作
            $('#post-nav-title').addClass('nav-title-tran');
            $('#ln-menu-tray').addClass('nav-menu-tran');
            windowTop = scrolls;
        } else {
            // 上滑
            $('#post-nav-title').removeClass('nav-title-tran');
            $('#ln-menu-tray').removeClass('nav-menu-tran');
            windowTop = scrolls;
        }
    }
    if ((((window.location.pathname === '/blog/') ||
        (window.location.pathname === '/blog/')) &&
        (isGet === true)) && ($('.pagination').isOnViewport())) {
        if (isGet) {
            getartic(curid, offs);
            curid += offs;
        }
    }
});

backTop();

function menuToggle() {
    if (document.getElementById("nav-icon").style.display !== "none") {
        document.getElementById("main-navigation").style.display = "none"
        document.getElementById("nav-icon").style.display = "none"
        document.getElementById("nav-icon-close").style.display = "block"
    } else {
        document.getElementById("main-navigation").style.display = "block"
        document.getElementById("nav-icon").style.display = "block"
        document.getElementById("nav-icon-close").style.display = "none"
    }
}
