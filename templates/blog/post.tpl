{{ define "blog/post.tpl" }}
    <!DOCTYPE html>
    <html class="js video" lang="en">
    <head>
        {{ template "blog/header.tpl" .}}
        <link href="../../static/blog/css/github-markdown.css" media="screen, projection" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="../../static/blog/css/prism.css">
    </head>
    <body>
    {{ template "blog/nav.tpl" . }}
    <div class="body">
        <div id="main">
            <div id="content">
                <div class="article">
                    <article>
                        <header>
                            <p class="meta">
                                <time class="datetime" datetime="{{ .article.CreatedTime }}"
                                      data-updated="true">{{ .article.CreatedTime }}</time>
                            </p>
                            <h1 class="entry-title">{{ .article.Title }}</h1>
                        </header>
                        <div class="entry-content">
                            <div id="mdhtml" class="mdhtml">{{ .article.Substance | html }}</div>
                        </div>
                        <footer>
                        </footer>
                    </article>
                </div>
            </div>
        </div>
        {{ template "blog/footer.tpl" }}
    </div>
    </body>
    <script type="text/javascript" src="/static/blog/js/jquery-3.4.1.js"></script>
    <script type="text/javascript" src="/static/blog/js/quanee.js"></script>
    <script src="/static/blog/js/prism.js"></script>
{{/*    <script>hljs.initHighlightingOnLoad();</script>*/}}
    </html>
{{ end }}