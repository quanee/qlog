{{ define "index.tpl" }}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        {{ template "header.tpl" . }}
    </head>
    <body>
    {{ template "nav.tpl" . }}
    <div class="body" id="body">
        <div id="main">
            <section id="content">
                <article class="blog-index" id="index-article">
                    {{ template "article.tpl" . }}
                </article>
                <div class="pagination" id="pagination">
                    <div id="loadmore">
                        <div class="google-loader">
                            <div class="dot blue"></div>
                            <div class="dot red"></div>
                            <div class="dot yellow"></div>
                            <div class="dot green"></div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
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