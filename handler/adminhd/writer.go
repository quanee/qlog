package adminhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Writer(context *draft.Context) {
	//err := context.Writer.(http.Pusher)
	context.HTML(http.StatusOK, "admin/writer.tpl", draft.H{
		"title": "写文章",
	})
}
