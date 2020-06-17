package bloghd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Test(context *draft.Context) {
	context.HTML(http.StatusOK, "test/test.tpl", nil)
}
