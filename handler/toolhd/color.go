package toolhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Color(context *draft.Context) {
	context.HTML(http.StatusOK, "color.tpl", draft.H{
		"title": "RGB-16进制颜色转换",
	})
}
