{{ define "blog/index.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        {{ template "blog/header.tpl" . }}
    </head>
    <body>
    {{ template "blog/nav.tpl" . }}
    <div class="body" id="body">
        <div id="main">
            <div id="content">
                <div class="blog-index" id="index-article">
                    {{ template "blog/article.tpl" . }}
                </div>
                <div class="pagination">
                    <div id="loadmore">
                        <div class="google-loader">
                            <div class="dot blue"></div>
                            <div class="dot red"></div>
                            <div class="dot yellow"></div>
                            <div class="dot green"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    {{ template "blog/footer.tpl" }}
    </body>
    {{ if eq .env "release" }}
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    {{ else }}
    <script type="text/javascript" src="/static/blog/js/jquery-3.4.1.js"></script>
    {{ end }}
    <script type="text/javascript" src="/static/blog/js/quanee.js"></script>
    </html>
{{ end }}