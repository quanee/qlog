package toolhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Tool(context *draft.Context) {
	context.HTML(http.StatusOK, "tool.tpl", draft.H{
		"title": "在线工具",
	})
}
