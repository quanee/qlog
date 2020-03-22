package handler

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic"
	"github.com/quanee/qlog/utils/log"
	"net/http"
	"os"
)

func GetArticle(context *draft.Context) {
	id := context.Req.URL.Query().Get("id")
	offset := context.Req.URL.Query().Get("offset")
	articles, err := logic.QueryLimitSummary(database.DB, id, offset)
	if err != nil {
		log.Errorf("QueryLimitSummary", err)
	}

	if len(articles) == 0 {
		context.String(http.StatusOK, "done")
	} else {
		context.HTML(http.StatusOK, "article.tpl", draft.H{
			"title":       "首页",
			"articles":    articles,
			"host":        "http://www.quanee.com/",
			"description": "首页",
			"slogan":      "Feature oriented programming",
			"env":         os.Getenv("ENV"),
		})
	}
}
