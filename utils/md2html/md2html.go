package md2html

import "github.com/quanee/markdown"

//func MD2HTML(markdown []byte) (string, error) {
//	luteEngine := lute.New() // 默认已经启用 GFM 支持以及中文语境优化
//	html := luteEngine.Markdown("big", markdown)
//	return string(html), nil
//}

func MD2HTML(markdowns []byte) (string, error) {
	md := markdown.New(markdown.XHTMLOutput(true))
	//for _, tok := range md.Parse(markdowns) {
	//	fmt.Println(tok.Tag())
	//}
	return md.RenderToString(markdowns), nil
}

//func MD2HTML(markdown []byte) (string, error) {
//	output := blackfriday.Run(markdown)
//	return string(output), nil
//}
