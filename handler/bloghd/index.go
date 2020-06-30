package bloghd

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic/bloglogic"
	"github.com/quanee/qlog/utils/log"
	"net/http"
	"os"
)

func Index(context *draft.Context) {
	//http2.Push(context.Writer, "/static/css/quanee.css", "/static/js/quanee.js", "/static/favicon.webp")

	articles, err := bloglogic.QueryLimitSummary(database.DB, "0", "10")
	if err != nil {
		log.Errorf("QueryLimitSummary", err)
	}

	context.HTML(http.StatusOK, "index.tpl", draft.H{
		"title":       "首页",
		"articles":    articles,
		"host":        "http://www.quanee.com/",
		"description": "首页",
		"slogan":      "Feature oriented programming",
		"env":         os.Getenv("ENV"),
		"tex":         "",
	})
}
