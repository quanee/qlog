package md2html

import (
	"fmt"
	"github.com/88250/lute"
	"gitlab.com/golang-commonmark/markdown"
)

func MD2HTMLlute(markdown []byte) (string, error) {
	luteEngine := lute.New() // 默认已经启用 GFM 支持以及中文语境优化
	html := luteEngine.Markdown("demo", markdown)
	return string(html), nil
}

func MD2HTML(markdowns []byte) (string, error) {
	md := markdown.New(markdown.XHTMLOutput(true))
	for _, tok := range md.Parse(markdowns) {
		fmt.Println(tok.Tag())
	}
	return md.RenderToString(markdowns), nil
}

//func MD2HTMLbl(markdown []byte) (string, error) {
//	return string(github_flavored_markdown.Markdown(markdown)), nil
//}
