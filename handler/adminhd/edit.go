package adminhd

import (
	"fmt"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic/bloglogic"
	"github.com/quanee/qlog/utils/http2"
	"net/http"
	"os"
)

func Edit(context *draft.Context) {
	http2.Push(context.Writer, "/static/css/aquanee.css", "/static/js/aquanee.js", "/static/favicon.webp")
	id := context.QueryParam("param")
	article := bloglogic.QueryOneArticleById(database.DB, id)
	context.HTML(http.StatusOK, "admin/edit.tpl", draft.H{
		"title":       fmt.Sprintf("编辑-%s", article.Title),
		"article":     article,
		"host":        "http://www.quanee.com/",
		"description": "文章编辑",
		"slogan":      "Feature oriented programming",
		"env":         os.Getenv("ENV"),
	})
}
