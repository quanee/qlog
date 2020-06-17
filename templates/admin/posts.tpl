{{ define "admin/posts.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title id="title">{{ .title }}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="https://img.quanee.top/favicon.svg">
        <link rel="stylesheet" href="../../static/admin/css/aquanee.css" media="screen, projection" type="text/css">
    </head>
    <body>
    <div class="body" id="body">
        {{ template "admin/poststable.tpl" .}}
    </div>
    </body>
    {{ if eq .env "release" }}
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    {{ else }}
    <script type="text/javascript" src="../../static/blog/js/jquery-3.4.1.js"></script>
    {{ end }}
    <script type="text/javascript" src="../../static/admin/js/aquanee.js"></script>
    </html>
{{ end }}