package middleware

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/utils/log"
)

func Statistic() draft.HandlerFunc {
	return func(c *draft.Context) {
		log.Infof("%s %s %s %v", c.Req.Referer(), c.Req.Host, c.Req.RequestURI, c.StatusCode)
		c.Next()
	}
}
