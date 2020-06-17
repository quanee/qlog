package bloghd

import (
	"github.com/quanee/draft"
	"net/http"
)

func Calc(context *draft.Context) {
	//context.Writer.Header().Set("content-type", "application/wasm")
	//http.FileServer(http.Dir("./webassembly/"))
	//context.SetHeader("")
	context.HTML(http.StatusOK, "calc.html", nil)
}
