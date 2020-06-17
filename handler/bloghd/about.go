package bloghd

import (
	"github.com/quanee/draft"
	"net/http"
)

func About(context *draft.Context) {
	//context.Writer.Header().Set("content-type", "application/wasm")
	//http.FileServer(http.Dir("./webassembly/"))
	context.HTML(http.StatusOK, "blog/about.html", nil)
}
