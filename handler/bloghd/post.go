package bloghd

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic/bloglogic"
	"github.com/quanee/qlog/utils/http2"
	"github.com/quanee/qlog/utils/log"
	"github.com/quanee/qlog/utils/md2html"
	"net/http"
	"os"
	"strings"
	"unsafe"
)

func Post(context *draft.Context) {
	http2.Push(context.Writer, "/static/css/quanee.css", "/static/js/quanee.js", "/static/favicon.webp")
	log.Print(strings.Split(context.Req.RequestURI, "/"))
	//id := context.Query("id")
	id := context.QueryParam("param")
	article := bloglogic.QueryOneArticleById(database.DB, id)

	substance, err := md2html.MD2HTML(StrToBytes(article.Substance))
	if err != nil {
		log.Error("md2html error :", err)
	}
	article.Substance = substance

	context.HTML(http.StatusOK, "blog/post.tpl", draft.H{
		"article": article,
		"env":     os.Getenv("ENV"),
		"title":   article.Title,
	})
}

func BytesToStr(bytes []byte) string {
	return *(*string)(unsafe.Pointer(&bytes))
}

// StrToBytes 快速转换 string 为 []byte。
func StrToBytes(str string) []byte {
	x := (*[2]uintptr)(unsafe.Pointer(&str))
	h := [3]uintptr{x[0], x[1], x[1]}
	return *(*[]byte)(unsafe.Pointer(&h))
}
