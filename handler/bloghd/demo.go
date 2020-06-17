package bloghd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Demo(context *draft.Context) {
	context.HTML(http.StatusOK, "sssdemo.tpl", nil)
}
