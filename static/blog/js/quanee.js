function backTop() {
    let scrolltop = [];
    let i = 0;
    scrolltop[0] = 0;
    document.onscroll = () => {
        i++;
        scrolltop[i] = window.pageYOffset;
        if (scrolltop[i] > scrolltop[i - 1]) {
            document.getElementById('backtop').classList.remove('fadein')
            // document.getElementById("backtop").
        } else {
            document.getElementById('backtop').classList.add('fadein')
        }
    };

    document.getElementById("backtop").onclick = () => {
        let callback = (x) => {
            window.scrollTo(0, x);
        }
        let change = document.documentElement.scrollTop || document.body.scrollTop;
        RAF(callback, change, 1000)
    }

    function easeInOutCubic(k) {
        return (k *= 2) < 1 ? 0.5 * k * k * k : 0.5 * ((k -= 2) * k * k + 2);
    }

    function RAF(callback, change, duration) {
        let handle;
        // 返回动画函数
        // 开始时间
        let startTime = performance.now();
        // 防止启动多个定时器
        cancelAnimationFrame(handle);

        // 回调函数
        function _animation() {
            // 这一帧开始的时间
            let current = performance.now();
            // let eleTop = ele.offsetLeft;
            // 这一帧内元素移动的距离
            let left = Math.round(change * easeInOutCubic((current - startTime) / duration));
            callback(change - left)
            // 判断动画是否执行完
            if ((current - startTime) / duration < 1) {
                handle = requestAnimationFrame(_animation);
            } else {
                cancelAnimationFrame(handle);
            }
        }

        // 第一帧开始
        handle = requestAnimationFrame(_animation);
    }
}

try {
    document.getElementById('nav-menu').onclick = () => {
        document.getElementsByName('body')
    }
} catch (e) {
    console.log(e)
}

try {
    document.getElementById('search-btn').onclick = () => {
        fetch("/search/" + document.getElementById('search-input').value, {
            method: 'POST',
        }).then(
            (res) => {
                return res.text()
            }
        ).then(
            (res) => {
                window.history.pushState("", "", "/search?w=" + document.getElementById('search-input').value);
                document.getElementById('content').innerHTML = res;
            }
        );
    };
} catch (e) {
    console.log(e)
}


let isloading = false;

function loadmore(offset, limit) {
    if (isloading) {
        return
    }
    let over = false;
    if (over) {
        return
    }
    isloading = true;
    loadingimg()

    fetch('/article?' + 'offset=' + offset + '&limit=' + limit, {
        method: 'GET',
    }).then(
        (res) => {
            return res.text();
        }
    ).then((res) => {
        if (res === "done") {
            over = true;
            loadingimg();
        } else {
            setTimeout(() => {
                document.getElementById("index-article").innerHTML += res;
                isloading = false;
                loadingimg();
            }, 3000);
        }
        console.log(isloading)
    });
}

function loadingimg() {
    let loading = document.getElementById('loadmore');
    if (loading.style.display === 'block') {
        loading.style.display = 'none';
    } else {
        loading.style.display = 'block';

    }
}

let offset = 10;

try {
    window.onscroll = () => {
        const limit = 5;
        if (window.location.pathname.substring(0, 6) === '/post/') {
            /* 下滑导航转标题 */
            // 初始话可视区域距离页面顶端的距离
            let windowTop = 0;
            // 获取当前可视区域距离页面顶端的距离
            let scrolls = window.pageYOffset;
            console.log(scrolls, );
            // 当scrolls>windowTop时，表示页面在向下滑动
            if ((scrolls >= windowTop) && (scrolls > 110)) {
                //需要执行隐藏导航的操作
                document.getElementById("post-nav-title").classList.add("nav-title-tran")
                document.getElementById("ln-menu-tray").classList.add("nav-menu-tran")
                windowTop = scrolls;
            } else {
                // 上滑
                document.getElementById("post-nav-title").classList.remove("nav-title-tran")
                document.getElementById("ln-menu-tray").classList.remove("nav-menu-tran")
                windowTop = scrolls;
            }
        }

        if (window.location.pathname === '/blog/' && isOnViewport(document.getElementById("pagination")) && !isloading) {
            loadmore(offset, limit);
            offset += limit;
        }
    };
} catch (e) {
    console.log(e)
}

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

function isOnViewport(obj) {
    try {
        let getElementTopLeft = (obj) => {
            let top = 0;
            let left = 0;
            while (obj) {
                top += obj.offsetTop;
                left += obj.offsetLeft;
                obj = obj.offsetParent;
            }
            return {top: top, left: left};
        }
        return getElementTopLeft(obj).top + obj.clientHeight > window.pageYOffset && window.pageYOffset + window.innerHeight > getElementTopLeft(obj).top;
    } catch (e) {
        console.log(e)
    }
}
