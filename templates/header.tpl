{{ define "header.tpl" }}
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title id="title">{{ .title }}</title>
    <meta name="author" content="Quanee">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="https://img.quanee.top/favicon.svg">
    <link rel="stylesheet" href="../static/css/quanee.css" media="screen, projection" type="text/css">
    <!-- Google Tag Manager -->
    {{/*<script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-KG9KDBQ');
    </script>*/}}
    <!-- End Google Tag Manager -->
{{ end }}