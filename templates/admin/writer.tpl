{{ define "admin/writer.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        {{ template "admin/header.tpl" .}}
    </head>
    <body>
    <div class="edit-body">
        <div class="edit-title-area">
            <label>
                <input class="edit-title" type="text" id="edit-title" placeholder="输入标题...">
            </label>
        </div>
        <ul class="toolbar">
            <li><a type="button" onclick="insertText(document.getElementById('edit-textarea'),'![]()')">URL</a></li>
            <li><a type="button" onclick="insertText(document.getElementById('edit-textarea'), '```\n\n```')">CODE</a></li>
            <li><a type="button" onclick="putartic()">SAVE</a></li>
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
    <script type="text/javascript" src="../../static/admin/js/aquanee.js"></script>
    </html>
{{ end }}