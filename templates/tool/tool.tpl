{{ define "tool.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{{ .title }}</title>
        <link type="text/css" rel="stylesheet" href="/static/tool/css/tool.css">
    </head>
    <body>
    {{ template "tnav.tpl" . }}
    <div class="contains">
        <div class="col">
            <div class="card"><a href="/timestamp/">时间戳</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/color/">颜色转换</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/encdec/">编码解码</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/json/">json美化压缩</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/uuid/">生成UUID</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/fq/">番茄钟</a></div>
        </div>
    </div>
    </body>
    </html>
{{ end }}