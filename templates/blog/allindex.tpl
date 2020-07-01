{{ define "allindex.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        {{ template "header.tpl" . }}
    </head>
    <body>
    <div class="body" id="body">

    </div>
    {{ template "footer.tpl" }}
    </body>
    <script async type="text/javascript" src="/static/blog/js/quanee.js"></script>
    </html>
{{ end }}