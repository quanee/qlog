package bloghd

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic/bloglogic"
	"github.com/quanee/qlog/utils/log"
	"net/http"
	"os"
)

func Search(context *draft.Context) {
	words := context.QueryParam("param")
	articles, err := bloglogic.SearchArticle(database.DB, words)
	if err != nil {
		log.Errorf("Search error", err)
	}

	if context.Method == "POST" {
		context.HTML(http.StatusOK, "article.tpl", draft.H{
			"title":       "搜索",
			"articles":    articles,
			"host":        "http://www.quanee.com/",
			"description": "搜索",
			"slogan":      "Feature oriented programming",
			"env":         os.Getenv("ENV"),
		})
	} else {
		context.HTML(http.StatusOK, "search.tpl", draft.H{
			"title":       "搜索",
			"articles":    articles,
			"host":        "http://www.quanee.com/",
			"description": "搜索",
			"slogan":      "Feature oriented programming",
			"env":         os.Getenv("ENV"),
		})
	}

}
