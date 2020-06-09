document.getElementById("edit-textarea").addEventListener('input', function () {
    document.getElementById("pre-span").innerText = document.getElementById("edit-textarea").value + "<br>";
}, false);

function putartic() {
    title = document.getElementById("edit-title").value
    content = document.getElementById("edit-textarea").value
    payload = {
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
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

function insertText(obj, str) {
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
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