{{ define "fq.tpl" }}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ .title }}</title>
    <link rel="stylesheet" href="/static/tool/css/tool.css">
    <script src="/static/tool/js/tool.js"></script>
</head>
<body>
    <div class="body" id="body">
        <div id="time">
            <div name="hour" id="select_hour" class="select" tabindex="1"></div>
            <span class="split">:</span>
            <div name="minute" id="select_minute" class="select" tabindex="2"></div>
            <span class="split">:</span>
            <div name="second" id="select_second" class="select" tabindex="3"></div>
        </div>
        <div onclick="start()" id="start">start</div>
        <div id="full_time">
            <div id="full_time_hour">00</div>
            <span class="split">:</span>
            <div id="full_time_minute">00</div>
            <span class="split">:</span>
            <div id="full_time_second">00</div>
        </div>
    </div>

</body>
</html>
{{ end }}