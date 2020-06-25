{{ define "header.tpl" }}
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title id="title">{{ .title }}</title>
    <meta name="author" content="Quanee">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="https://img.quanee.top/favicon.svg">
    <link rel="stylesheet" href="/static/blog/css/quanee.css" media="screen, projection" type="text/css">
    {{ if eq .tex "tex" }}
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script>
            MathJax = {
                tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
                svg: {fontCache: 'global'}
            };
        </script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-svg.js"></script>
    {{ else }}
    {{ end }}
{{ end }}