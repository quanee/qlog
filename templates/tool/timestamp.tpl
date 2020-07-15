{{ define "timestamp.tpl" }}
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
        <div>
            <label class="label" for="timestamp-now">现在</label>
            <p id="timestamp-now"></p>
            <label for="timestamp-now" id="stop">
                <svg width="24" height="24">
                    <path d="M6 6h12v12H6z"></path>
                </svg>
            </label>
            <label for="timestamp-now" id="continue" style="display: none;">
                <svg width="24" height="24">
                    <path d="M8 5v14l11-7z"></path>
                </svg>
            </label>
        </div>
        <div style="margin-bottom: 10px;">
            <label class="label" for="input-timestamp">时间戳: </label><input class="input" type="text"
                                                                           id="input-timestamp">
            <button class="btn" id="ts2dt">转换>></button>
            <label class="label" for="output-date">日期时间: </label><input class="input" type="text" id="output-date">
        </div>

        <div>
            <label class="label" for="input-date">日期时间: </label><input class="input" type="text" id="input-date">
            <button class="btn" id="dt2ts">转换>></button>
            <label class="label" for="output-timestamp">时间戳: </label><input class="input" type="text"
                                                                            id="output-timestamp">
        </div>
    </div>
    </body>
    <script src="/static/tool/js/tool.js"></script>
    <script>
        try {
            let stop = false;
            document.getElementById("stop").onclick = () => {
                stop = !stop;
                switchTimestampButton()
                tick();
            }
            document.getElementById("continue").onclick = () => {
                stop = !stop;
                switchTimestampButton()
                tick();
            }
            document.getElementById("ts2dt").addEventListener("click", timestampToDatetime, false);
            document.getElementById("dt2ts").addEventListener("click", DatetimeToTimestamp, false);
        } catch (e) {
            console.log(e)
        }
        window.onload = function () {
            try {
                tick()
                let now = new Date()
                document.getElementById("input-timestamp").value = Math.round((new Date()).valueOf() / 1000).toString();
                document.getElementById("input-date").value = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            } catch (e) {
                console.log(e)
            }
        }
    </script>
    </html>
{{ end }}