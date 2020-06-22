package bloghd

import (
	"github.com/quanee/draft"
	"net/http"
	"os"
)

func NotFound(context *draft.Context) {
	context.HTML(http.StatusOK, "4xx.tpl", draft.H{
		"title":       "未找到",
		"host":        "http://www.quanee.com/",
		"description": "未找到",
		"slogan":      "Feature oriented programming",
		"env":         os.Getenv("ENV"),
	})
}
