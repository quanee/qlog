{{ define "article.tpl" }}
    {{ range $i, $v := .articles }}
        <article class="iarticle" onclick="detailpost('/post/{{ $v.SId }}')">
            <header>
                <p class="meta">
                    <time class="datetime">{{ $v.CreatedTime }}</time>
                </p>
                <h1 class="entry-title">
                    <a>{{ $v.Title }}</a>
                </h1>
            </header>
            <p class="index-entry-content">
                {{ $v.Abstract }}
            </p>
            <footer class="entry-footer">
                <a class="waves read-all" rel="full-article" href="/post/{{ $v.SId }}">READ MORE</a>
            </footer>
        </article>
    {{ end }}
{{ end }}