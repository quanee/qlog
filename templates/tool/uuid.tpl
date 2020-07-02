{{ define "uuid.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{{ .title }}</title>
        <link rel="stylesheet" href="/static/tool/css/tool.css" type="text/css">
    </head>
    <body>
    {{ template "tnav.tpl" . }}
    <div class="body">
        <label id="gen-uuid" class="btn">生成</label>
        <br>
        <ul id="uuid-box">
        </ul>
    </div>
    </body>
    <script src="/static/tool/js/tool.js"></script>
    <script>
        document.getElementById("gen-uuid").addEventListener("click", genID, false);
        function genID() {
            document.getElementById("uuid-box").innerHTML += "<li><input value='" + uuid() + "'/><span aria-label='复制' type='button' onclick='copyToClipBord(this.previousElementSibling.value)'>c</span></li>"
        }
    </script>
    </html>
{{ end }}