{{ define "nav.tpl" }}
    <!-- Google Tag Manager (noscript) -->
    {{/*<noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KG9KDBQ"
                height="0" width="0" style="display:none;visibility:hidden">
        </iframe>
    </noscript>*/}}
    <!-- End Google Tag Manager (noscript) -->
    <progress id="progress" class="waiting">
        <dt></dt>
        <dd></dd>
    </progress>
    <div class="backtop" id="backtop" title="返回顶部">
            <span>
                <i class="material-icons" id="back_top_i">arrow_upward</i>
            </span>
    </div>
    <div class="common-header">
        <div class="nav-header" id="nav-header">
{{/*            <div id="nav-icon" class="nav-icon"><i class="material-icons">menu</i></div>*/}}
            <div id="post-nav-menu" class="nav-menu">
                <nav id="main-navigation">
                    <a class="nav-item" href="/">博客</a>
                    <a class="nav-item" href="#/about">关于</a>
                    <a class="nav-item" href="#/contact">联系</a>
                    <div class="search-outline">
                        <div class="input-outline">
                            <div>
                                <input id="search-input" class="search-input">
                            </div>
                        </div>
                        <div class="search-button-outline">
                            <span>
                                <i class="material-icons search" id="search-btn">search</i>
                            </span>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="post-nav-title" class="nav-title">
                <div class="inner-nav-title">{{ .article.Title }}</div>
            </div>
        </div>
    </div>
{{ end }}