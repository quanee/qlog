window.onload = function () {
    let hour_opts = `<input class="selectopt option-input" name="hour" type="radio" id="hour_opt0" checked>` + 
    `<label for="hour_opt0" class="option">00</label>`;
    // `<option value="0" selected="selected">`+`0`.padStart(2, "0")+`</option>`;
    for (let i = 1; i < 24; i++) {
        hour_opts += `<input class="selectopt option-input" name="hour" type="radio" id="hour_opt` + i.toString() + `">
  <label for="hour_opt` + i.toString() + `" class="option">` + i.toString().padStart(2, "0") + `</label>`;
        // res += `<option value="`+i.toString()+`">`+i.toString().padStart(2, "0")+`</option>`
    }
    document.getElementById("select_hour").innerHTML = hour_opts;

    let minute_opts = `<input class="selectopt option-input" name="minute" type="radio" id="minute_opt0" checked>
  <label for="minute_opt0" class="option">00</label>`;
    for (let i = 1; i < 60; i++) {
        minute_opts += `<input class="selectopt option-input" name="minute" type="radio" id="minute_opt` + i.toString() + `">
  <label for="minute_opt` + i.toString() + `" class="option">` + i.toString().padStart(2, "0") + `</label>`;
    }
    document.getElementById("select_minute").innerHTML = minute_opts;

    let second_opts = `<input class="selectopt option-input" name="second" type="radio" id="second_opt0" checked>
  <label for="second_opt0" class="option">00</label>`;
    for (let i = 1; i < 60; i++) {
        second_opts += `<input class="selectopt option-input" name="second" type="radio" id="second_opt` + i.toString() + `">
  <label for="second_opt` + i.toString() + `" class="option">` + i.toString().padStart(2, "0") + `</label>`;
    }
    document.getElementById("select_second").innerHTML = second_opts;
};

async function timer(countSec) {
    let curhour = Math.floor(countSec / 3600);
    let curminute = Math.floor(countSec / 60 % 60);
    let cursecond = Math.floor(countSec % 60);
    document.getElementById("full_time_hour").innerHTML = Math.floor(countSec / 3600).toString().padStart(2, "0");
    document.getElementById("full_time_minute").innerHTML = Math.floor(countSec / 60 % 60).toString().padStart(2, "0");
    document.getElementById("full_time_second").innerHTML = Math.floor(countSec % 60).toString().padStart(2, "0");
    while (true) {
        if (curhour !== Math.floor(countSec / 3600)) {
            document.getElementById("full_time_hour").innerHTML = Math.floor(countSec / 3600).toString().padStart(2, "0");
            curhour = Math.floor(countSec / 3600);
        }
        if (curminute !== Math.floor(countSec / 60 % 60)) {
            document.getElementById("full_time_minute").innerHTML = Math.floor(countSec / 60 % 60).toString().padStart(2, "0");
            curminute = Math.floor(countSec / 60 % 60);
        }
        if (cursecond !== Math.floor(countSec % 60)) {
            document.getElementById("full_time_second").innerHTML = Math.floor(countSec % 60).toString().padStart(2, "0");
            cursecond = Math.floor(countSec % 60);
        }
        if (countSec === 0) {
            break;
        }
        await (new Promise((resolve) => {
            countSec--;
            setTimeout(resolve, 1000);
        }))
    }
}

function start() {
    document.getElementById("body").style.background = "rgba(255, 100, 0, 1)";
    let hour = 0, minute = 0, second = 0;
    for (let i = 0; i < document.getElementById("select_hour").getElementsByTagName("input").length; i++) {
        if (document.getElementById("select_hour").getElementsByTagName("input")[i].checked) {
            hour = i
        }
    }
    for (let i = 0; i < document.getElementById("select_minute").getElementsByTagName("input").length; i++) {
        if (document.getElementById("select_minute").getElementsByTagName("input")[i].checked) {
            minute = i
        }
    }
    for (let i = 0; i < document.getElementById("select_second").getElementsByTagName("input").length; i++) {
        if (document.getElementById("select_second").getElementsByTagName("input")[i].checked) {
            second = i
        }
    }
    timer(hour * 3600 + minute * 60 + second).then(r => {
        document.getElementById("body").style.background = "rgba(0, 255, 100, 1)";
        document.getElementsByTagName("label").style.background = "rgba(0, 255, 100, 1)"
    })
}

function secToTime(countSec) {
    return [Math.floor(countSec / 3600), Math.floor(countSec / 60 % 60), Math.floor(countSec % 60)].join(":");
}

try {
    document.getElementById("gen-uuid").onclick = function () {
        document.getElementById("uuid-box").innerHTML += "<li>" + uuid() + "</li><i class='material-icons' onclick='copy()'>copy</i>"
    }
} catch (e) {
    console.log(e.toString())
}

function copy() {
    window.clipboardData.setData("Text", this.value)
}

function uuid() {
    let s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
}

try {
    document.getElementById("format-json").onclick = () => {
        let msg = document.getElementById("input-json").value.toString();
        document.getElementById("input-json").value = JSON.stringify(JSON.parse(msg), null, 4);
    }
} catch (e) {
    console.log(e);
}

try {
    document.getElementById("compass-json").onclick = () => {
        let msg = document.getElementById("input-json").value.toString();
        document.getElementById("input-json").value = JSON.stringify(JSON.parse(msg), null, 0);
    }
} catch (e) {
    console.log(e);
}

try {
    window.onload = () => {
        document.getElementById("input-rgb").value = "rgb(128, 128, 128)"
        document.getElementById("input-hex").value = "#808080"
    }
    document.getElementById("rgb").onclick = () => {
        let colorArr = document.getElementById("input-rgb").value.replace(/(?:\(|\)|rgba|RGBA|rgb|RGB)*/g, "").split(",");
        let ret = "#";
        for (let i = 0, j = colorArr.length; i < j; i++) {
            let hex = Number(colorArr[i]).toString(16);
            if (colorArr[i] < 0) {
                hex = "0";
            }
            if (colorArr[i] > 255) {
                hex = "FF";
            }
            if (colorArr[i] < 15 || hex.length < 2) {
                hex = "0" + hex;
            }
            if (hex === "0") {
                hex += hex;
            }
            ret += hex
        }
        document.getElementById("conv-ret").innerHTML = "<li>" + ret.toUpperCase() + "</li>";
    }
    document.getElementById("hex").onclick = () => {
        let ret = "#";
        let color = document.getElementById("input-hex").value;
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (reg.test(color.toLowerCase())) {
            if (color.length === 4) {
                for (let i = 1; i < 4; i += 1) {
                    ret += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                }
            } else {
                ret = color;
            }

            let colorChange = [];
            for (let i = 1; i < 7; i += 2) {
                let tmp = parseInt("0x" + ret.slice(i, i + 2));
                if (tmp > 0xff) {
                    tmp = 0xff;
                } else if (tmp < 0 || isNaN(tmp)) {
                    tmp = 0;
                }
                colorChange.push(tmp);
            }

            document.getElementById("conv-ret").innerHTML = "<li>" + "RGB(" + colorChange.join(",") + ")" + "</li>";
        } else {
            document.getElementById("dialog-bg").style.display = "flex";
        }
    }

    document.getElementById("dialog-bg").onclick = () => {
        document.getElementById("dialog-bg").style.display = "none";
    }
} catch (e) {
    console.log(e)
}

try {
    document.getElementById("ts2dt").onclick = function () {
        try {
            let its = document.getElementById("input-timestamp")
            let odt = document.getElementById("output-date")
            if (its.value.length < "3945600".length) {
                odt.value = "1970-1-1 0:0:0"
            }
            let ts = new Date(parseInt(its.value) * 1000)
            odt.value = ts.getFullYear() + "-" + ts.getMonth() + "-" + ts.getDay() + " " + ts.getHours() + ":" + ts.getMinutes() + ":" + ts.getSeconds()
        } catch (e) {
            alert(e)
        }
    }

    document.getElementById("dt2ts").onclick = function () {
        try {
            let idt = document.getElementById("input-date")
            let ots = document.getElementById("output-timestamp")
            ots.value = Math.round((new Date(idt.value)).valueOf() / 1000).toString();
        } catch (e) {
            alert(e)
        }
    }

    let stop = false;
    document.getElementById("stop").onclick = function () {
        stop = !stop;
        switchBtn()
        tick();
    }
    document.getElementById("continue").onclick = function () {
        stop = !stop;
        switchBtn()
        tick();
    }

    function switchBtn() {
        let stp = document.getElementById("stop");
        let cnt = document.getElementById("continue")
        if (stp.style.display !== "block") {
            stp.style.display = "block";
            cnt.style.display = "none";
        } else {
            stp.style.display = "none";
            cnt.style.display = "block";
        }
    }
    window.onload = function () {
        try {
            tick()
            let now = new Date()
            document.getElementById("input-timestamp").value = Math.round((new Date()).valueOf() / 1000).toString();
            document.getElementById("input-date").value = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        } catch (e) {
            console.log(e)
        }
    }

    function tick() {
        document.getElementById("timestamp-now").innerText = Math.round((new Date()).valueOf() / 1000).toString();
        if (!stop) {
            setTimeout("tick()", 1000)
        }
    }
} catch (e) {
    console.log(e)
}

try {
    document.getElementById("url-enc").onclick = () => {
        document.getElementById("input-content").value = encodeURIComponent(document.getElementById("input-content").value);
    }
    document.getElementById("url-dec").onclick = () => {
        document.getElementById("input-content").value = decodeURIComponent(document.getElementById("input-content").value);
    }
    document.getElementById("base64-enc").onclick = () => {
        document.getElementById("input-content").value = (new base64()).encode(document.getElementById("input-content").value);
    }
    document.getElementById("base64-dec").onclick = () => {
        document.getElementById("input-content").value = (new base64()).decode(document.getElementById("input-content").value);
    }
    document.getElementById("md5sum").onclick = () => {}

    class base64 {
        constructor() {
            this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        }
        encode(e) {
            let t = "";
            let n, r, i, s, o, u, a;
            let f = 0;
            e = this._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        }
        decode(e) {
            let t = "";
            let n, r, i;
            let s, o, u, a;
            let f = 0;
            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u !== 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a !== 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = this._utf8_decode(t);
            return t
        }
        _utf8_encode(e) {
            e = e.replace(/rn/g, "n");
            let t = "";
            for (let n = 0, m = e.length; n < m; n++) {
                let r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        }
        _utf8_decode(e) {
            let t = "";
            let n = 0;
            let r, c1, c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    let c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }
    }
} catch (e) {
    console.log(e)
}
