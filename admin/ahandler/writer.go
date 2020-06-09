package ahandler

import (
	"github.com/quanee/draft"
	"net/http"
)

func Writer(context *draft.Context) {
	//err := context.Writer.(http.Pusher)
	context.HTML(http.StatusOK, "awriter.tpl", draft.H{
		"title": "写文章",
	})
}
