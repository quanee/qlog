package toolhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Timestamp(context *draft.Context) {
	context.HTML(http.StatusOK, "timestamp.tpl", draft.H{
		"title": "时间戳日期互转",
	})
}
