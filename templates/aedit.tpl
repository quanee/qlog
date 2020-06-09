{{ define "aedit.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        {{ template "aheader.tpl" .}}
    </head>
    <body>
    <div class="backtop" id="backtop" title="返回顶部"><i class="material-icons">arrow_upward</i></div>
    {{ template "nav.tpl" . }}
    <div class="edit-body">
        <div class="edit-title-area">
            <label>
                <input class="edit-title" type="text" id="edit-title" placeholder="输入标题...">
            </label>
        </div>
        <ul class="toolbar">
            <li><input type="button" value="插入图片" onclick="insertText(document.getElementById('edit-textarea'),'![]()')">
            </li>
            <li><input type="button" value="插入代码块"
                       onclick="insertText(document.getElementById('edit-textarea'), '```\n\n```')"></li>
            <li><input type="button" value="保存" onclick="putartic()"></li>
        </ul>

        <div>
            <div class="expandingArea">
                <pre id="pre-span" class="contextpre"><span></span><br></pre>
                <textarea placeholder="输入文字..." id="edit-textarea" class="contextpre"></textarea>
            </div>
        </div>
        {{ template "footer.tpl" }}
    </div>
    </body>
    <script src="../static/js/jquery-3.4.1.js"></script>
    <script type="text/javascript" src="../static/js/aquanee.js"></script>
    </html>
{{ end }}