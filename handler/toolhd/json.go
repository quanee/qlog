package toolhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Json(context *draft.Context) {
	context.HTML(http.StatusOK, "json.tpl", draft.H{
		"title": "json美化,压缩",
	})
}
