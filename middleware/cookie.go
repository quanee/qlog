package middleware

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/utils/log"
)

func Cookie() draft.HandlerFunc {
	return func(c *draft.Context) {
		log.Infof("%v %v %v", c.Req.URL, c.Req.Host, c.Req.Cookies(), c.Req.Method)

		c.Next()
	}
}
