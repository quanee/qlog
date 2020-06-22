{{ define "timestamp.tpl" }}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ .title }}</title>
    <link href="/static/tool/css/tool.css" rel="stylesheet" type="text/css" media="all"/>
</head>
<body>
<div class="body">
    <div>
        <label class="label" for="timestamp-now">现在</label>
        <p id="timestamp-now"></p><label for="timestamp-now" id="stop">■</label>
    </div>
    <div style="margin-bottom: 10px;">
        <label class="label" for="input-timestamp">时间戳: </label><input class="input" type="text" id="input-timestamp">
        <button class="btn" id="ts2dt">转换>></button>
        <label class="label" for="output-date">日期时间: </label><input class="input" type="text" id="output-date">
    </div>

    <div>
        <label class="label" for="input-date">日期时间: </label><input class="input" type="text" id="input-date">
        <button class="btn" id="dt2ts">转换>></button>
        <label class="label" for="output-timestamp">时间戳: </label><input class="input" type="text" id="output-timestamp">
    </div>
</div>
</body>
<script src="/static/tool/js/tool.js"></script>
</html>
{{ end }}