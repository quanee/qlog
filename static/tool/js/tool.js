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

function copy() {
    window.clipboardData.setData("Text", this.value)
}

function uuid(delimiter="-") {
    let s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = delimiter;

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

function copyToClipBord(text) {
    let handler = (event) => {
        event.clipboardData.setData('text/plain', text);
        event.preventDefault();
    }
    document.addEventListener('copy', handler);
    document.execCommand('copy');
    document.removeEventListener('copy', handler);
}

class color {
    constructor(inputColor, ele) {
        if (!(this instanceof color)) {
            return new color(inputColor, ele);
        }
        if (typeof inputColor === "object") {
            return inputColor;
        }
        this.attachValues(toColorObject(inputColor));
        if (ele) {
            ele.style.backgroundColor = this.toRgbString();
        }
    }

    toRgbString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

    toRgbaString() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
    }

    toHwbString() {
        return `hwb(${this.hue}, ${Math.round(this.whiteness * 100)}%, ${Math.round(this.blackness * 100)}%)`;
    }

    toHwbaString() {
        return `hwba(${this.hue}, ${Math.round(this.whiteness * 100)}%, ${Math.round(this.blackness * 100)}%, ${this.opacity})`;
    }

    toHslString() {
        return `hsl(${this.hue}, ${Math.round(this.sat * 100)}%, ${Math.round(this.lightness * 100)}%)`;
    }

    toHslaString() {
        return `hsla(${this.hue}, ${Math.round(this.sat * 100)}%, ${Math.round(this.lightness * 100)}%, ${this.opacity})`;
    }

    toCmykString() {
        return `cmyk(${Math.round(this.cyan * 100)}%, ${Math.round(this.magenta * 100)}%, ${Math.round(this.yellow * 100)}%, ${Math.round(this.black * 100)}%)`;
    }

    toNcolString() {
        return `${this.ncol}, ${Math.round(this.whiteness * 100)}%, ${Math.round(this.blackness * 100)}%`;
    }

    toNcolaString() {
        return `${this.ncol}, ${Math.round(this.whiteness * 100)}%, ${Math.round(this.blackness * 100)}%, ${this.opacity}`;
    }

    toHexString() {
        const r = toHex(this.red);
        const g = toHex(this.green);
        const b = toHex(this.blue);
        return `#${r}${g}${b}`;
    }

    lighter(n) {
        let x;
        let rgb;
        let color;
        x = (n / 100 || 0.1);
        this.lightness += x;
        if (this.lightness > 1) {
            this.lightness = 1;
        }
        rgb = hslToRgb(this.hue, this.sat, this.lightness);
        color = colorObject(rgb, this.opacity, this.hue, this.sat);
        this.attachValues(color);
    }

    attachValues(color) {
        this.red = color.red;
        this.green = color.green;
        this.blue = color.blue;
        this.hue = color.hue;
        this.sat = color.sat;
        this.lightness = color.lightness;
        this.whiteness = color.whiteness;
        this.blackness = color.blackness;
        this.cyan = color.cyan;
        this.magenta = color.magenta;
        this.yellow = color.yellow;
        this.black = color.black;
        this.ncol = color.ncol;
        this.opacity = color.opacity;
        this.valid = color.valid;
    }
}

function toColorObject(c) {
    let x;
    let y;
    let typ;
    let arr = [];
    let arrlength;
    let i;
    let opacity;
    let match;
    let a;
    let hue;
    let sat;
    let rgb;
    let colornames = [];
    let colorhexs = [];
    c = colorTrim(c.toLowerCase());
    x = c.substr(0, 1).toUpperCase();
    y = c.substr(1);
    a = 1;
    if ((x === "R" || x === "Y" || x === "G" || x === "C" || x === "B" || x === "M" || x === "W") && !isNaN(y)) {
        if (c.length === 6 && !c.includes(",")) {
        } else {
            c = `ncol(${c})`;
        }
    }
    if (c.length !== 3 && c.length !== 6 && !isNaN(c)) {
        c = `ncol(${c})`;
    }
    if (c.indexOf(",") > 0 && !c.includes("(")) {
        c = `ncol(${c})`;
    }
    if (c.substr(0, 3) === "rgb" || c.substr(0, 3) === "hsl" || c.substr(0, 3) === "hwb" || c.substr(0, 4) === "ncol" || c.substr(0, 4) === "cmyk") {
        if (c.substr(0, 4) === "ncol") {
            if (c.split(",").length === 4 && !c.includes("ncola")) {
                c = c.replace("ncol", "ncola");
            }
            typ = "ncol";
            c = c.substr(4);
        } else if (c.substr(0, 4) === "cmyk") {
            typ = "cmyk";
            c = c.substr(4);
        } else {
            typ = c.substr(0, 3);
            c = c.substr(3);
        }
        arrlength = 3;
        opacity = false;
        if (c.substr(0, 1).toLowerCase() === "a") {
            arrlength = 4;
            opacity = true;
            c = c.substr(1);
        } else if (typ === "cmyk") {
            arrlength = 4;
            if (c.split(",").length === 5) {
                arrlength = 5;
                opacity = true;
            }
        }
        c = c.replace("(", "");
        c = c.replace(")", "");
        arr = c.split(",");
        if (typ === "rgb") {
            if (arr.length !== arrlength) {
                return emptyObject();
            }
            for (i = 0; i < arrlength; i++) {
                if (arr[i] === "" || arr[i] === " ") {
                    arr[i] = "0";
                }
                if (arr[i].includes("%")) {
                    arr[i] = arr[i].replace("%", "");
                    arr[i] = Number(arr[i] / 100);
                    if (i < 3) {
                        arr[i] = Math.round(arr[i] * 255);
                    }
                }
                if (isNaN(arr[i])) {
                    return emptyObject();
                }
                if (parseInt(arr[i]) > 255) {
                    arr[i] = 255;
                }
                if (i < 3) {
                    arr[i] = parseInt(arr[i]);
                }
                if (i === 3 && Number(arr[i]) > 1) {
                    arr[i] = 1;
                }
            }
            rgb = {r: arr[0], g: arr[1], b: arr[2]};
            if (opacity === true) {
                a = Number(arr[3]);
            }
        }
        if (typ === "hsl" || typ === "hwb" || typ === "ncol") {
            while (arr.length < arrlength) {
                arr.push("0");
            }
            if (typ === "hsl" || typ === "hwb") {
                if (parseInt(arr[0]) >= 360) {
                    arr[0] = 0;
                }
            }
            for (i = 1; i < arrlength; i++) {
                if (arr[i].includes("%")) {
                    arr[i] = arr[i].replace("%", "");
                    arr[i] = Number(arr[i]);
                    if (isNaN(arr[i])) {
                        return emptyObject();
                    }
                    arr[i] = arr[i] / 100;
                } else {
                    arr[i] = Number(arr[i]);
                }
                if (Number(arr[i]) > 1) {
                    arr[i] = 1;
                }
                if (Number(arr[i]) < 0) {
                    arr[i] = 0;
                }
            }
            if (typ === "hsl") {
                rgb = hslToRgb(arr[0], arr[1], arr[2]);
                hue = Number(arr[0]);
                sat = Number(arr[1]);
            }
            if (typ === "hwb") {
                rgb = hwbToRgb(arr[0], arr[1], arr[2]);
            }
            if (typ === "ncol") {
                rgb = ncolToRgb(arr[0], arr[1], arr[2]);
            }
            if (opacity === true) {
                a = Number(arr[3]);
            }
        }
        if (typ === "cmyk") {
            while (arr.length < arrlength) {
                arr.push("0");
            }
            for (i = 0; i < arrlength; i++) {
                if (arr[i].includes("%")) {
                    arr[i] = arr[i].replace("%", "");
                    arr[i] = Number(arr[i]);
                    if (isNaN(arr[i])) {
                        return emptyObject();
                    }
                    arr[i] = arr[i] / 100;
                } else {
                    arr[i] = Number(arr[i]);
                }
                if (Number(arr[i]) > 1) {
                    arr[i] = 1;
                }
                if (Number(arr[i]) < 0) {
                    arr[i] = 0;
                }
            }
            rgb = cmykToRgb(arr[0], arr[1], arr[2], arr[3]);
            if (opacity === true) {
                a = Number(arr[4]);
            }
        }
    } else if (c.substr(0, 3) === "ncs") {
        rgb = ncsToRgb(c);
    } else {
        match = false;
        colornames = getColorArr('names');
        for (i = 0; i < colornames.length; i++) {
            if (c.toLowerCase() === colornames[i].toLowerCase()) {
                colorhexs = getColorArr('hexs');
                match = true;
                rgb = {
                    r: parseInt(colorhexs[i].substr(0, 2), 16),
                    g: parseInt(colorhexs[i].substr(2, 2), 16),
                    b: parseInt(colorhexs[i].substr(4, 2), 16)
                };
                break;
            }
        }
        if (match === false) {
            c = c.replace("#", "");
            if (c.length === 3) {
                c = c.substr(0, 1) + c.substr(0, 1) + c.substr(1, 1) + c.substr(1, 1) + c.substr(2, 1) + c.substr(2, 1);
            }
            for (i = 0; i < c.length; i++) {
                if (!isHex(c.substr(i, 1))) {
                    return emptyObject();
                }
            }
            arr[0] = parseInt(c.substr(0, 2), 16);
            arr[1] = parseInt(c.substr(2, 2), 16);
            arr[2] = parseInt(c.substr(4, 2), 16);
            for (i = 0; i < 3; i++) {
                if (isNaN(arr[i])) {
                    return emptyObject();
                }
            }
            rgb = {
                r: arr[0],
                g: arr[1],
                b: arr[2]
            };
        }
    }
    return colorObject(rgb, a, hue, sat);
}

function colorObject(rgb, a, h, s) {
    let hsl;
    let hwb;
    let cmyk;
    let ncol;
    let color;
    let hue;
    let sat;
    if (!rgb) {
        return emptyObject();
    }
    if (a === null) {
        a = 1;
    }
    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
    cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    hue = (h || hsl.h);
    sat = (s || hsl.s);
    ncol = hueToNcol(hue);
    color = {
        red: rgb.r,
        green: rgb.g,
        blue: rgb.b,
        hue,
        sat,
        lightness: hsl.l,
        whiteness: hwb.w,
        blackness: hwb.b,
        cyan: cmyk.c,
        magenta: cmyk.m,
        yellow: cmyk.y,
        black: cmyk.k,
        ncol,
        opacity: a,
        valid: true
    };
    color = roundDecimals(color);
    return color;
}

function emptyObject() {
    return {
        red: 0,
        green: 0,
        blue: 0,
        hue: 0,
        sat: 0,
        lightness: 0,
        whiteness: 0,
        blackness: 0,
        cyan: 0,
        magenta: 0,
        yellow: 0,
        black: 0,
        ncol: "R",
        opacity: 1,
        valid: false
    };
}

function getColorArr(x) {
    if (x === "names") {
        return ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
    }
    if (x === "hexs") {
        return ['f0f8ff', 'faebd7', '00ffff', '7fffd4', 'f0ffff', 'f5f5dc', 'ffe4c4', '000000', 'ffebcd', '0000ff', '8a2be2', 'a52a2a', 'deb887', '5f9ea0', '7fff00', 'd2691e', 'ff7f50', '6495ed', 'fff8dc', 'dc143c', '00ffff', '00008b', '008b8b', 'b8860b', 'a9a9a9', 'a9a9a9', '006400', 'bdb76b', '8b008b', '556b2f', 'ff8c00', '9932cc', '8b0000', 'e9967a', '8fbc8f', '483d8b', '2f4f4f', '2f4f4f', '00ced1', '9400d3', 'ff1493', '00bfff', '696969', '696969', '1e90ff', 'b22222', 'fffaf0', '228b22', 'ff00ff', 'dcdcdc', 'f8f8ff', 'ffd700', 'daa520', '808080', '808080', '008000', 'adff2f', 'f0fff0', 'ff69b4', 'cd5c5c', '4b0082', 'fffff0', 'f0e68c', 'e6e6fa', 'fff0f5', '7cfc00', 'fffacd', 'add8e6', 'f08080', 'e0ffff', 'fafad2', 'd3d3d3', 'd3d3d3', '90ee90', 'ffb6c1', 'ffa07a', '20b2aa', '87cefa', '778899', '778899', 'b0c4de', 'ffffe0', '00ff00', '32cd32', 'faf0e6', 'ff00ff', '800000', '66cdaa', '0000cd', 'ba55d3', '9370db', '3cb371', '7b68ee', '00fa9a', '48d1cc', 'c71585', '191970', 'f5fffa', 'ffe4e1', 'ffe4b5', 'ffdead', '000080', 'fdf5e6', '808000', '6b8e23', 'ffa500', 'ff4500', 'da70d6', 'eee8aa', '98fb98', 'afeeee', 'db7093', 'ffefd5', 'ffdab9', 'cd853f', 'ffc0cb', 'dda0dd', 'b0e0e6', '800080', '663399', 'ff0000', 'bc8f8f', '4169e1', '8b4513', 'fa8072', 'f4a460', '2e8b57', 'fff5ee', 'a0522d', 'c0c0c0', '87ceeb', '6a5acd', '708090', '708090', 'fffafa', '00ff7f', '4682b4', 'd2b48c', '008080', 'd8bfd8', 'ff6347', '40e0d0', 'ee82ee', 'f5deb3', 'ffffff', 'f5f5f5', 'ffff00', '9acd32'];
    }
}

function roundDecimals(c) {
    c.red = Number(c.red.toFixed(0));
    c.green = Number(c.green.toFixed(0));
    c.blue = Number(c.blue.toFixed(0));
    c.hue = Number(c.hue.toFixed(0));
    c.sat = Number(c.sat.toFixed(2));
    c.lightness = Number(c.lightness.toFixed(2));
    c.whiteness = Number(c.whiteness.toFixed(2));
    c.blackness = Number(c.blackness.toFixed(2));
    c.cyan = Number(c.cyan.toFixed(2));
    c.magenta = Number(c.magenta.toFixed(2));
    c.yellow = Number(c.yellow.toFixed(2));
    c.black = Number(c.black.toFixed(2));
    c.ncol = c.ncol.substr(0, 1) + Math.round(Number(c.ncol.substr(1)));
    c.opacity = Number(c.opacity.toFixed(2));
    return c;
}

function hslToRgb(hue, sat, light) {
    let t1;
    let t2;
    let r;
    let g;
    let b;
    hue = hue / 60;
    if (light <= 0.5) {
        t2 = light * (sat + 1);
    } else {
        t2 = light + sat - (light * sat);
    }
    t1 = light * 2 - t2;
    r = hueToRgb(t1, t2, hue + 2) * 255;
    g = hueToRgb(t1, t2, hue) * 255;
    b = hueToRgb(t1, t2, hue - 2) * 255;
    return {r, g, b};
}

function hueToRgb(t1, t2, hue) {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;
    else if (hue < 3) return t2;
    else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
    else return t1;
}

function hwbToRgb(hue, white, black) {
    let i;
    let rgb;
    const rgbArr = [];
    let tot;
    rgb = hslToRgb(hue, 1, 0.50);
    rgbArr[0] = rgb.r / 255;
    rgbArr[1] = rgb.g / 255;
    rgbArr[2] = rgb.b / 255;
    tot = white + black;
    if (tot > 1) {
        white = Number((white / tot).toFixed(2));
        black = Number((black / tot).toFixed(2));
    }
    for (i = 0; i < 3; i++) {
        rgbArr[i] *= (1 - (white) - (black));
        rgbArr[i] += (white);
        rgbArr[i] = Number(rgbArr[i] * 255);
    }
    return {r: rgbArr[0], g: rgbArr[1], b: rgbArr[2]};
}

function cmykToRgb(c, m, y, k) {
    let r;
    let g;
    let b;
    r = 255 - ((Math.min(1, c * (1 - k) + k)) * 255);
    g = 255 - ((Math.min(1, m * (1 - k) + k)) * 255);
    b = 255 - ((Math.min(1, y * (1 - k) + k)) * 255);
    return {r, g, b};
}

function ncolToRgb(ncol, white, black) {
    let letter;
    let percent;
    let h;
    let w;
    let b;
    h = ncol;
    if (isNaN(ncol.substr(0, 1))) {
        letter = ncol.substr(0, 1).toUpperCase();
        percent = ncol.substr(1);
        if (percent === "") {
            percent = 0;
        }
        percent = Number(percent);
        if (isNaN(percent)) {
            return false;
        }
        if (letter === "R") {
            h = 0 + (percent * 0.6);
        }
        if (letter === "Y") {
            h = 60 + (percent * 0.6);
        }
        if (letter === "G") {
            h = 120 + (percent * 0.6);
        }
        if (letter === "C") {
            h = 180 + (percent * 0.6);
        }
        if (letter === "B") {
            h = 240 + (percent * 0.6);
        }
        if (letter === "M") {
            h = 300 + (percent * 0.6);
        }
        if (letter === "W") {
            h = 0;
            white = 1 - (percent / 100);
            black = (percent / 100);
        }
    }
    return hwbToRgb(h, white, black);
}

function hueToNcol(hue) {
    while (hue >= 360) {
        hue = hue - 360;
    }
    if (hue < 60) {
        return `R${hue / 0.6}`;
    }
    if (hue < 120) {
        return `Y${(hue - 60) / 0.6}`;
    }
    if (hue < 180) {
        return `G${(hue - 120) / 0.6}`;
    }
    if (hue < 240) {
        return `C${(hue - 180) / 0.6}`;
    }
    if (hue < 300) {
        return `B${(hue - 240) / 0.6}`;
    }
    if (hue < 360) {
        return `M${(hue - 300) / 0.6}`;
    }
}

function ncsToRgb(ncs) {
    let black;
    let chroma;
    let bc;
    let percent;
    let black1;
    let chroma1;
    var red1;
    let factor1;
    let blue1;
    var red1;
    let red2;
    let green2;
    let blue2;
    let max;
    let factor2;
    let grey;
    let r;
    let g;
    let b;
    ncs = colorTrim(ncs).toUpperCase();
    ncs = ncs.replace("(", "");
    ncs = ncs.replace(")", "");
    ncs = ncs.replace("NCS", "NCS ");
    ncs = ncs.replace(/  /g, " ");
    if (!ncs.includes("NCS")) {
        ncs = `NCS ${ncs}`;
    }
    ncs = ncs.match(/^(?:NCS|NCS\sS)\s(\d{2})(\d{2})-(N|[A-Z])(\d{2})?([A-Z])?$/);
    if (ncs === null) return false;
    black = parseInt(ncs[1], 10);
    chroma = parseInt(ncs[2], 10);
    bc = ncs[3];
    if (bc !== "N" && bc !== "Y" && bc !== "R" && bc !== "B" && bc !== "G") {
        return false;
    }
    percent = parseInt(ncs[4], 10) || 0;
    if (bc !== 'N') {
        black1 = (1.05 * black - 5.25);
        chroma1 = chroma;
        if (bc === 'Y' && percent <= 60) {
            red1 = 1;
        } else if ((bc === 'Y' && percent > 60) || (bc === 'R' && percent <= 80)) {
            if (bc === 'Y') {
                factor1 = percent - 60;
            } else {
                factor1 = percent + 40;
            }
            red1 = ((Math.sqrt(14884 - factor1 ** 2)) - 22) / 100;
        } else if ((bc === 'R' && percent > 80) || (bc === 'B')) {
            red1 = 0;
        } else if (bc === 'G') {
            factor1 = (percent - 170);
            red1 = ((Math.sqrt(33800 - factor1 ** 2)) - 70) / 100;
        }
        if (bc === 'Y' && percent <= 80) {
            blue1 = 0;
        } else if ((bc === 'Y' && percent > 80) || (bc === 'R' && percent <= 60)) {
            if (bc === 'Y') {
                factor1 = (percent - 80) + 20.5;
            } else {
                factor1 = (percent + 20) + 20.5;
            }
            blue1 = (104 - (Math.sqrt(11236 - factor1 ** 2))) / 100;
        } else if ((bc === 'R' && percent > 60) || (bc === 'B' && percent <= 80)) {
            if (bc === 'R') {
                factor1 = (percent - 60) - 60;
            } else {
                factor1 = (percent + 40) - 60;
            }
            blue1 = ((Math.sqrt(10000 - factor1 ** 2)) - 10) / 100;
        } else if ((bc === 'B' && percent > 80) || (bc === 'G' && percent <= 40)) {
            if (bc === 'B') {
                factor1 = (percent - 80) - 131;
            } else {
                factor1 = (percent + 20) - 131;
            }
            blue1 = (122 - (Math.sqrt(19881 - factor1 ** 2))) / 100;
        } else if (bc === 'G' && percent > 40) {
            blue1 = 0;
        }
        if (bc === 'Y') {
            green1 = (85 - 17 / 20 * percent) / 100;
        } else if (bc === 'R' && percent <= 60) {
            green1 = 0;
        } else if (bc === 'R' && percent > 60) {
            factor1 = (percent - 60) + 35;
            green1 = (67.5 - (Math.sqrt(5776 - factor1 ** 2))) / 100;
        } else if (bc === 'B' && percent <= 60) {
            factor1 = (1 * percent - 68.5);
            green1 = (6.5 + (Math.sqrt(7044.5 - factor1 ** 2))) / 100;
        } else if ((bc === 'B' && percent > 60) || (bc === 'G' && percent <= 60)) {
            green1 = 0.9;
        } else if (bc === 'G' && percent > 60) {
            factor1 = (percent - 60);
            green1 = (90 - (1 / 8 * factor1)) / 100;
        }
        factor1 = (red1 + green1 + blue1) / 3;
        red2 = ((factor1 - red1) * (100 - chroma1) / 100) + red1;
        green2 = ((factor1 - green1) * (100 - chroma1) / 100) + green1;
        blue2 = ((factor1 - blue1) * (100 - chroma1) / 100) + blue1;
        if (red2 > green2 && red2 > blue2) {
            max = red2;
        } else if (green2 > red2 && green2 > blue2) {
            max = green2;
        } else if (blue2 > red2 && blue2 > green2) {
            max = blue2;
        } else {
            max = (red2 + green2 + blue2) / 3;
        }
        factor2 = 1 / max;
        r = parseInt((red2 * factor2 * (100 - black1) / 100) * 255, 10);
        g = parseInt((green2 * factor2 * (100 - black1) / 100) * 255, 10);
        b = parseInt((blue2 * factor2 * (100 - black1) / 100) * 255, 10);
        if (r > 255) {
            r = 255;
        }
        if (g > 255) {
            g = 255;
        }
        if (b > 255) {
            b = 255;
        }
        if (r < 0) {
            r = 0;
        }
        if (g < 0) {
            g = 0;
        }
        if (b < 0) {
            b = 0;
        }
    } else {
        grey = parseInt((1 - black / 100) * 255, 10);
        if (grey > 255) {
            grey = 255;
        }
        if (grey < 0) {
            grey = 0;
        }
        r = grey;
        g = grey;
        b = grey;
    }
    return {
        r,
        g,
        b
    };
}

function rgbToHsl(r, g, b) {
    let min;
    let max;
    let i;
    let l;
    let s;
    let maxcolor;
    let h;
    const rgb = [];
    rgb[0] = r / 255;
    rgb[1] = g / 255;
    rgb[2] = b / 255;
    min = rgb[0];
    max = rgb[0];
    maxcolor = 0;
    for (i = 0; i < rgb.length - 1; i++) {
        if (rgb[i + 1] <= min) {
            min = rgb[i + 1];
        }
        if (rgb[i + 1] >= max) {
            max = rgb[i + 1];
            maxcolor = i + 1;
        }
    }
    if (maxcolor === 0) {
        h = (rgb[1] - rgb[2]) / (max - min);
    }
    if (maxcolor === 1) {
        h = 2 + (rgb[2] - rgb[0]) / (max - min);
    }
    if (maxcolor === 2) {
        h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }
    if (isNaN(h)) {
        h = 0;
    }
    h = h * 60;
    if (h < 0) {
        h = h + 360;
    }
    l = (min + max) / 2;
    if (min === max) {
        s = 0;
    } else {
        if (l < 0.5) {
            s = (max - min) / (max + min);
        } else {
            s = (max - min) / (2 - max - min);
        }
    }
    s = s;
    return {h, s, l};
}

function rgbToHwb(r, g, b) {
    let h;
    let w;
    let bl;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let chroma = max - min;
    if (chroma === 0) {
        h = 0;
    } else if (r === max) {
        h = (((g - b) / chroma) % 6) * 360;
    } else if (g === max) {
        h = ((((b - r) / chroma) + 2) % 6) * 360;
    } else {
        h = ((((r - g) / chroma) + 4) % 6) * 360;
    }
    w = min;
    bl = 1 - max;
    return {h, w, b: bl};
}

function rgbToCmyk(r, g, b) {
    let c;
    let m;
    let y;
    let k;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let max = Math.max(r, g, b);
    k = 1 - max;
    if (k === 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        c = (1 - r - k) / (1 - k);
        m = (1 - g - k) / (1 - k);
        y = (1 - b - k) / (1 - k);
    }
    return {c, m, y, k};
}

function toHex(n) {
    let hex = n.toString(16);
    while (hex.length < 2) {
        hex = `0${hex}`;
    }
    return hex;
}

function cl(x) {
    console.log(x);
}

function colorTrim(x) {
    return x.replace(/^\s+|\s+$/g, '');
}

function isHex(x) {
    return '0123456789ABCDEFabcdef'.includes(x);
}

window.color = color;

document.getElementById("input-color").oninput = () => {
    convertColor()
}

function convertColor() {
    let color = new window.color(document.getElementById("input-color").value, document.getElementsByClassName("display-color")[0]);

    document.getElementById("rgb").value = color.toRgbString();
    document.getElementById("rgba").value = color.toRgbaString();
    document.getElementById("hex").value = color.toHexString();
    document.getElementById("hsl").value = color.toHslString();
    document.getElementById("hsla").value = color.toHslaString();
    document.getElementById("hwb").value = color.toHwbString();
    document.getElementById("hwba").value = color.toHwbaString();
    document.getElementById("cmyk").value = color.toCmykString();
    document.getElementById("ncol").value = color.toNcolString();
    document.getElementById("ncola").value = color.toNcolaString();
}
