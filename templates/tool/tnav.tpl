{{ define "tnav.tpl" }}
    <nav class="local-nav">
        <div class="ln-wrapper" id="ln-wrapper">
            <div class="ln-content">
                <div class="ln-menu">
                    <div id="ln-menu-tray" class="ln-menu-tray">
                        <a onclick="menuToggle()">
                            <div id="nav-icon" class="nav-icon" onselectstart='return false;'>
                                <i>
                                    <svg width="24" height="24" viewBox="0 0 24 24" x="96" y="72">
                                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                                    </svg>
                                </i>
                            </div>
                        </a>
                        <a onclick="menuToggle()">
                            <div id="nav-icon-close" class="nav-icon-close" onselect='return false'>
                                <i>
                                    <svg width="24" height="24" viewBox="0 0 24 24" y="72">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                    </svg>
                                </i>
                            </div>
                        </a>
                        <ul id="main-navigation">
                            <li><a class="nav-item" href="/blog/">博客</a></li>
                            <li><a class="nav-item" href="/tool/">工具</a></li>
                            <li><a class="nav-item" href="#/about">关于</a></li>
                            <li><a class="nav-item" href="#/about">关于</a></li>
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