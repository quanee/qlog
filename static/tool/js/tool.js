window.onload = function () {
    var hour_opts = `<input class="selectopt option-input" name="hour" type="radio" id="hour_opt0" checked>
  <label for="hour_opt0" class="option">00</label>`;
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
    var curhour = Math.floor(countSec / 3600);
    var curminute = Math.floor(countSec / 60 % 60);
    var cursecond = Math.floor(countSec % 60);
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
    var hour = 0, minute = 0, second = 0;
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

function timestampToTime() {
    let timestamp = document.getElementById("inputts").value;
    let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    let time = Y + M + D + h + m + s;
    document.getElementById("date").innerText = time
}

function DateToTimestamp() {
    let date = new Date('2014-04-23 18:55:49:123');
    // 有三种方式获取
    let time1 = date.getTime();
    let time2 = date.valueOf();
    let time3 = Date.parse(date.toString());
}

try {
    document.getElementById("gen-uuid").onclick = function () {
        document.getElementById("uuid-box").innerHTML += "<li>" + uuid() + "</li><i onclick='copy()'>copy</i>"
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
