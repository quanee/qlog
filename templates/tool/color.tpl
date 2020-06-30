{{ define "color.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{{ .title }}</title>
        <link rel="stylesheet" type="text/css" href="/static/tool/css/tool.css"/>
    </head>
    <body>
    {{ template "tnav.tpl" . }}
    <div class="body">
        <div>
            <div>
                <label class="label" for="input-rgb">RGB: </label><input class="input" type="text" id="input-rgb">
                <button class="btn" id="rgb">转换</button>
                <label class="label" for="input-hex">HEX: </label><input class="input" type="text" id="input-hex">
                <button class="btn" id="hex">转换</button>
            </div>

            <div>
                <ul id="conv-ret">
                </ul>
            </div>
        </div>
    </div>
    <div id="dialog-bg">
        <dialog id="dialog" open></dialog>
    </div>
    </body>
    <script src="/static/tool/js/tool.js"></script>
    </html>
{{ end }}