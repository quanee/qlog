{{ define "pomodoro.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{{ .title }}</title>
        <link rel="stylesheet" href="/static/tool/css/tool.css">
        <script src="/static/tool/js/tool.js"></script>
    </head>
    <body class="pomodoro-body">
    {{ template "tnav.tpl" . }}
    <main>
        <div style="max-width: 500px; margin: 0 auto;">
            <label>Pomodoro
                <input type="number" class="pomodoro-main" step="1" min="1"
                       onblur="setWorkTime('work', this.value);pomodoro.wtime=this.value">
            </label>
            <br>
            <label>Short Break
                <input type="number" class="pomodoro-main" step="1" min="1"
                       onblur="setWorkTime('sbreak', this.value);pomodoro.sbtime=this.value">
            </label>
            <br>
            <label>Long Break
                <input type="number" class="pomodoro-main" step="1" min="1"
                       onblur="setWorkTime('lbreak', this.value);pomodoro.lbtime=this.value">
            </label>
        </div>
        <div id="target">
            <div class="page-title">Pomodoro Clock</div>
            <div>
                <div class="clock-contain">
                    <div class="clock">
                        <div>
                            <div class="clock-setting">
                                <button id="work" class="clock-btn clock-btn-active">Pomodoro</button>
                                <button id="sbreak" class="clock-btn">Short Break</button>
                                <button id="lbreak" class="clock-btn">Long Break</button>
                            </div>
                            <div id="timer-string">25:00</div>
                            <button id="start" class="start">START</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    </body>
    <script src="/static/tool/js/tool.js" type="text/javascript"></script>
    <script>
        let pomodoro = null;
        window.onload = () => {
            pomodoro = new Pomodoro();
            pomodoro.status = "work";
            pomodoro.stuff = "Time to work"
        }
        let timeCounter = null;
        document.getElementById("work").addEventListener("click", () => {
            pomodoro.pomodorobtn()
        }, false)
        document.getElementById("sbreak").addEventListener("click", () => {
            pomodoro.shortbreakbtn()
        }, false)
        document.getElementById("lbreak").addEventListener("click", () => {
            pomodoro.longbreakbtn()
        }, false)
        document.getElementById("start").addEventListener("click", () => {
            pomodoro.pomodorostart()
        }, false)
    </script>
    </html>
{{ end }}