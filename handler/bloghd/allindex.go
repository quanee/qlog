package bloghd

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/utils/http2"
	"net/http"
	"os"
)

func AllIndex(context *draft.Context) {
	http2.Push(context.Writer, "/static/css/quanee.css", "/static/js/quanee.js", "/static/favicon.webp")

	context.HTML(http.StatusOK, "index.tpl", draft.H{
		"title":       "首页",
		"host":        "http://www.quanee.com/",
		"description": "首页",
		"slogan":      "Feature oriented programming",
		"env":         os.Getenv("ENV"),
		"tex":         "",
	})
}
