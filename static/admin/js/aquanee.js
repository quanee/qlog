try {
    document.getElementById("token").innerText = uuid();
    if (window.location.pathname === "/admin/writer") {
        document.getElementById("edit-textarea").addEventListener('input', function () {
            document.getElementById("pre-span").innerText = document.getElementById("edit-textarea").value + "<br>";
        }, false);
    }

    if (window.location.pathname === "/admin/signin/") {
        ["username", "password"].forEach(function (e) {
            document.getElementById(e).addEventListener("blur", function () {
                if (document.getElementById(e).value === "") {
                    document.getElementById(e).classList.remove("form-entered")
                } else {
                    document.getElementById(e).classList.add("form-entered")
                }
            }, false)
        });
        document.getElementById("token").value = uuid();
    }
} catch (e) {
    console.log(e);
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

function putartic() {
    let title = document.getElementById("edit-title").value
    let content = document.getElementById("edit-textarea").value
    let payload = {
        title: title,
        substance: content,
        abstract: "testabstract",
        createdtime: "2015-12-15"
    }
    fetch("/admin/put", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: 'include'
    }).then(res => res.json()
    ).catch(error => console.error('Error:', error)
    ).then(response => console.log('Success:', response));
}

function insertText(obj, str) {
    if (document.selection) {
        let sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        let startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += str;
    }
    obj.focus();
}

function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let token = document.getElementById("token").value
    let data = {username: username, password: password, token: token}
    fetch("/admin/signin/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers(),
            credentials: 'include'
        }
    ).then(
        res => res.json()
    ).then(
        res => {
            if (res["msg"] === "success") {
                window.localStorage.setItem("token", res["token"]);
                window.history.pushState("", "", res["path"]);
                window.location.reload();
            }
        }
    )
}

try {
    window.addEventListener("hashchange", () => {

    }, false)
} catch (e) {
    console.log(e)
}
