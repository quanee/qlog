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
    {{ if eq .env "release" }}
    <script async src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    {{ else }}
    <script async type="text/javascript" src="/static/blog/js/jquery-3.4.1.js"></script>
    {{ end }}
    <script async type="text/javascript" src="/static/blog/js/quanee.js"></script>
    </html>
{{ end }}