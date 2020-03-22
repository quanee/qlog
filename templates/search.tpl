{{ define "search.tpl" }}
<!DOCTYPE html>
<html lang="en">
<head>
    {{ template "header.tpl" . }}
</head>
<body>

{{ template "nav.tpl" . }}
<div class="body" id="body">
    <div id="main">
        <div id="content">
            <div class="blog-index" id="index-article">
                {{ template "article.tpl" . }}
            </div>
            <div class="pagination">
                <div class="loadmore" id="loadmore">
                    <div class="loader hidden">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{ template "footer.tpl" }}
</div>
</body>
{{ if eq .env "release" }}
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
{{ else }}
<script type="text/javascript" src="../static/js/jquery-3.4.1.js"></script>
{{ end }}
<script type="text/javascript" src="../static/js/quanee.js"></script>
</html>
{{ end }}