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
    <script type="text/javascript" src="../../static/admin/js/aquanee.js"></script>
    </html>
{{ end }}