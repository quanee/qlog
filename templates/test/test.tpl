{{ define "test/test.tpl" }}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="manifest" href="/static/test/manifest.webmanifest"/>
    <meta name="description" content="Quanee 的PWA">
    <script src="/static/test/js/test.js"></script>
    <meta name="theme-color" content="#FFF" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Weather PWA">
    <link rel="apple-touch-icon" href="https://img.quanee.top/favicon.svg" type="image/svg+xml">
</head>
<body>
    <div><a href="/blog/">Blog</a></div>
</body>
</html>
{{ end }}