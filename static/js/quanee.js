var curid = 10;
var offs = 5;
var codemirror;
var md;
var isGet = true;
var toggleNavMenu = true;

$(document).ready(function () {
    $('.waves').mousedown(function (e) {
        let box = $(this);
        let wavesDiv = box.find('div');

        //第一次没有涟漪div，动态生成
        if (wavesDiv[0] == null) {
            let div = '<div class="waves-effect"></div>';
            box.append(div);
            wavesDiv = box.find('div');
        }
        //设置按钮样式为’waves-effect‘即去掉动画样式’waves-effect-animation‘
        wavesDiv[0].className = 'waves-effect';

        //计算涟漪坐标（折算成左上角坐标而非中心点），涟漪大小（取外标签最长边）
        let wH = box.width() > box.height() ? box.width() : box.height();
        let iX = e.pageX - box.offset().left;
        let iY = e.pageY - box.offset().top;
        let nX = iX - wH / 2;
        let nY = iY - wH / 2;

        //设置涟漪div样式，准备播放动画
        wavesDiv.css({
            width: wH,
            height: wH,
            left: nX,
            top: nY
        }).addClass('waves-effect-animation');//播放动画
    });
});

function backTop() {
    var scrolltop = [];
    var i = 0;
    scrolltop[0] = 0;

    $(document).scroll(function () {
        i++;
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


/*function commheadershadow() {
    //
    $(document).ready(function () {
        $(window).scroll(function () {
            if ($(document).scrollTop() > 0) {
                $('#nav-header').addClass('has-shadow')
            } else {
                $('#nav-header').removeClass('has-shadow')
            }
            /!*if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
                alert('滚动条已经到达底部为' + $(document).scrollTop());
            }*!/
        }); //
    });
}*/

/*if (window.location.pathname == '/edit') {
    codemirror = CodeMirror.fromTextArea(document.getElementById('edit'), {
        value: '# hello',
        mode: 'markdown',
        lineNumbers: true,
        viewportMargin: Infinity,
        // autoCloseBrackets: true,
        // matchBrackets: true,
        // showCursorWhenSelecting: true,
        lineWrapping: true,  // 长句子折行
        // theme: 'material-darker',
        // keyMap: 'sublime',
        // extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'}
    });
}*/

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

/*$('#preview-btn').click(
    function () {
        var today = new Date();
        //获取当前年
        var year = today.getFullYear();
        //获取当前月
        var month = today.getMonth() + 1;
        //获取当前日
        var date = today.getDate();
        //获取当前小时数(0-23)
        var h = today.getHours();
        //获取当前分钟数(0-59)
        var m = today.getMinutes();
        var s = today.getSeconds();
        //输出为yyyy-MM-hh格式的字符串
        var orderDate = year + '-' + month + '-' + date;
        md = codemirror.getValue();
        marked.setOptions({
            gfm: true,
            breaks: true,
            // smartypants: true,
        });
        $('#preview')[0].style.display = 'block';
        $('#md-edit')[0].style.display = 'none';
        $('#preview-md').html(marked(md));
        $('#datetime').innerHTML = orderDate;
        console.log(orderDate);
        $('#preview-title').html($('#input-title').val());
    }
);*/

/*$('#edit-btn').click(
    function () {
        md = codemirror.getValue();
        marked.setOptions({
            gfm: true,
            breaks: true,
            // smartypants: true,
        });
        $('#preview')[0].style.display = 'none';
        $('#md-edit')[0].style.display = 'block';
        $('#input-title').innerText = $('#input-title').val();
        $('#md-edit').innerText = md;
    }
);*/

/*$('#post-btn').click(
    function () {
        var article = {
            title: $('#input-title').val(),
            abstract: 'edittest',
            substance: codemirror.getValue(),
            content: codemirror.getValue(),
        };
        fetch('/edit', {
            method: 'POST',
            body: JSON.stringify(article),
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            window.location.href = '/'
        );
    }
);*/

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
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).scroll(function () {
    // console.log(window.location.pathname);
    if (window.location.pathname.substring(0, 6) === '/post/') {
        /* 下滑导航转标题 */
        // 初始话可视区域距离页面顶端的距离
        var windowTop = 0;
        // 获取当前可视区域距离页面顶端的距离
        var scrolls = $(this).scrollTop();
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
    if ((((window.location.pathname === '/') ||
        (window.location.pathname === '/index')) &&
        (isGet === true)) && ($('.pagination').isOnViewport())) {
        if (isGet) {
            getartic(curid, offs);
            curid += offs;
        }
    }
});

function detailpost(s) {
    fetch(s, {
        method: 'GET',
    }).then(
        window.location.href = s
    )
}

// commheadershadow();
backTop();

function menuToggle() {
    // if (document.getElementById("main-navigation").style.display === "none") {
    // } else {
    // }
    if (document.getElementById("nav-icon").style.display !== "none") {
        document.getElementById("main-navigation").style.display = "none"
        document.getElementById("nav-icon").style.display = "none"
        document.getElementById("nav-icon-close").style.display = "block"
    } else {
        // $("#main-navigation").toggle();
        document.getElementById("main-navigation").style.display = "block"
        document.getElementById("nav-icon").style.display = "block"
        document.getElementById("nav-icon-close").style.display = "none"
    }
    // $("#nav-icon").toggle();
    // $("#nav-icon-close").toggle();
    // console.log(window.getComputedStyle(document.getElementById("main-navigation"), "display").content)
    // if (window.getComputedStyle(document.getElementById("main-navigation"), "display").content != "normal") {
    //     document.getElementById("main-navigation").style.display = "none"
    // } else {
    //     document.getElementById("main-navigation").style.display = "normal"
    // }
    // console.log(window.getComputedStyle(document.getElementById("main-navigation"), "display").content)
}
