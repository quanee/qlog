{{ define "article.tpl" }}
    {{ range $i, $v := .articles }}
        <div class="iarticle">
            <header>
                <p class="meta">
                    <time class="datetime">{{ $v.CreatedTime }}</time>
                </p>
                <h1 title="{{ $v.Title }}" class="entry-title">
                    <a href="/post/{{ $v.SId }}" target="_blank">{{ $v.Title }}</a>
                </h1>
            </header>
            <p class="index-entry-content">
                {{ $v.Abstract }}
            </p>
            <footer class="entry-footer">
                <div class="entry-tags">
                    {{ range $s, $t := $v.Tags }}
                        <a class="entry-tag" href="/tags/{{ $t }}"><font>{{ $t }}</font></a>
                    {{ end }}
                </div>
                <a class="read-all" rel="full-article" href="/post/{{ $v.SId }}" target="_blank">
                    <p class="underline">READ ALL</p>
                </a>
            </footer>
        </div>
    {{ end }}
{{ end }}