{{ define "post.tpl" }}
    <!DOCTYPE html>
    <html class="js video" lang="en">
    <head>
        {{ template "header.tpl" .}}
        <link href="../static/css/github-markdown.css" media="screen, projection" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="../static/css/prism.css">
    </head>
    <body>
    {{ template "nav.tpl" . }}
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
        {{ template "footer.tpl" }}
    </div>
    </body>
    <script type="text/javascript" src="../static/js/jquery-3.4.1.js"></script>
    <script type="text/javascript" src="../static/js/quanee.js"></script>
    <script src="../static/js/prism.js"></script>
{{/*    <script>hljs.initHighlightingOnLoad();</script>*/}}
    </html>
{{ end }}