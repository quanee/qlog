package toolhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Encdec(context *draft.Context) {
	context.HTML(http.StatusOK, "encdec.tpl", draft.H{
		"title": "编码解码",
	})
}
