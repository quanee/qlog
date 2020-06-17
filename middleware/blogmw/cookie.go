package blogmw

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/utils/log"
)

func Cookie() draft.HandlerFunc {
	return func(c *draft.Context) {
		log.Infof("%v %v %v", c.Req.URL, c.Req.Host, c.Req.Cookies(), c.Req.Method)
		//c.SetHeader("Set-Cookie", "Secure; HttpOnly")
		c.SetHeader("x-xss-protection", "1; mode=block")
		c.Next()
	}
}
