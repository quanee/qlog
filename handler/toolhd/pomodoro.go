package toolhd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Pomodoro(context *draft.Context) {
	context.HTML(http.StatusOK, "pomodoro.tpl", draft.H{
		"title": "番茄钟",
	})
}
