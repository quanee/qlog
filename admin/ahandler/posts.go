package ahandler

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic"
	"github.com/quanee/qlog/utils/http2"
	"github.com/quanee/qlog/utils/log"
	"net/http"
	"os"
)

func Posts(context *draft.Context) {
	http2.Push(context.Writer, "/static/css/aquanee.css", "/static/js/aquanee.js", "/static/favicon.webp")

	articles, err := logic.QueryLimitSummary(database.DB, "0", "10")
	if err != nil {
		log.Errorf("QueryLimitSummary", err)
	}

	context.HTML(http.StatusOK, "posts.tpl", draft.H{
		"title":       "文章管理",
		"articles":    articles,
		"host":        "http://www.quanee.com/",
		"description": "文章管理",
		"slogan":      "Feature oriented programming",
		"env":         os.Getenv("ENV"),
	})
}
