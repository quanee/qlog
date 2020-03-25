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
                <div class="entry-tags">
                    {{ range $s, $t := $v.Tags }}
                        <a class="entry-tag" href="/tags/{{ $t }}"><span>{{ $t }}</span></a>
                    {{ end }}
                </div>
                <a class="read-all" rel="full-article" href="/post/{{ $v.SId }}">
                    <p class="underline">READ ALL</p>
                </a>
            </footer>
        </article>
    {{ end }}
{{ end }}