{{ define "post.tpl" }}
    <!DOCTYPE html>
    <html class="js video" lang="en">
    <head>
        {{ template "header.tpl" .}}
        <link href="../../static/blog/css/markdown.css" media="screen, projection" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="../../static/blog/css/prism.css">
    </head>
    <body>
    {{ template "nav.tpl" . }}
    <div class="body">
        <div id="main">
            <section id="content">
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
                            <div class="entry-tags">
                                {{ range $s, $t := .article.Tags }}
                                    <a class="entry-tag" href="/tags/{{ $t }}"><font>{{ $t }}</font></a>
                                {{ end }}
                            </div>
                        </footer>
                    </article>
                </div>
            </section>
        </div>
    </div>
    {{ template "footer.tpl" }}
    </body>
    <script type="text/javascript" src="/static/blog/js/quanee.js"></script>
    <script src="/static/blog/js/prism.js"></script>
{{/*    <script>hljs.initHighlightingOnLoad();</script>*/}}
    </html>
{{ end }}