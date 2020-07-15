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
    document.getElementById("url-enc").onclick = () => {
        document.getElementById("input-content").value = encodeURIComponent(document.getElementById("input-content").value);
    }
    document.getElementById("url-dec").onclick = () => {
        document.getElementById("input-content").value = decodeURIComponent(document.getElementById("input-content").value);
    }
    document.getElementById("base64-enc").onclick = () => {
        document.getElementById("input-content").value = Base64.encode(document.getElementById("input-content").value);
    }
    document.getElementById("base64-dec").onclick = () => {
        document.getElementById("input-content").value = Base64.decode(document.getElementById("input-content").value);
    }
    document.getElementById("md5sum").onclick = () => {}
</script>
</html>

{{ end }}