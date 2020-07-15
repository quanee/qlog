{{ define "encdec.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{{ .title }}</title>
        <link href="/static/tool/css/tool.css" rel="stylesheet" type="text/css" media="all"/>
    </head>
    <body>
    {{ template "tnav.tpl" . }}
    <div class="body">
        <button id="url-enc" class="btn">URL编码</button>
        <button id="url-dec" class="btn">URL解码</button>
        <button id="base64-enc" class="btn">Base64编码</button>
        <button id="base64-dec" class="btn">Base64解码</button>
        <button id="md5sum" class="btn">MD5</button>
        <br>
        <textarea id="input-content"></textarea>
    </div>
    </body>
    <script src="/static/tool/js/tool.js"></script>
    <script>

        let arr = new Map([
            ["url-enc", encodeURIComponent],
            ["url-dec", decodeURIComponent],
            ["base64-enc", Base64.encode],
            ["base64-dec", Base64.decode],
            ["md5sum", md5]]
        )
        for (let [key, value] of arr) {
            document.getElementById(key).addEventListener("click", () => {document.getElementById("input-content").value = value(document.getElementById("input-content").value)})
        }
    </script>
    </html>

{{ end }}