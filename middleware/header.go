package middleware

import (
	"github.com/quanee/draft"
)

func Header() draft.HandlerFunc {
	return func(c *draft.Context) {
		c.Next()
		c.SetHeader("X-DNS-Prefetch-Control", "off")
		c.SetHeader("server", "aws")
		c.SetHeader("Cache-Control", "max-age=9999999")
	}
}
