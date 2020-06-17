{{ define "blog/nav.tpl" }}
{{/*    <progress id="progress" class="waiting">*/}}
{{/*        <dt></dt>*/}}
{{/*        <dd></dd>*/}}
{{/*    </progress>*/}}
    <div class="backtop" id="backtop" title="返回顶部">
            <span>
                <i class="material-icons" id="back_top_i">arrow_upward</i>
            </span>
    </div>
    <nav class="local-nav">
        <div class="ln-wrapper" id="ln-wrapper">
            <div class="ln-content">
                <div class="ln-menu">
                    <div id="ln-menu-tray" class="ln-menu-tray">
                        <a onclick="menuToggle()">
                            <div id="nav-icon" class="nav-icon" onselectstart='return false;'>
                                <i class="material-icons">menu</i>
                            </div>
                        </a>
                        <a onclick="menuToggle()">
                            <div id="nav-icon-close" class="nav-icon-close" onselectstart='return false;'>
                                <i class="material-icons">close</i>
                            </div>
                        </a>
                        <ul id="main-navigation">
                            <li><a class="nav-item" href="/blog/">博客</a></li>
                            <li><a class="nav-item" href="#/about">关于</a></li>
                            <li><a class="nav-item" href="#/about">关于</a></li>
                            <li><a class="nav-item" href="/tool/">工具</a></li>
                            <li><div class="search-outline">
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
                                </div></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="post-nav-title" class="nav-title">
                <div class="inner-nav-title">{{ .article.Title }}</div>
            </div>
        </div>
    </nav>
{{ end }}