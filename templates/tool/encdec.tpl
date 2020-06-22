{{ define "encdec.tpl" }}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ .title }}</title>
    <link href="/static/tool/css/tool.css" rel="stylesheet" type="text/css" media="all"/>
</head>
<body>
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
</html>

{{ end }}