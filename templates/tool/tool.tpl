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
            <div class="card"><a href="/timestamp/" target="_blank">时间戳</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/color/" target="_blank">颜色转换</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/encdec/" target="_blank">编码解码</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/json/" target="_blank">json美化压缩</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/uuid/" target="_blank">生成UUID</a></div>
        </div>
        <div class="col">
            <div class="card"><a href="/pomodoro/" target="_blank">番茄钟</a></div>
        </div>
    </div>
    </body>
    </html>
{{ end }}