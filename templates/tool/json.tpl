{{ define "json.tpl" }}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ .title }}</title>
    <link href="/static/tool/css/tool.css" rel="stylesheet" type="text/css" media="all"/>
</head>
<body>
<div class="body">
    <button class="btn" id="format-json">格式化</button>
    <button class="btn" id="compass-json">压缩</button>
    <br>
    <textarea id="input-json" placeholder="输入JSON"></textarea>
</div>
</body>
<script src="/static/tool/js/tool.js"></script>
</html>
{{ end }}