package toolhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Icon(context *draft.Context) {
	context.HTML(http.StatusOK, "icon.tpl", draft.H{
		"title": "icon",
	})
}
