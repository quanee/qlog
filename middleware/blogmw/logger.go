package blogmw

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/utils/log"
	"time"
)

func Logger() draft.HandlerFunc {
	return func(c *draft.Context) {
		// 开始时间
		t := time.Now()
		// 处理请求
		c.Next()
		// 计算处理时间
		log.Infof("[%s] %v in %v", c.Req.RequestURI, c.StatusCode, time.Since(t))
	}
}
