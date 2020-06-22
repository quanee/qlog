package toolhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Fq(context *draft.Context) {
	context.HTML(http.StatusOK, "fq.tpl", draft.H{
		"title": "番茄钟",
	})
}
