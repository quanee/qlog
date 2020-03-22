package handler

import (
	"errors"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic"
	"github.com/quanee/qlog/utils/http2"
	"github.com/quanee/qlog/utils/log"
	"github.com/quanee/qlog/utils/md2html"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func Post(context *draft.Context) {
	http2.Push(context.Writer, "/static/css/quanee.css", "/static/js/quanee.js", "/static/favicon.webp")
	log.Print(strings.Split(context.Req.RequestURI, "/"))
	id := context.QueryParam("param")
	article := logic.QueryOneArticleById(database.DB, id)

	substance, err := md2html.MD2HTML(article.Substance)
	if err != nil {
		log.Error("md2html error :", err)
	}
	article.Substance = substance

	//var pre, next string
	//if id == "1" {
	//	next = ""
	//} else {
	//	next = idInc(id, -1)
	//}
	//pre = idInc(id, 1)
	context.HTML(http.StatusOK, "post.tpl", draft.H{
		"article": article,
		"env":     os.Getenv("ENV"),
		"title":   article.Title,
		//"pre": pre,
		//"next": next,
	})
}

func idInc(id string, dea int) string {
	iid, err := strconv.Atoi(id)
	if err != nil {
		log.Error(errors.New("string convert to int error"))
	}
	return strconv.Itoa(iid + dea)
}
